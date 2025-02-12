import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { AuthModule } from "./auth/auth.module"
import { UsersModule } from "./users/users.module"
import { StoresModule } from "./stores/stores.module"
import { ProductsModule } from "./products/products.module"
import { ImagesModule } from "./images/images.module"
import { FrontendModule } from "./frontend/frontend.module"
// import { AdminModule } from "./admin/admin.module"
import { PrismaModule } from "./prisma/prisma.module"
import { RedisModule } from "./redis/redis.module"
import { ServeStaticModule } from "@nestjs/serve-static"
import { join } from "path"

@Module({
	imports: [
		ConfigModule.forRoot(),
		PrismaModule,
		AuthModule,
		UsersModule,
		StoresModule,
		ProductsModule,
		ImagesModule,
		FrontendModule,
		// AdminModule,
		RedisModule,
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, "..", "uploads/images"),
			serveRoot: "/uploads/images",
		}),
	],
})
export class AppModule {}
