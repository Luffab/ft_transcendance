import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Post } from '@nestjs/common';
import { UserDTO } from 'src/users/dto/User.dto';
import { IUserService } from 'src/users/services/user/user';
import { UserService } from 'src/users/services/user/user.service';


// /api/users
@Controller('users')
export class UsersController {
	constructor(@Inject('USER_SERVICE') private readonly userService: IUserService) {}

	@Get()
	getUsers() {
		return this.userService.getUser();
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	createUser(@Body() user: UserDTO) {
		return this.userService.createUser(user);
	}

	@Delete()
	deleteUser() {
		this.userService.deleteUser();  
	}

	@Get(':username')
	@HttpCode(HttpStatus.OK)
	getUserByUsername(@Param('username') username: string) {
		const user = this.userService.getUserByUsername(username);
		return user ? user : {};
	}
}
