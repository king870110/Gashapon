import { Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { PrismaService } from "../prisma/prisma.service"
import { LoginDto } from "./dto/login.dto"
import { RegisterDto } from "./dto/register.dto"
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService, private jwtService: JwtService) {}

	async register(dto: RegisterDto) {
		const hashedPassword = await bcrypt.hash(dto.password, 10)

		const user = await this.prisma.user.create({
			data: {
				email: dto.email,
				name: dto.name,
				password: hashedPassword,
			},
		})

		const token = this.jwtService.sign({ userId: user.id })

		return {
			token,
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
			},
		}
	}

	async login(dto: LoginDto) {
		const user = await this.prisma.user.findUnique({
			where: { email: dto.email },
		})

		if (!user) {
			throw new UnauthorizedException("Invalid credentials")
		}

		const isPasswordValid = await bcrypt.compare(dto.password, user.password)

		if (!isPasswordValid) {
			throw new UnauthorizedException("Invalid credentials")
		}

		const token = this.jwtService.sign({ userId: user.id })

		return {
			token,
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
			},
		}
	}
}
