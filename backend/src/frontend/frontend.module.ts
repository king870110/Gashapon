import { Module } from "@nestjs/common"
import { FrontendController } from "./frontend.controller"
import { FrontendService } from "./frontend.service"
import { PrismaModule } from "../prisma/prisma.module"
import { RedisModule } from "../redis/redis.module"

@Module({
	imports: [PrismaModule, RedisModule],
	controllers: [FrontendController],
	providers: [FrontendService],
})
export class FrontendModule {}
