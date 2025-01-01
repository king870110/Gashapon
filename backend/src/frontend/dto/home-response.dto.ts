import { BannerResponseDto } from "./banner-response.dto"

export class ProductResponseDto {
	id: number
	name: string
	description: string
	price: number
	image_url: string
	store_id: number
	store_name: string
	created_at: Date
	updated_at: Date
}

export class HomeResponseDto {
	banners: BannerResponseDto[]
	products: ProductResponseDto[]
}
