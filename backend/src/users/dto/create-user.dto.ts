import {
	IsString,
	IsEmail,
	IsOptional,
	IsBoolean,
	IsEnum,
} from "class-validator"
import { Role } from "@prisma/client"

export class CreateUserDto {
	@IsEmail()
	email: string

	@IsString()
	password: string

	@IsString()
	name: string

	@IsString()
	@IsOptional()
	full_name?: string

	@IsBoolean()
	@IsOptional()
	is_active?: boolean

	@IsBoolean()
	@IsOptional()
	is_verified?: boolean

	@IsEnum(Role)
	@IsOptional()
	role?: Role
}
