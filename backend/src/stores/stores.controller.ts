import {
	Controller,
	Get,
	Post,
	Put,
	Delete,
	Body,
	Param,
	ParseIntPipe,
	UseGuards,
	Request,
} from "@nestjs/common"
import { StoresService } from "./stores.service"
import { CreateStoreDto } from "./dto/create-store.dto"
import { UpdateStoreDto } from "./dto/update-store.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { RolesGuard } from "../auth/guards/roles.guard"
import { Roles } from "../auth/decorators/roles.decorator"
import { Role } from "@prisma/client"

@Controller("stores")
@UseGuards(JwtAuthGuard, RolesGuard)
export class StoresController {
	constructor(private readonly storesService: StoresService) {}

	@Post()
	@Roles(100)
	create(@Request() req, @Body() createStoreDto: CreateStoreDto) {
		return this.storesService.create(createStoreDto, req.user.id)
	}

	@Get()
	findAll() {
		return this.storesService.findAll()
	}

	@Get(":id")
	findOne(@Param("id", ParseIntPipe) id: number) {
		return this.storesService.findOne(id)
	}

	@Put(":id")
	@Roles(100)
	update(
		@Request() req,
		@Param("id", ParseIntPipe) id: number,
		@Body() updateStoreDto: UpdateStoreDto
	) {
		return this.storesService.update(id, updateStoreDto, req.user.id)
	}

	@Delete(":id")
	@Roles(Role.ADMIN, Role.MERCHANT)
	remove(@Request() req, @Param("id", ParseIntPipe) id: number) {
		return this.storesService.remove(id, req.user.id)
	}
}
