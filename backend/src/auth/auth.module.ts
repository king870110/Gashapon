import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { AuthService } from "./auth.service"
import { AuthController } from "./auth.controller"
import { UsersModule } from "../users/users.module"
import { RedisModule } from "../redis/redis.module"

@Module({
	imports: [
		UsersModule,
		RedisModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET || "your-secret-key",
			signOptions: { expiresIn: "1d" },
		}),
	],
	providers: [AuthService],
	controllers: [AuthController],
	exports: [AuthService],
})
export class AuthModule {}
