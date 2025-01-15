import { IsString, IsNumber, IsOptional } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"

export class CreateProductDto {
	@Transform(({ value }) => String(value).trim()) // 顯式轉換成字符串
	@IsString()
	name: string

	@ApiProperty({ description: "The price of the store" })
	@Transform(({ value }) => parseFloat(value)) // 將字串轉換為數字
	// @IsNumber()
	price: number

	// @IsNumber()
	@Transform(({ value }) => parseInt(value, 10)) // 將字串轉換為整數
	imageId?: number // 使用現有圖片的 ID

	@IsString()
	@IsOptional()
	description?: string

	// @IsNumber()
	@Transform(({ value }) => parseInt(value, 10)) // 將字串轉換為整數
	storeId?: number

	// @IsNumber()
	@Transform(({ value }) => parseInt(value, 10)) // 將字串轉換為整數
	categoryId?: number

	// @IsNumber()
	@Transform(({ value }) => parseInt(value, 10)) // 將字串轉換為整數
	userId: number
}
