import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { CreateProductDto } from "./dto/create-product.dto"
import { UpdateProductDto } from "./dto/update-product.dto"

@Injectable()
export class ProductsService {
	constructor(private prisma: PrismaService) {}

	async create(data: CreateProductDto) {
		const { name, price, userId, storeId, imageId, description } = data

		return this.prisma.product.create({
			data: {
				name,
				price,
				description,
				user: {
					connect: { id: userId }, // Relate to the User model
				},
				store: storeId ? { connect: { id: storeId } } : undefined, // Optional store relation
				image: imageId ? { connect: { id: imageId } } : undefined, // Optional image relation
			},
			include: {
				image: {
					select: {
						url: true,
					},
				},
			},
		})
	}

	async findAll() {
		return this.prisma.product.findMany({
			include: {
				store: true,
				image: {
					select: {
						url: true,
					},
				},
			},
		})
	}

	async findOne(id: number) {
		return this.prisma.product.findUnique({
			where: { id },
			include: {
				store: true,
				image: true,
			},
		})
	}

	async update(id: number, data: UpdateProductDto) {
		console.log({ data })
		console.log({ id })
		const { name, price, userId, imageId, ...restData } = data
		return this.prisma.product.update({
			where: { id },
			data: { name, price, userId, imageId },
			include: {
				image: {
					select: {
						url: true,
					},
				},
			},
		})
	}

	async remove(id: number) {
		return this.prisma.product.delete({
			where: { id },
		})
	}

	async search(keyword: string) {
		return this.prisma.product.findMany({
			where: {
				OR: [
					{ name: { contains: keyword } },
					{ description: { contains: keyword } },
				],
			},
			include: {
				store: true,
				image: true,
			},
		})
	}

	async findByUserId(userId: number) {
		return this.prisma.product.findMany({
			where: { userId },
		})
	}
}
