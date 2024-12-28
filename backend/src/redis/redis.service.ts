import { Injectable, OnModuleDestroy } from "@nestjs/common"
import { createClient, RedisClientType } from "redis"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class RedisService implements OnModuleDestroy {
	private client: RedisClientType
	private readonly DEFAULT_EXPIRATION = 3600 // 1小時

	constructor(private configService: ConfigService) {
		this.client = createClient({
			url: this.configService.get("redis.url"),
		})
		this.client.connect()
	}

	async onModuleDestroy() {
		await this.client.quit()
	}

	async set(key: string, value: any) {
		await this.client.set(key, JSON.stringify(value))
	}

	async get<T>(key: string): Promise<T | null> {
		const data = await this.client.get(key)
		return data ? JSON.parse(data) : null
	}

	async del(key: string) {
		await this.client.del(key)
	}

	async setWithExpiry(
		key: string,
		value: any,
		seconds: number = this.DEFAULT_EXPIRATION
	) {
		await this.client.setEx(key, seconds, JSON.stringify(value))
	}

	async delByPattern(pattern: string) {
		const keys = await this.client.keys(pattern)
		if (keys.length > 0) {
			await this.client.del(keys)
		}
	}
}
