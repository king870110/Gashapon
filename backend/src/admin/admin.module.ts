import { Module } from "@nestjs/common"
import { AdminController } from "./admin.controller"
import { ImagesModule } from "../images/images.module"
import { StoresModule } from "../stores/stores.module"
import { ProductsModule } from "../products/products.module"
import { UsersModule } from "../users/users.module"

@Module({
	imports: [ImagesModule, StoresModule, ProductsModule, UsersModule],
	controllers: [AdminController],
})
export class AdminModule {}
