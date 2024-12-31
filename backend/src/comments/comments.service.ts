import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { CreateCommentDto } from "./dto/create-comment.dto"
import { UpdateCommentDto } from "./dto/update-comment.dto"

@Injectable()
export class CommentsService {
	constructor(private prisma: PrismaService) {}

	async create(data: CreateCommentDto) {
		return this.prisma.comment.create({
			data,
			include: {
				user: true,
				store: true,
			},
		})
	}

	async findAll() {
		return this.prisma.comment.findMany({
			include: {
				user: true,
				store: true,
			},
		})
	}

	async findOne(id: number) {
		return this.prisma.comment.findUnique({
			where: { id },
			include: {
				user: true,
				store: true,
			},
		})
	}

	async update(id: number, data: UpdateCommentDto) {
		return this.prisma.comment.update({
			where: { id },
			data,
		})
	}

	async remove(id: number) {
		return this.prisma.comment.delete({
			where: { id },
		})
	}
}
