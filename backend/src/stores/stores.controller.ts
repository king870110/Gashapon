import {
	Controller,
	Get,
	Post,
	Put,
	Delete,
	Body,
	Param,
	Query,
	UseGuards,
	ParseIntPipe,
	ParseFloatPipe,
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
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"

@ApiTags("商店")
@Controller("stores")
export class StoresController {
	constructor(private readonly storesService: StoresService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: "創建商店" })
	@ApiResponse({ status: 201, description: "成功創建商店" })
	create(@Body() createStoreDto: CreateStoreDto) {
		return this.storesService.create(createStoreDto)
	}

	@Get()
	@ApiOperation({ summary: "獲取所有商店" })
	@ApiResponse({ status: 200, description: "成功獲取所有商店" })
	findAll() {
		return this.storesService.findAll()
	}

	@Get("nearby")
	@ApiOperation({ summary: "獲取附近商店" })
	@ApiResponse({ status: 200, description: "成功獲取附近商店" })
	findNearby(
		@Query("lat", ParseFloatPipe) lat: number,
		@Query("lng", ParseFloatPipe) lng: number,
		@Query("radius", ParseFloatPipe) radius: number
	) {
		return this.storesService.findNearby(lat, lng, radius)
	}

	@Get(":id")
	@ApiOperation({ summary: "獲取商店詳情" })
	@ApiResponse({ status: 200, description: "成功獲取商店詳情" })
	findOne(@Param("id", ParseIntPipe) id: number) {
		return this.storesService.findOne(id)
	}

	@Put(":id")
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: "更新商店資訊" })
	@ApiResponse({ status: 200, description: "成功更新商店資訊" })
	update(
		@Param("id", ParseIntPipe) id: number,
		@Body() updateStoreDto: UpdateStoreDto
	) {
		return this.storesService.update(id, updateStoreDto)
	}

	@Delete(":id")
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: "刪除商店" })
	@ApiResponse({ status: 200, description: "成功刪除商店" })
	remove(@Param("id", ParseIntPipe) id: number) {
		return this.storesService.remove(id)
	}
}
