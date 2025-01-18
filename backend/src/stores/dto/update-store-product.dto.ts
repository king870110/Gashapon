import { IsArray, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"

export class UpdateStoreStoreDto {
	@ApiProperty({
		description: "商品 ID 列表",
		example: [1, 2, 3],
		type: [Number], // 指定類型為數字數組
	})
	@IsArray() // 驗證是否為數組
	@IsString({ each: true }) // 驗證數組中的每個元素是否為字符串
	products: string[]
}
