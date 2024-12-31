import { SetMetadata } from "@nestjs/common"

export const ROLES_KEY = "roles_level"
export const Roles = (level: number) => SetMetadata(ROLES_KEY, level)
