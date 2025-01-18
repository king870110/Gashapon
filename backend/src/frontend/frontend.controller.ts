import { Controller, Get } from "@nestjs/common"
import { FrontendService } from "./frontend.service"
import { HomeResponseDto } from "./dto/home-response.dto"
import { FaqResponseDto } from "./dto/faq-response.dto"

@Controller()
export class FrontendController {
	constructor(private readonly frontendService: FrontendService) {}

	// @Get()
	// async getHome(): Promise<HomeResponseDto> {
	// 	return this.frontendService.getHome()
	// }

	@Get("faqs")
	async getFaqs(): Promise<FaqResponseDto> {
		return this.frontendService.findAllFaqs()
	}
}
