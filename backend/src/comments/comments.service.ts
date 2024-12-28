import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { CreateCommentDto } from "./dto/create-comment.dto"
import { UpdateCommentDto } from "./dto/update-comment.dto"
import { SocketGateway } from "../socket/socket.gateway"

@Injectable()
export class CommentsService {
	constructor(
		private prisma: PrismaService,
		private socketGateway: SocketGateway
	) {}

	async create(userId: number, dto: CreateCommentDto) {
		const comment = await this.prisma.comment.create({
			data: {
				...dto,
				userId,
			},
			include: {
				user: {
					select: {
						id: true,
						name: true,
					},
				},
				store: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		})

		// 發送新評論通知
		await this.socketGateway.sendNewCommentNotification(dto.storeId, comment)

		return comment
	}

	async findAll() {
		return this.prisma.comment.findMany({
			include: {
				user: {
					select: {
						id: true,
						name: true,
					},
				},
				store: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		})
	}

	async findOne(id: number) {
		const comment = await this.prisma.comment.findUnique({
			where: { id },
			include: {
				user: {
					select: {
						id: true,
						name: true,
					},
				},
				store: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		})

		if (!comment) {
			throw new NotFoundException("Comment not found")
		}

		return comment
	}

	async update(id: number, userId: number, dto: UpdateCommentDto) {
		// 檢查評論是否存在且屬於該用戶
		const comment = await this.prisma.comment.findUnique({
			where: { id },
		})

		if (!comment) {
			throw new NotFoundException("Comment not found")
		}

		if (comment.userId !== userId) {
			throw new UnauthorizedException("You can only update your own comments")
		}

		return this.prisma.comment.update({
			where: { id },
			data: dto,
			include: {
				user: {
					select: {
						id: true,
						name: true,
					},
				},
				store: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		})
	}

	async remove(id: number, userId: number) {
		// 檢查評論是否存在且屬於該用戶
		const comment = await this.prisma.comment.findUnique({
			where: { id },
		})

		if (!comment) {
			throw new NotFoundException("Comment not found")
		}

		if (comment.userId !== userId) {
			throw new UnauthorizedException("You can only delete your own comments")
		}

		await this.prisma.comment.delete({
			where: { id },
		})
	}

	async findByStore(storeId: number) {
		return this.prisma.comment.findMany({
			where: { storeId },
			include: {
				user: {
					select: {
						id: true,
						name: true,
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		})
	}

	async findByUser(userId: number) {
		return this.prisma.comment.findMany({
			where: { userId },
			include: {
				store: {
					select: {
						id: true,
						name: true,
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		})
	}
}
