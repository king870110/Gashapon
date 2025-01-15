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
import { ProductsService } from "./products.service"
import { CreateProductDto } from "./dto/create-product.dto"
import { UpdateProductDto } from "./dto/update-product.dto"

@Controller("products")
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Post("create")
	create(@Body() createProductDto: CreateProductDto) {
		return this.productsService.create(createProductDto)
	}

	@Get()
	findAll() {
		return this.productsService.findAll()
	}

	@Get(":id")
	findOne(@Param("id", ParseIntPipe) id: number) {
		return this.productsService.findOne(id)
	}

	@Put(":id")
	update(
		@Param("id", ParseIntPipe) id: number,
		@Body() updateProductDto: UpdateProductDto
	) {
		return this.productsService.update(id, updateProductDto)
	}

	@Delete(":id")
	remove(@Param("id", ParseIntPipe) id: number) {
		return this.productsService.remove(id)
	}
}
