import { IsString, IsNumber, IsOptional } from "class-validator"

export class CreateStoreDto {
	@IsString()
	name: string

	@IsString()
	address: string

	@IsNumber()
	latitude: number

	@IsNumber()
	longitude: number

	@IsString()
	@IsOptional()
	description?: string

	@IsNumber()
	userId: number
}
