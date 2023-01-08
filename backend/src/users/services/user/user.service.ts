import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { UserDTO } from 'src/users/dto/User.dto';
import { Repository } from 'typeorm';
import { IUserService } from '../../user';

@Injectable()
export class UserService implements IUserService{
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
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
}
