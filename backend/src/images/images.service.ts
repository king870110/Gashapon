import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { CreateImageDto } from "./dto/create-image.dto"
@Injectable()
export class ImagesService {
	constructor(private readonly prisma: PrismaService) {}

	async findAll(userId: number | null) {
		return this.prisma.image.findMany({
			where: userId ? { userId } : {},
		})
	}

	async remove(id: number, userId: number) {
		return this.prisma.image.delete({
			where: { id, userId },
		})
	}

	async create(data: CreateImageDto, userId: number) {
		return this.prisma.image.create({
			data: { ...data, userId },
		})
	}
}
