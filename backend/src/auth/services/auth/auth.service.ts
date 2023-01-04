import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { UserDetails } from 'src/utils/types';
import { Repository } from 'typeorm';
import { AuthenticationProvider } from './auth'

@Injectable()
export class AuthService implements AuthenticationProvider {
	constructor(
		@InjectRepository(User) private userRepo:
		Repository<User>) {}

	async validateUser(details: UserDetails) {
		const { ft_id } = details;
		const user = await this.userRepo.findOne({ where: {ft_id: ft_id } });
		if (user) {
			await this.userRepo.update({ ft_id }, details)
			console.log('User updated')
			return user;
		}
		return this.createUser(details);
	}

	createUser(details: UserDetails) {
		console.log('Creating User');
		const user = this.userRepo.create(details);
		return this.userRepo.save(user);
	}

	findUser(ft_id: string): Promise<User | undefined> {
		return this.userRepo.findOne({ where: { ft_id: ft_id } })
	}
}
