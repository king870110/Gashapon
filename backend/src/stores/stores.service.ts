import { Injectable, ForbiddenException } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { RolesService } from "../roles/roles.service"
import { CreateStoreDto } from "./dto/create-store.dto"
import { UpdateStoreDto } from "./dto/update-store.dto"

@Injectable()
export class StoresService {
	constructor(
		private prisma: PrismaService,
		private rolesService: RolesService
	) {}

	async create(data: CreateStoreDto, currentUserId: number) {
		const hasPermission = await this.rolesService.checkPermission(
			currentUserId,
			100
		)
		if (!hasPermission) {
			throw new ForbiddenException("Only merchants can create stores")
		}

		return this.prisma.store.create({
			data: {
				...data,
				userId: currentUserId,
			},
			include: {
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

	async update(id: number, data: UpdateStoreDto, currentUserId: number) {
		const store = await this.prisma.store.findUnique({
			where: { id },
			include: {
				user: {
					include: { role: true },
				},
			},
		})

		const isAdmin = await this.rolesService.checkPermission(currentUserId, 999)
		if (!isAdmin && store.userId !== currentUserId) {
			throw new ForbiddenException("You can only update your own stores")
		}

		return this.prisma.store.update({
			where: { id },
			data,
		})
	}

	async remove(id: number, currentUserId: number) {
		const store = await this.prisma.store.findUnique({
			where: { id },
			include: { user: true },
		})

		if (store.userId !== currentUserId && store.user.role !== Role.ADMIN) {
			throw new ForbiddenException("You can only delete your own stores")
		}

		return this.prisma.store.delete({
			where: { id },
		})
	}
}
