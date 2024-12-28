import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { RedisService } from "../redis/redis.service"
import { CreateStoreDto } from "./dto/create-store.dto"
import { UpdateStoreDto } from "./dto/update-store.dto"

@Injectable()
export class StoresService {
	constructor(
		private prisma: PrismaService,
		private redisService: RedisService
	) {}

	private readonly CACHE_TTL = 3600 // 1小時
	private readonly STORE_KEY = "store:"
	private readonly STORES_LIST_KEY = "stores:list"

	async create(dto: CreateStoreDto) {
		const store = await this.prisma.store.create({
			data: dto,
		})

		// 清除商店列表快取
		await this.redisService.del(this.STORES_LIST_KEY)

		return store
	}

	async findAll() {
		// 嘗試從快取獲取
		const cached = await this.redisService.get<any[]>(this.STORES_LIST_KEY)
		if (cached) {
			return cached
		}

		// 從數據庫獲取
		const stores = await this.prisma.store.findMany({
			include: {
				products: true,
				comments: {
					include: {
						user: {
							select: {
								id: true,
								name: true,
							},
						},
					},
				},
			},
		})

		// 存入快取
		await this.redisService.setWithExpiry(
			this.STORES_LIST_KEY,
			stores,
			this.CACHE_TTL
		)

		return stores
	}

	async findOne(id: number) {
		// 嘗試從快取獲取
		const cached = await this.redisService.get<any>(`${this.STORE_KEY}${id}`)
		if (cached) {
			return cached
		}

		const store = await this.prisma.store.findUnique({
			where: { id },
			include: {
				products: true,
				comments: {
					include: {
						user: {
							select: {
								id: true,
								name: true,
							},
						},
					},
				},
			},
		})

		if (!store) {
			throw new NotFoundException("Store not found")
		}

		// 存入快取
		await this.redisService.setWithExpiry(
			`${this.STORE_KEY}${id}`,
			store,
			this.CACHE_TTL
		)

		return store
	}

	async update(id: number, dto: UpdateStoreDto) {
		const store = await this.prisma.store.update({
			where: { id },
			data: dto,
		})

		// 清除相關快取
		await this.redisService.del(`${this.STORE_KEY}${id}`)
		await this.redisService.del(this.STORES_LIST_KEY)

		return store
	}

	async remove(id: number) {
		await this.prisma.store.delete({
			where: { id },
		})

		// 清除相關快取
		await this.redisService.del(`${this.STORE_KEY}${id}`)
		await this.redisService.del(this.STORES_LIST_KEY)
	}

	async findNearby(lat: number, lng: number, radius: number = 5) {
		const cacheKey = `stores:nearby:${lat}:${lng}:${radius}`

		// 嘗試從快取獲取
		const cached = await this.redisService.get<any[]>(cacheKey)
		if (cached) {
			return cached
		}

		const stores = await this.prisma.$queryRaw`
      SELECT *, 
      ( 6371 * acos( cos( radians(${lat}) ) 
        * cos( radians(latitude) ) 
        * cos( radians(longitude) - radians(${lng}) ) 
        + sin( radians(${lat}) ) 
        * sin( radians(latitude) ) ) ) AS distance 
      FROM "Store" 
      HAVING distance < ${radius} 
      ORDER BY distance;
    `

		// 存入快取，但時間較短（15分鐘）
		await this.redisService.setWithExpiry(cacheKey, stores, 900)

		return stores
	}
}
