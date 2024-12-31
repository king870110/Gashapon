import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { StoresModule } from "./stores/stores.module"
import { ProductsModule } from "./products/products.module"
import { CommentsModule } from "./comments/comments.module"
import { UsersModule } from "./users/users.module"

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		UsersModule,
		StoresModule,
		ProductsModule,
		CommentsModule,
	],
})
export class AppModule {}
