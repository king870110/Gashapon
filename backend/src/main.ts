import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	// 全局管道
	app.useGlobalPipes(new ValidationPipe({ transform: true }))

	// Swagger 配置
	const config = new DocumentBuilder()
		.setTitle("Gashapon Map API")
		.setDescription("API documentation for Gashapon Map")
		.setVersion("1.0")
		.addBearerAuth()
		.build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup("api", app, document)

	// CORS 配置
	app.enableCors()

	await app.listen(3000)
}
bootstrap()
