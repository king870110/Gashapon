import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common"
import { ImagesService } from "../images/images.service"
import { AdminService } from "./admin.service"
import {
	BannerResponseDto,
	CreateBannerDto,
	UpdateBannerDto,
} from "../frontend/dto/banner-response.dto"

@Controller("admin")
export class AdminController {
	constructor(
		private readonly imagesService: ImagesService,
		private readonly adminService: AdminService
	) {}

	@Get("images")
	async findAllImages() {
		// 管理員查看所有圖片，傳入 null 表示不過濾用戶
		return this.imagesService.findAll()
	}

	@Get("banners")
	async findAllBanners(): Promise<BannerResponseDto[]> {
		return this.adminService.findAllBanners()
	}

	@Post("banners")
	async createBanner(
		@Body() data: CreateBannerDto
	): Promise<BannerResponseDto> {
		return this.adminService.createBanner(data)
	}

	@Put("banners/:id")
	async updateBanner(
		@Param("id") id: string,
		@Body() data: UpdateBannerDto
	): Promise<BannerResponseDto> {
		return this.adminService.updateBanner(+id, data)
	}

	@Delete("banners/:id")
	async deleteBanner(@Param("id") id: string) {
		return this.adminService.deleteBanner(+id)
	}
}
