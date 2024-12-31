import { IsString, IsBoolean, IsOptional } from "class-validator"

export class CreateImageDto {
	@IsString()
	url: string

	@IsBoolean()
	@IsOptional()
	isPublic?: boolean
}
