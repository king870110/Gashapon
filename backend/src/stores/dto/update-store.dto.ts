import { PartialType } from "@nestjs/swagger"
import { CreateStoreDto } from "./create-store.dto"
import { IsString, IsNumber, IsOptional, IsArray } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { Product, Comment } from "@prisma/client"

export class UpdateStoreDto extends PartialType(CreateStoreDto) {
	// @ApiProperty({ description: "The name of the store" })
	// @IsString()
	// @IsOptional()
	// name?: string
	// @ApiProperty({ description: "The address of the store" })
	// @IsString()
	// @IsOptional()
	// address?: string
	// @ApiProperty({ description: "The latitude of the store location" })
	// @IsNumber()
	// @IsOptional()
	// latitude?: number
	// @ApiProperty({ description: "The longitude of the store location" })
	// @IsNumber()
	// @IsOptional()
	// longitude?: number
	// @IsString()
	// @IsOptional()
	// description?: string
	// @IsNumber()
	// @IsOptional()
	// userId?: number
	// @IsArray()
	// @IsOptional()
	// products?: Product[]
	// @IsArray()
	// @IsOptional()
	// comments?: Comment[]
}
