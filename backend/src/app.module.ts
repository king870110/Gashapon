import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import configuration from "./config/configuration"
import { AuthModule } from "./auth/auth.module"
import { UsersModule } from "./users/users.module"
import { StoresModule } from "./stores/stores.module"
import { ProductsModule } from "./products/products.module"
import { CommentsModule } from "./comments/comments.module"
import { PrismaModule } from "./prisma/prisma.module"
import { RedisModule } from "./redis/redis.module"
import { SocketModule } from "./socket/socket.module"

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration],
		}),
		AuthModule,
		UsersModule,
		StoresModule,
		ProductsModule,
		CommentsModule,
		PrismaModule,
		RedisModule,
		SocketModule,
	],
})
export class AppModule {}
