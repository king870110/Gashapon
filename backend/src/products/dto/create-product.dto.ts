import { IsString, IsNumber, IsOptional } from "class-validator"

export class CreateProductDto {
	@IsString()
	name: string

	@IsNumber()
	price: number

	@IsNumber()
	imageId: number // 使用現有圖片的 ID

	@IsString()
	@IsOptional()
	description?: string

	@IsNumber()
	storeId: number
}
