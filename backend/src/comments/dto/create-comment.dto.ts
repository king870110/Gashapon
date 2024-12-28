import { IsString, IsNumber, Min, Max } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateCommentDto {
	@ApiProperty({ example: "這家店的扭蛋很棒！" })
	@IsString()
	content: string

	@ApiProperty({ example: 5, description: "評分 1-5" })
	@IsNumber()
	@Min(1)
	@Max(5)
	rating: number

	@ApiProperty({ example: 1 })
	@IsNumber()
	storeId: number
}
