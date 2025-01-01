export class BannerResponseDto {
	id: number
	title: string
	description: string
	image_url: string
	link: string
	sort: number
	is_active: boolean
	created_at: Date
	updated_at: Date
}

export class CreateBannerDto {
	title: string
	description?: string
	image_url: string
	link?: string
	sort?: number
	is_active?: boolean
}

export class UpdateBannerDto extends CreateBannerDto {}
