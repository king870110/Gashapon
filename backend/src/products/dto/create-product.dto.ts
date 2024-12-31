import { IsString, IsNumber, IsOptional } from "class-validator"

export class CreateProductDto {
	@IsString()
	name: string

	@IsNumber()
	price: number

	@IsString()
	imageUrl: string

	@IsString()
	@IsOptional()
	description?: string

	@IsNumber()
	storeId: number
}
