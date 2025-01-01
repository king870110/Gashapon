import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async create(data: CreateUserDto) {
		return this.prisma.user.create({
			data,
			select: {
				id: true,
				email: true,
				name: true,
				full_name: true,
				is_active: true,
				is_verified: true,
				createdAt: true,
			},
		})
	}

	async findAll() {
		return this.prisma.user.findMany({
			select: {
				id: true,
				email: true,
				name: true,
				full_name: true,
				is_active: true,
				is_verified: true,
				createdAt: true,
			},
		})
	}

	async findOne(id: number) {
		return this.prisma.user.findUnique({
			where: { id },
			select: {
				id: true,
				email: true,
				name: true,
				full_name: true,
				is_active: true,
				is_verified: true,
				createdAt: true,
				comments: true,
				stores: {
					select: {
						id: true,
						name: true,
						address: true,
					},
				},
				images: {
					select: {
						id: true,
						url: true,
						isPublic: true,
					},
				},
			},
		})
	}

	async findByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: { email },
		})
	}

	async update(id: number, data: UpdateUserDto) {
		return this.prisma.user.update({
			where: { id },
			data,
			select: {
				id: true,
				email: true,
				name: true,
				full_name: true,
				is_active: true,
				is_verified: true,
				updatedAt: true,
			},
		})
	}

	async remove(id: number) {
		return this.prisma.user.delete({
			where: { id },
		})
	}
}
