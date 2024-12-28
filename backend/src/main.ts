import { NestFactory } from "@nestjs/core"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import { AppModule } from "./app.module"
import * as morgan from "morgan"
import { ValidationPipe } from "./common/pipes/validation.pipe"
import { HttpExceptionFilter } from "./common/filters/http-exception.filter"

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	// 啟用 CORS
	app.enableCors()

	// 使用全局管道
	app.useGlobalPipes(new ValidationPipe())

	// 使用全局異常過濾器
	app.useGlobalFilters(new HttpExceptionFilter())

	// 使用 Morgan 記錄 HTTP 請求
	app.use(morgan("dev"))

	// 設置 Swagger
	const config = new DocumentBuilder()
		.setTitle("扭蛋地圖 API")
		.setDescription("扭蛋地圖後端 API 文檔")
		.setVersion("1.0")
		.addBearerAuth()
		.build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup("api", app, document)

	await app.listen(process.env.PORT || 3000)
}
bootstrap()
