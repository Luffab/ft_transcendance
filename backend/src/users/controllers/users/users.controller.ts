import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Post, Put } from '@nestjs/common';
import { ImageDTO, UserDTO, UsernameDTO } from 'src/users/dto/User.dto';
import { IUserService } from 'src/users/user';
import { UserService } from 'src/users/services/user/user.service';
import { Observable } from 'rxjs';


// /api/users
@Controller('users')
export class UsersController {
	constructor(@Inject('USER_SERVICE') private readonly userService: IUserService,
	private readonly usersService: UserService) {}

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

	@Post('modify_image')
	modifyimage(@Body() body: ImageDTO) {
		this.usersService.changeimage(body);
	}

	@Post('change_username')
	changeusername(@Body() body: UsernameDTO) {
		this.usersService.changeusername(body);
	}
}
