import {
	Controller,
	Get,
	Post,
	Put,
	Delete,
	Body,
	Param,
	UseGuards,
	ParseIntPipe,
	Request,
} from "@nestjs/common"
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth,
} from "@nestjs/swagger"
import { CommentsService } from "./comments.service"
import { CreateCommentDto } from "./dto/create-comment.dto"
import { UpdateCommentDto } from "./dto/update-comment.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"

@ApiTags("評論")
@Controller("comments")
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: "創建評論" })
	@ApiResponse({ status: 201, description: "成功創建評論" })
	create(@Request() req, @Body() createCommentDto: CreateCommentDto) {
		return this.commentsService.create(req.user.userId, createCommentDto)
	}

	@Get()
	@ApiOperation({ summary: "獲取所有評論" })
	@ApiResponse({ status: 200, description: "成功獲取所有評論" })
	findAll() {
		return this.commentsService.findAll()
	}

	@Get("store/:storeId")
	@ApiOperation({ summary: "獲取商店的所有評論" })
	@ApiResponse({ status: 200, description: "成功獲取商店的所有評論" })
	findByStore(@Param("storeId", ParseIntPipe) storeId: number) {
		return this.commentsService.findByStore(storeId)
	}

	@Get("user/:userId")
	@ApiOperation({ summary: "獲取用戶的所有評論" })
	@ApiResponse({ status: 200, description: "成功獲取用戶的所有評論" })
	findByUser(@Param("userId", ParseIntPipe) userId: number) {
		return this.commentsService.findByUser(userId)
	}

	@Get(":id")
	@ApiOperation({ summary: "獲取評論詳情" })
	@ApiResponse({ status: 200, description: "成功獲取評論詳情" })
	findOne(@Param("id", ParseIntPipe) id: number) {
		return this.commentsService.findOne(id)
	}

	@Put(":id")
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: "更新評論" })
	@ApiResponse({ status: 200, description: "成功更新評論" })
	update(
		@Request() req,
		@Param("id", ParseIntPipe) id: number,
		@Body() updateCommentDto: UpdateCommentDto
	) {
		return this.commentsService.update(id, req.user.userId, updateCommentDto)
	}

	@Delete(":id")
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiOperation({ summary: "刪除評論" })
	@ApiResponse({ status: 200, description: "成功刪除評論" })
	remove(@Request() req, @Param("id", ParseIntPipe) id: number) {
		return this.commentsService.remove(id, req.user.userId)
	}
}
