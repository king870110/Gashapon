import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { CreateStoreDto } from "./dto/create-store.dto"
import { UpdateStoreDto } from "./dto/update-store.dto"
import { UpdateStoreStoreDto } from "./dto/update-store-product.dto"

@Injectable()
export class StoresService {
	constructor(private prisma: PrismaService) {}

	async create(data: CreateStoreDto) {
		console.log({ data })
		return this.prisma.store.create({
			data,
			include: {
				user: {
					select: {
						id: true,
					},
				},
			},
		})
	}

	async findAll() {
		return this.prisma.store.findMany({
			include: {
				products: {
					include: {
						image: true,
					},
				},
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
				user: {
					select: {
						id: true,
						name: true,
						email: true,
					},
				},
			},
		})
	}

	async findOne(id: number) {
		return this.prisma.store.findUnique({
			where: { id },
			include: {
				products: {
					include: {
						image: true,
					},
				},
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
				user: {
					select: {
						id: true,
						name: true,
						email: true,
					},
				},
			},
		})
	}

	async update(id: number, data: UpdateStoreDto) {
		console.log({ data })
		console.log({ id })
		const {
			name,
			address,
			latitude,
			longitude,
			description,
			userId,
			isActive,
			...restData
		} = data
		return this.prisma.store.update({
			where: { id },
			data: {
				name,
				address,
				latitude,
				longitude,
				description,
				userId,
				isActive,
			},
		})
	}

	async updateStoreStore(id: number, data: UpdateStoreStoreDto) {
		console.log({ data })
		console.log({ id })
		const { products, ...restData } = data
		return this.prisma.store.update({
			where: { id },
			data: {
				products: {
					set: products.map((productId) => ({ id: Number(productId) })), // 更新商品關聯
				},
			},
			include: {
				products: true, // 返回關聯的商品數據
			},
		})
	}

	async remove(id: number) {
		return this.prisma.store.delete({
			where: { id },
		})
	}

	async findByUserId(userId: number) {
		return this.prisma.store.findMany({
			where: { userId },
			include: {
				products: {
					include: {
						image: true,
					},
				},
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
				user: {
					select: {
						id: true,
						name: true,
						email: true,
					},
				},
			},
		})
	}
}
