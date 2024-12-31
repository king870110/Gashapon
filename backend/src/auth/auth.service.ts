import { Injectable } from "@nestjs/common"
import { UsersService } from "../users/users.service"

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService) {}

	async findAll() {
		return this.usersService.findAll()
	}
}
