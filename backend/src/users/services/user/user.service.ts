import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { ImageDTO, UserDTO, UsernameDTO } from 'src/users/dto/User.dto';
import { Repository } from 'typeorm';
import { IUserService } from '../../user';

let jwt = require('jwt-simple');

@Injectable()
export class UserService implements IUserService{
	constructor (
		@InjectRepository(User) private readonly userRepo: Repository<User>
	) {}

	private users: UserDTO[] = [];
	createUser(user: UserDTO) {
		return  this.users.push(user);
	}

	getUser(): UserDTO[] {
		return this.users;
	}

	deleteUser() {

	}

	getUserByUsername(username: string): UserDTO | undefined {
		return this.users.find((user) => user.username === username);
	}

	changeimage(image: ImageDTO) {
		let secret = process.env.JWT_SECRET;
		let usernametoken = jwt.decode(image.token, secret);
		this.userRepo
    			.createQueryBuilder()
    			.update(User)
    			.set({ avatar: image.image })
    			.where("ft_id= :id", { id: usernametoken.ft_id })
    			.execute()
	}

	changeusername(username: UsernameDTO) {
		let secret = process.env.JWT_SECRET;
		let usernametoken = jwt.decode(username.token, secret);
		let json = { "avatar": username.username }
		this.userRepo
    			.createQueryBuilder()
    			.update(User)
    			.set({ username: username.username })
    			.where("ft_id= :id", { id: usernametoken.ft_id })
    			.execute()
	}
}
