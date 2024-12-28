import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { RedisService } from "../redis/redis.service"
import { CreateProductDto } from "./dto/create-product.dto"
import { UpdateProductDto } from "./dto/update-product.dto"

@Injectable()
export class ProductsService {
	constructor(
		private prisma: PrismaService,
		private redisService: RedisService
	) {}

	private readonly CACHE_TTL = 3600 // 1小時
	private readonly PRODUCT_KEY = "product:"
	private readonly PRODUCTS_LIST_KEY = "products:list"
	private readonly STORE_PRODUCTS_KEY = "store:products:"

	async create(dto: CreateProductDto) {
		const product = await this.prisma.product.create({
			data: dto,
			include: {
				store: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		})

		// 清除相關快取
		await this.redisService.del(this.PRODUCTS_LIST_KEY)
		await this.redisService.del(`${this.STORE_PRODUCTS_KEY}${dto.storeId}`)

		return product
	}

	async findAll() {
		// 嘗試從快取獲取
		const cached = await this.redisService.get<any[]>(this.PRODUCTS_LIST_KEY)
		if (cached) {
			return cached
		}

		const products = await this.prisma.product.findMany({
			include: {
				store: {
					select: {
						id: true,
						name: true,
						address: true,
					},
				},
			},
		})

		// 存入快取
		await this.redisService.setWithExpiry(
			this.PRODUCTS_LIST_KEY,
			products,
			this.CACHE_TTL
		)

		return products
	}

	async findOne(id: number) {
		// 嘗試從快取獲取
		const cached = await this.redisService.get<any>(`${this.PRODUCT_KEY}${id}`)
		if (cached) {
			return cached
		}

		const product = await this.prisma.product.findUnique({
			where: { id },
			include: {
				store: {
					select: {
						id: true,
						name: true,
						address: true,
						latitude: true,
						longitude: true,
					},
				},
			},
		})

		if (!product) {
			throw new NotFoundException("Product not found")
		}

		// 存入快取
		await this.redisService.setWithExpiry(
			`${this.PRODUCT_KEY}${id}`,
			product,
			this.CACHE_TTL
		)

		return product
	}

	async update(id: number, dto: UpdateProductDto) {
		const product = await this.prisma.product.update({
			where: { id },
			data: dto,
			include: {
				store: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		})

		// 清除相關快取
		await this.redisService.del(`${this.PRODUCT_KEY}${id}`)
		await this.redisService.del(this.PRODUCTS_LIST_KEY)
		if (product.storeId) {
			await this.redisService.del(
				`${this.STORE_PRODUCTS_KEY}${product.storeId}`
			)
		}

		return product
	}

	async remove(id: number) {
		const product = await this.prisma.product.delete({
			where: { id },
		})

		// 清除相關快取
		await this.redisService.del(`${this.PRODUCT_KEY}${id}`)
		await this.redisService.del(this.PRODUCTS_LIST_KEY)
		await this.redisService.del(`${this.STORE_PRODUCTS_KEY}${product.storeId}`)
	}

	async findByStore(storeId: number) {
		// 嘗試從快取獲取
		const cached = await this.redisService.get<any[]>(
			`${this.STORE_PRODUCTS_KEY}${storeId}`
		)
		if (cached) {
			return cached
		}

		const products = await this.prisma.product.findMany({
			where: { storeId },
			include: {
				store: {
					select: {
						id: true,
						name: true,
						address: true,
					},
				},
			},
		})

		// 存入快取
		await this.redisService.setWithExpiry(
			`${this.STORE_PRODUCTS_KEY}${storeId}`,
			products,
			this.CACHE_TTL
		)

		return products
	}

	async search(query: string) {
		return this.prisma.product.findMany({
			where: {
				OR: [
					{
						name: {
							contains: query,
							mode: "insensitive",
						},
					},
					{
						description: {
							contains: query,
							mode: "insensitive",
						},
					},
				],
			},
			include: {
				store: {
					select: {
						id: true,
						name: true,
						address: true,
					},
				},
			},
		})
	}
}
