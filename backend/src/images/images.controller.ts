import {
	Controller,
	Post,
	Put,
	Delete,
	UseInterceptors,
	UploadedFile,
	Body,
	Get,
	Param,
	ParseIntPipe,
} from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { ImagesService } from "./images.service"
import { CreateImageDto } from "./dto/create-image.dto"
import { Multer } from "multer"
import { UpdateImageDto } from "./dto/update-image.dto"

@Controller("images")
export class ImagesController {
	constructor(private readonly imagesService: ImagesService) {}

	@Get()
	findAllImages() {
		return this.imagesService.findAll() // 移除 null 參數
	}

	@Post("upload")
	@UseInterceptors(FileInterceptor("file"))
	async uploadFile(@UploadedFile() file: Multer.File) {
		console.log({ file })
		// 這裡假設你有一個上傳到雲存儲的邏輯
		const url = `http://127.0.0.1:3000/public/uploads/images/${file.filename}`
		return { url }
	}

	// @Post()
	// async create(@Body() createImageDto: CreateImageDto) {
	// 	return this.imagesService.create(createImageDto)
	// }

	@Post()
	@UseInterceptors(FileInterceptor("file"))
	async createImage(
		@Body() createImageDto: CreateImageDto,
		@UploadedFile() file: Multer.File
	) {
		return this.imagesService.create(createImageDto, file)
	}

	@Put(":id")
	@UseInterceptors(FileInterceptor("file"))
	update(
		@Param("id", ParseIntPipe) id: number,
		@Body() UpdateImageDto: CreateImageDto,
		@UploadedFile() file: Multer.File
	) {
		console.log({ id })
		console.log({ UpdateImageDto })
		console.log({ file })
		return this.imagesService.update(id, UpdateImageDto, file)
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.imagesService.remove(Number(id))
	}
}
