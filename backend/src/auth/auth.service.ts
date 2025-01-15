import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { UsersService } from "../users/users.service"
import { RedisService } from "../redis/redis.service"

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
		private redisService: RedisService
	) {}

	async validateUser(email: string, password: string) {
		const user = await this.usersService.findByEmail(email)
		if (user && user.password === password) {
			const { password, ...result } = user
			return result
		}
		return null
	}

	async login(user: any) {
		const payload = { email: user.email, sub: user.id, userId: user.id }
		const token = this.jwtService.sign(payload)

		// 將 token 存儲到 Redis 中，設置過期時間
		await this.redisService.set(`auth:${user.id}`, token, 86400) // 86400 秒 = 1 天

		return {
			access_token: token,
			role: user.role, // 假設用戶對象中有角色信息
			userId: user.id, // 返回 userId
		}
	}
}
