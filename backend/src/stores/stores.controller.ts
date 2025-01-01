import {
	Controller,
	Get,
	Post,
	Put,
	Delete,
	Body,
	Param,
	ParseIntPipe,
} from "@nestjs/common"
import { StoresService } from "./stores.service"
import { CreateStoreDto } from "./dto/create-store.dto"
import { UpdateStoreDto } from "./dto/update-store.dto"

@Controller("stores")
export class StoresController {
	constructor(private readonly storesService: StoresService) {}

	@Post()
	create(@Body() createStoreDto: CreateStoreDto) {
		return this.storesService.create(createStoreDto)
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
	update(
		@Param("id", ParseIntPipe) id: number,
		@Body() updateStoreDto: UpdateStoreDto
	) {
		return this.storesService.update(id, updateStoreDto)
	}

	@Delete(":id")
	remove(@Param("id", ParseIntPipe) id: number) {
		return this.storesService.remove(id)
	}

	@Get("user/:userId")
	findByUserId(@Param("userId", ParseIntPipe) userId: number) {
		return this.storesService.findByUserId(userId)
	}
}
