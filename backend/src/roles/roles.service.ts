// import { Injectable } from "@nestjs/common"
// import { PrismaService } from "../prisma/prisma.service"
// import { Role } from "@prisma/client"

// @Injectable()
// export class RolesService {
// 	constructor(private prisma: PrismaService) {}

// 	async findByName(name: string) {
// 		return this.prisma.role.findUnique({
// 			where: { name },
// 		})
// 	}

// 	async findById(id: number) {
// 		return this.prisma.role.findUnique({
// 			where: { id },
// 		})
// 	}

// 	async checkPermission(userId: number, requiredLevel: number) {
// 		const user = await this.prisma.user.findUnique({
// 			where: { id: userId },
// 			include: { role: true },
// 		})
// 		return user?.role.level >= requiredLevel
// 	}
// }
