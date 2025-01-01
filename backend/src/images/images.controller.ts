import {
	Controller,
	Get,
	Post,
	Delete,
	Body,
	Param,
	ParseIntPipe,
	UseGuards,
	Request,
} from "@nestjs/common"
import { ImagesService } from "./images.service"
import { CreateImageDto } from "./dto/create-image.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { RolesGuard } from "../auth/guards/roles.guard"
import { Roles } from "../auth/decorators/roles.decorator"
import { Role } from "@prisma/client"

@Controller("images")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ImagesController {
	constructor(private readonly imagesService: ImagesService) {}

	@Post()
	@Roles(Role.ADMIN, Role.MERCHANT)
	create(@Request() req, @Body() createImageDto: CreateImageDto) {
		return this.imagesService.create(createImageDto, req.user.id)
	}

	@Get()
	@Roles(Role.ADMIN, Role.MERCHANT)
	findAll(@Request() req) {
		return this.imagesService.findAll(req.user.id)
	}

	@Delete(":id")
	@Roles(Role.ADMIN, Role.MERCHANT)
	remove(@Request() req, @Param("id", ParseIntPipe) id: number) {
		return this.imagesService.remove(id, req.user.id)
	}
}
