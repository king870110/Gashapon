import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common"
import { Role } from "@prisma/client"

@Injectable()
export class AdminGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const { user } = context.switchToHttp().getRequest()
		return user?.role === Role.ADMIN || user?.role === Role.MERCHANT
	}
}
