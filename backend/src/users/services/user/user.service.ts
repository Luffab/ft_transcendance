import { Injectable } from '@nestjs/common';
import { UserDTO } from 'src/users/dto/User.dto';
import { IUserService } from './user';

@Injectable()
export class UserService implements IUserService{

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

	async setTwoFactorAuthenticationSecret(secret: string, username: string) {
		this.users.find(user => user.username === username).twoFactorAuthenticationSecret = secret;
	  }
	
	  async turnOnTwoFactorAuthentication(username: string) {
		this.users.find(user => user.username === username).isTwoFactorAuthenticationEnabled = true;
	  }
}
