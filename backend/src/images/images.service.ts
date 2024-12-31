import { Injectable, ForbiddenException } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { RolesService } from "../roles/roles.service"
import { CreateImageDto } from "./dto/create-image.dto"

@Injectable()
export class ImagesService {
	constructor(
		private prisma: PrismaService,
		private rolesService: RolesService
	) {}

	async create(data: CreateImageDto, userId: number) {
		if (data.isPublic) {
			const isAdmin = await this.rolesService.checkPermission(userId, 999)
			if (!isAdmin) {
				throw new ForbiddenException("Only admins can create public images")
			}
		}

		return this.prisma.image.create({
			data: {
				...data,
				userId,
			},
		})
	}

	async findAll(userId: number) {
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
		})

		if (user.role === Role.ADMIN) {
			return this.prisma.image.findMany()
		}

		return this.prisma.image.findMany({
			where: {
				OR: [{ userId }, { isPublic: true }],
			},
		})
	}

	async remove(id: number, userId: number) {
		const image = await this.prisma.image.findUnique({
			where: { id },
			include: { user: true },
		})

		if (image.userId !== userId && image.user.role !== Role.ADMIN) {
			throw new ForbiddenException("You can only delete your own images")
		}

		return this.prisma.image.delete({
			where: { id },
		})
	}
}
