import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import {
	BannerResponseDto,
	CreateBannerDto,
	UpdateBannerDto,
} from "../frontend/dto/banner-response.dto"

@Injectable()
export class AdminService {
	constructor(private readonly prisma: PrismaService) {}

	async findAllBanners(): Promise<BannerResponseDto[]> {
		const banners = await this.prisma.banner.findMany({
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

	async createBanner(data: CreateBannerDto): Promise<BannerResponseDto> {
		const banner = await this.prisma.banner.create({
			data: {
				title: data.title,
				imageUrl: data.image_url,
				link: data.link || "",
				isActive: data.is_active ?? true,
				order: data.sort || 0,
			},
		})

		return {
			id: banner.id,
			title: banner.title || "",
			description: "",
			image_url: banner.imageUrl,
			link: banner.link,
			sort: banner.order,
			is_active: banner.isActive,
			created_at: banner.createdAt,
			updated_at: banner.updatedAt,
		}
	}

	async updateBanner(
		id: number,
		data: UpdateBannerDto
	): Promise<BannerResponseDto> {
		const banner = await this.prisma.banner.update({
			where: { id },
			data: {
				title: data.title,
				imageUrl: data.image_url,
				link: data.link,
				isActive: data.is_active,
				order: data.sort,
			},
		})

		return {
			id: banner.id,
			title: banner.title || "",
			description: "",
			image_url: banner.imageUrl,
			link: banner.link,
			sort: banner.order,
			is_active: banner.isActive,
			created_at: banner.createdAt,
			updated_at: banner.updatedAt,
		}
	}

	async deleteBanner(id: number) {
		return this.prisma.banner.delete({
			where: { id },
		})
	}
}
