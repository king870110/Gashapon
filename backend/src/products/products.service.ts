import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { CreateProductDto } from "./dto/create-product.dto"
import { UpdateProductDto } from "./dto/update-product.dto"

@Injectable()
export class ProductsService {
	constructor(private prisma: PrismaService) {}

	async create(data: CreateProductDto) {
		return this.prisma.product.create({ data })
	}

	async findAll() {
		return this.prisma.product.findMany({
			include: {
				store: true,
			},
		})
	}

	async findOne(id: number) {
		return this.prisma.product.findUnique({
			where: { id },
			include: {
				store: true,
			},
		})
	}

	async update(id: number, data: UpdateProductDto) {
		return this.prisma.product.update({
			where: { id },
			data,
		})
	}

	async remove(id: number) {
		return this.prisma.product.delete({
			where: { id },
		})
	}
}
