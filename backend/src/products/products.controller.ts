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
} from "@nestjs/common"
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth,
} from "@nestjs/swagger"
import { ProductsService } from "./products.service"
import { CreateProductDto } from "./dto/create-product.dto"
import { UpdateProductDto } from "./dto/update-product.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"

@ApiTags("商品")
@Controller("products")
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: "創建商品" })
	@ApiResponse({ status: 201, description: "成功創建商品" })
	create(@Body() createProductDto: CreateProductDto) {
		return this.productsService.create(createProductDto)
	}

	@Get()
	@ApiOperation({ summary: "獲取所有商品" })
	@ApiResponse({ status: 200, description: "成功獲取所有商品" })
	findAll() {
		return this.productsService.findAll()
	}

	@Get("search")
	@ApiOperation({ summary: "搜尋商品" })
	@ApiResponse({ status: 200, description: "成功搜尋商品" })
	search(@Query("q") query: string) {
		return this.productsService.search(query)
	}

	@Get("store/:storeId")
	@ApiOperation({ summary: "獲取商店的所有商品" })
	@ApiResponse({ status: 200, description: "成功獲取商店的所有商品" })
	findByStore(@Param("storeId", ParseIntPipe) storeId: number) {
		return this.productsService.findByStore(storeId)
	}

	@Get(":id")
	@ApiOperation({ summary: "獲取商品詳情" })
	@ApiResponse({ status: 200, description: "成功獲取商品詳情" })
	findOne(@Param("id", ParseIntPipe) id: number) {
		return this.productsService.findOne(id)
	}

	@Put(":id")
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: "更新商品資訊" })
	@ApiResponse({ status: 200, description: "成功更新商品資訊" })
	update(
		@Param("id", ParseIntPipe) id: number,
		@Body() updateProductDto: UpdateProductDto
	) {
		return this.productsService.update(id, updateProductDto)
	}

	@Delete(":id")
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: "刪除商品" })
	@ApiResponse({ status: 200, description: "成功刪除商品" })
	remove(@Param("id", ParseIntPipe) id: number) {
		return this.productsService.remove(id)
	}
}
