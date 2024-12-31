import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { RolesService } from "../../roles/roles.service"
import { ROLES_KEY } from "../decorators/roles.decorator"

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private rolesService: RolesService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const requiredLevel = this.reflector.getAllAndOverride<number>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		])

		if (!requiredLevel) {
			return true
		}

		const { user } = context.switchToHttp().getRequest()
		return this.rolesService.checkPermission(user.id, requiredLevel)
	}
}
