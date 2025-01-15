import {
	IsString,
	IsBoolean,
	IsOptional,
	IsNumber,
	IsNotEmpty,
	IsBooleanString,
} from "class-validator"
import { Transform } from "class-transformer"

export class CreateImageDto {
	// @IsString()
	// @IsNotEmpty()
	// url: string

	@IsBoolean()
	@IsOptional()
	@Transform(({ value }) => {
		if (value === "true") return true
		if (value === "false") return false
		return value // 如果值不是 "true" 或 "false"，保持原樣
	})
	isPublic?: boolean

	@IsNumber()
	@IsNotEmpty()
	@Transform(({ value }) => parseInt(value, 10)) // 將字串轉換為整數
	userId: number

	@IsString()
	@IsOptional()
	fileName?: string
}
