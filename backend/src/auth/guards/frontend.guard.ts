import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common"
import { Role } from "@prisma/client"

@Injectable()
export class FrontendGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const { user } = context.switchToHttp().getRequest()
		return user?.role === Role.CUSTOMER || user?.role === Role.MERCHANT
	}
}
