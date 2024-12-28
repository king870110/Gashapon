import {
	Controller,
	Get,
	Put,
	Delete,
	Param,
	Body,
	UseGuards,
	ParseIntPipe,
} from "@nestjs/common"
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth,
} from "@nestjs/swagger"
import { UsersService } from "./users.service"
import { UpdateUserDto } from "./dto/update-user.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"

@ApiTags("用戶")
@Controller("users")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get(":id")
	@ApiOperation({ summary: "獲取用戶資訊" })
	@ApiResponse({ status: 200, description: "成功獲取用戶資訊" })
	findOne(@Param("id", ParseIntPipe) id: number) {
		return this.usersService.findOne(id)
	}

	@Put(":id")
	@ApiOperation({ summary: "更新用戶資訊" })
	@ApiResponse({ status: 200, description: "成功更新用戶資訊" })
	update(
		@Param("id", ParseIntPipe) id: number,
		@Body() updateUserDto: UpdateUserDto
	) {
		return this.usersService.update(id, updateUserDto)
	}

	@Delete(":id")
	@ApiOperation({ summary: "刪除用戶" })
	@ApiResponse({ status: 200, description: "成功刪除用戶" })
	remove(@Param("id", ParseIntPipe) id: number) {
		return this.usersService.remove(id)
	}
}
