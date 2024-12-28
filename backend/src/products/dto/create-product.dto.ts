import { IsString, IsNumber, IsOptional } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateProductDto {
	@ApiProperty({ example: "超級瑪利歐扭蛋" })
	@IsString()
	name: string

	@ApiProperty({ example: 100 })
	@IsNumber()
	price: number

	@ApiProperty({ example: "https://example.com/image.jpg" })
	@IsString()
	imageUrl: string

	@ApiProperty({ example: "超級瑪利歐系列扭蛋", required: false })
	@IsString()
	@IsOptional()
	description?: string

	@ApiProperty({ example: 1 })
	@IsNumber()
	storeId: number
}
