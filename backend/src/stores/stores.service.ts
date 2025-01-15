import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { CreateStoreDto } from "./dto/create-store.dto"
import { UpdateStoreDto } from "./dto/update-store.dto"

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
			...restData
		} = data
		return this.prisma.store.update({
			where: { id },
			data: { name, address, latitude, longitude, description, userId },
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
