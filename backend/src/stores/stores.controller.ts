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
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth,
} from "@nestjs/swagger"
import { StoresService } from "./stores.service"

import { CreateStoreDto } from "./dto/create-store.dto"
import { UpdateStoreDto } from "./dto/update-store.dto"
import { UpdateStoreStoreDto } from "./dto/update-store-product.dto"

@ApiTags("stores")
@ApiBearerAuth()
@Controller("stores")
export class StoresController {
	constructor(private readonly storesService: StoresService) {}

	@Post()
	@ApiOperation({ summary: "Create a new store" })
	@ApiResponse({
		status: 201,
		description: "The store has been successfully created.",
	})
	create(@Body() createStoreDto: CreateStoreDto) {
		return this.storesService.create(createStoreDto)
	}

	@Get()
	@ApiOperation({ summary: "Get all stores" })
	@ApiResponse({ status: 200, description: "Return all stores." })
	findAll() {
		return this.storesService.findAll()
	}

	@Get(":id")
	@ApiOperation({ summary: "Get store by ID" })
	@ApiResponse({ status: 200, description: "Return a store." })
	findOne(@Param("id", ParseIntPipe) id: number) {
		return this.storesService.findOne(id)
	}

	@Put(":id")
	@ApiOperation({ summary: "Update a store" })
	@ApiResponse({
		status: 200,
		description: "The store has been successfully updated.",
	})
	update(
		@Param("id", ParseIntPipe) id: number,
		@Body() updateStoreDto: UpdateStoreDto
	) {
		return this.storesService.update(id, updateStoreDto)
	}

	@Put(":id/products")
	@ApiOperation({ summary: "Update a store" })
	@ApiResponse({
		status: 200,
		description: "The store has been successfully updated.",
	})
	updateStoreStore(
		@Param("id", ParseIntPipe) id: number,
		@Body() UpdateStoreStoreDto: UpdateStoreStoreDto
	) {
		return this.storesService.updateStoreStore(id, UpdateStoreStoreDto)
	}

	@Delete(":id")
	@ApiOperation({ summary: "Delete a store" })
	@ApiResponse({
		status: 200,
		description: "The store has been successfully deleted.",
	})
	remove(@Param("id", ParseIntPipe) id: number) {
		return this.storesService.remove(id)
	}

	@Get("user/:userId")
	findByUserId(@Param("userId", ParseIntPipe) userId: number) {
		return this.storesService.findByUserId(userId)
	}
}
