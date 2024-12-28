import { Controller, Post, Body } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger"
import { AuthService } from "./auth.service"
import { LoginDto } from "./dto/login.dto"
import { RegisterDto } from "./dto/register.dto"

@ApiTags("認證")
@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("register")
	@ApiOperation({ summary: "用戶註冊" })
	@ApiResponse({ status: 201, description: "註冊成功" })
	register(@Body() dto: RegisterDto) {
		return this.authService.register(dto)
	}

	@Post("login")
	@ApiOperation({ summary: "用戶登入" })
	@ApiResponse({ status: 200, description: "登入成功" })
	login(@Body() dto: LoginDto) {
		return this.authService.login(dto)
	}
}
