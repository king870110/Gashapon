export class FaqItemResponseDto {
	id: number
	question: string
	answer: string
	category: string
	sort: number
	is_active: boolean
	created_at: Date
	updated_at: Date
}

export class FaqResponseDto {
	categories: string[]
	items: FaqItemResponseDto[]
}
