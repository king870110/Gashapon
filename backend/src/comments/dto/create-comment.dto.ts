import { IsString, IsNumber, Min, Max } from "class-validator"

export class CreateCommentDto {
	@IsString()
	content: string

	@IsNumber()
	@Min(1)
	@Max(5)
	rating: number

	@IsNumber()
	userId: number

	@IsNumber()
	storeId: number
}
