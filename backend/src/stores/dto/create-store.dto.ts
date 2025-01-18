import { IsString, IsNumber, IsOptional, IsBoolean } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateStoreDto {
	@ApiProperty({ description: "The name of the store" })
	@IsString()
	name: string

	@ApiProperty({ description: "The address of the store" })
	@IsString()
	address: string

	@ApiProperty({ description: "The latitude of the store location" })
	@IsNumber()
	latitude: number

	@ApiProperty({ description: "The longitude of the store location" })
	@IsNumber()
	longitude: number

	@IsString()
	@IsOptional()
	description?: string

	@IsNumber()
	userId: number

	@IsBoolean()
	@IsOptional()
	isActive?: boolean
}
