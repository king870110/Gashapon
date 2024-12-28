import { Module } from "@nestjs/common"
import { StoresService } from "./stores.service"
import { StoresController } from "./stores.controller"
import { RedisModule } from "../redis/redis.module"

@Module({
	imports: [RedisModule],
	controllers: [StoresController],
	providers: [StoresService],
	exports: [StoresService],
})
export class StoresModule {}
