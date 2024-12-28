import {
	WebSocketGateway,
	WebSocketServer,
	OnGatewayConnection,
	OnGatewayDisconnect,
} from "@nestjs/websockets"
import { Server, Socket } from "socket.io"
import { RedisService } from "../redis/redis.service"

@WebSocketGateway({
	cors: {
		origin: "*",
	},
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	server: Server

	constructor(private redisService: RedisService) {}

	async handleConnection(client: Socket) {
		const userId = client.handshake.query.userId as string
		if (userId) {
			await this.redisService.set(`socket:${userId}`, client.id)
			client.join(`user:${userId}`)
		}
	}

	async handleDisconnect(client: Socket) {
		const userId = client.handshake.query.userId as string
		if (userId) {
			await this.redisService.del(`socket:${userId}`)
			client.leave(`user:${userId}`)
		}
	}

	// 發送通知給特定用戶
	async sendNotificationToUser(userId: number, notification: any) {
		this.server.to(`user:${userId}`).emit("notification", notification)
	}

	// 發送通知給所有用戶
	async broadcastNotification(notification: any) {
		this.server.emit("notification", notification)
	}

	// 發送商店更新通知
	async sendStoreUpdate(storeId: number, update: any) {
		this.server.emit(`store:${storeId}`, update)
	}

	// 發送新評論通知
	async sendNewCommentNotification(storeId: number, comment: any) {
		this.server.emit(`store:${storeId}:comments`, comment)
	}
}
