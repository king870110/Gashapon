import { Module } from "@nestjs/common"
import { StoresService } from "./stores.service"
import { StoresController } from "./stores.controller"
import { RedisModule } from "../redis/redis.module"
import { PrismaModule } from "../prisma/prisma.module"

@Module({
	imports: [RedisModule, PrismaModule],
	controllers: [StoresController],
	providers: [StoresService],
	exports: [StoresService],
})
export class StoresModule {}
