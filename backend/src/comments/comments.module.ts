import { Module } from "@nestjs/common"
import { CommentsService } from "./comments.service"
import { CommentsController } from "./comments.controller"
import { SocketModule } from "../socket/socket.module"

@Module({
	imports: [SocketModule],
	controllers: [CommentsController],
	providers: [CommentsService],
	exports: [CommentsService],
})
export class CommentsModule {}
