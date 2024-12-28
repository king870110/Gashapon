import { IsString, IsNumber, IsOptional } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateStoreDto {
	@ApiProperty({ example: "扭蛋專賣店" })
	@IsString()
	name: string

	@ApiProperty({ example: "台北市信義區信義路五段7號" })
	@IsString()
	address: string

	@ApiProperty({ example: 25.0339 })
	@IsNumber()
	latitude: number

	@ApiProperty({ example: 121.5644 })
	@IsNumber()
	longitude: number

	@ApiProperty({ example: "專營各式扭蛋", required: false })
	@IsString()
	@IsOptional()
	description?: string
}
