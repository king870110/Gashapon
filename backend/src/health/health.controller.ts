import { Controller, Get } from "@nestjs/common"
import {
	HealthCheckService,
	HttpHealthIndicator,
	HealthCheck,
	PrismaHealthIndicator,
} from "@nestjs/terminus"

@Controller("health")
export class HealthController {
	constructor(
		private health: HealthCheckService,
		private http: HttpHealthIndicator,
		private prisma: PrismaHealthIndicator
	) {}

	@Get()
	@HealthCheck()
	check() {
		return this.health.check([
			() => this.http.pingCheck("nestjs-docs", "https://docs.nestjs.com"),
			// () => this.prisma.pingCheck("database",this.prisma),
		])
	}
}
