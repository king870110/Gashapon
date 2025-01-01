import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import Redis from "ioredis"

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
	private client: Redis

	constructor(private configService: ConfigService) {}

	async onModuleInit() {
		this.client = new Redis({
			host: this.configService.get("REDIS_HOST", "localhost"),
			port: this.configService.get("REDIS_PORT", 6379),
			password: this.configService.get("REDIS_PASSWORD"),
			db: this.configService.get("REDIS_DB", 0),
		})
	}

	async onModuleDestroy() {
		await this.client.quit()
	}

	async get(key: string): Promise<string | null> {
		return this.client.get(key)
	}

	async set(key: string, value: string, ttl?: number): Promise<"OK" | null> {
		if (ttl) {
			return this.client.set(key, value, "EX", ttl)
		}
		return this.client.set(key, value)
	}

	async del(key: string): Promise<number> {
		return this.client.del(key)
	}

	async keys(pattern: string): Promise<string[]> {
		return this.client.keys(pattern)
	}

	getClient(): Redis {
		return this.client
	}
}
