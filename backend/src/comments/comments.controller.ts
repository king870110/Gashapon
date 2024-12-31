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
import { CommentsService } from "./comments.service"
import { CreateCommentDto } from "./dto/create-comment.dto"
import { UpdateCommentDto } from "./dto/update-comment.dto"

@Controller("comments")
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	@Post()
	create(@Body() createCommentDto: CreateCommentDto) {
		return this.commentsService.create(createCommentDto)
	}

	@Get()
	findAll() {
		return this.commentsService.findAll()
	}

	@Get(":id")
	findOne(@Param("id", ParseIntPipe) id: number) {
		return this.commentsService.findOne(id)
	}

	@Put(":id")
	update(
		@Param("id", ParseIntPipe) id: number,
		@Body() updateCommentDto: UpdateCommentDto
	) {
		return this.commentsService.update(id, updateCommentDto)
	}

	@Delete(":id")
	remove(@Param("id", ParseIntPipe) id: number) {
		return this.commentsService.remove(id)
	}
}
