import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { HomeResponseDto } from "./dto/home-response.dto"
import { FaqResponseDto } from "./dto/faq-response.dto"

@Injectable()
export class FrontendService {
	constructor(private readonly prisma: PrismaService) {}

	// async getHome(): Promise<HomeResponseDto> {
	// 	const [banners, products] = await Promise.all([
	// 		this.findAllBanners(),
	// 		this.findAllProducts(),
	// 	])

	// 	return {
	// 		banners,
	// 		products,
	// 	}
	// }

	async findAllBanners() {
		const banners = await this.prisma.banner.findMany({
			where: {
				isActive: true,
			},
			orderBy: {
				order: "asc",
			},
		})

		return banners.map((banner) => ({
			id: banner.id,
			title: banner.title || "",
			description: "",
			image_url: banner.imageUrl,
			link: banner.link,
			sort: banner.order,
			is_active: banner.isActive,
			created_at: banner.createdAt,
			updated_at: banner.updatedAt,
		}))
	}

	async findAllProducts() {
		const products = await this.prisma.product.findMany({
			where: {},
			include: {
				stores: true,
				image: true,
			},
		})

		return products.map((product) => ({
			id: product.id,
			name: product.name,
			description: product.description || "",
			price: product.price,
			image_url: product.image.url,
			stores:true,
			created_at: product.createdAt,
			updated_at: product.updatedAt,
		}))
	}

	async findAllFaqs(): Promise<FaqResponseDto> {
		const faqs = await this.prisma.faq.findMany({
			where: {
				isActive: true,
			},
			orderBy: {
				order: "asc",
			},
		})

		const categories = Array.from(new Set(faqs.map((faq) => faq.category)))

		return {
			categories,
			items: faqs.map((faq) => ({
				id: faq.id,
				question: faq.question,
				answer: faq.answer,
				category: faq.category,
				sort: faq.order,
				is_active: faq.isActive,
				created_at: faq.createdAt,
				updated_at: faq.updatedAt,
			})),
		}
	}
}
