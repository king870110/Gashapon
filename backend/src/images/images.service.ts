import { Injectable, Logger } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { CreateImageDto } from "./dto/create-image.dto"
import * as fs from "fs"
import * as path from "path"
import { Multer } from "multer"
import { UpdateImageDto } from "./dto/update-image.dto"

@Injectable()
export class ImagesService {
	private readonly logger = new Logger(ImagesService.name)
	private readonly uploadPath = "./uploads/images"

	constructor(private readonly prisma: PrismaService) {
		// 確保上傳目錄存在
		if (!fs.existsSync(this.uploadPath)) {
			fs.mkdirSync(this.uploadPath, { recursive: true })
		}
	}

	async findAll() {
		try {
			const images = await this.prisma.image.findMany({
				// include: {
				// 	user: true,
				// },
				// 可選：添加分頁
				// take: 10,
				// skip: 0,
				// orderBy: {
				//   createdAt: 'desc'
				// }
			})

			return images
		} catch (error) {
			// 使用 NestJS 的 Logger 替代 console.log
			console.error(`Failed to fetch images: ${error.message}`)
			throw new Error("Failed to fetch images")
		}
	}

	async remove(id: number) {
		return this.prisma.image.delete({
			where: { id },
		})
		// return this.prisma.image.deleteMany({
		// 	where: {
		// 	  id: id,
		// 	  userId: userId,
		// 	},
		//   });
	}

	async create(data: CreateImageDto, file: Multer.File) {
		try {
			console.log({ data })
			// 生成唯一的文件名
			const fileName = `${Date.now()}-${file.originalname}`
			const filePath = path.join(this.uploadPath, fileName)

			// 保存文件
			fs.writeFileSync(filePath, file.buffer)

			// 保存到數據庫
			return this.prisma.image.create({
				data: {
					...data,
					url: `/uploads/images/${fileName}`, // 保存相對路徑
				},
			})
		} catch (error) {
			this.logger.error(`Failed to create image: ${error.message}`)
			throw new Error("Failed to create image")
		}
	}

	async update(id: number, data: CreateImageDto, file: Multer.File) {
		try {
			console.log({ id })
			console.log({ data })
			console.log({ file })

			let fileName = ``
			let url = ``
			if (file && file.originalname) {
				// 生成唯一的文件名
				fileName = `${Date.now()}-${file.originalname}`
				url = `/uploads/images/${fileName}`
				data.url = url
				const filePath = path.join(this.uploadPath, fileName)

				// 保存文件
				fs.writeFileSync(filePath, file.buffer)
			}

			if (data.id) {
				delete data.id
			}

			// 保存到數據庫
			return this.prisma.image.update({
				where: { id },
				data: {
					...data,
				},
			})
		} catch (error) {
			this.logger.error(`Failed to create image: ${error.message}`)
			throw new Error("Failed to create image")
		}
	}
}
