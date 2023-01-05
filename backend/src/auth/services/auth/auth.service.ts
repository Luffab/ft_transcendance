import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { UserDetails } from 'src/utils/types';
import { Repository } from 'typeorm';
import { AuthenticationProvider } from './auth'
import { authenticator } from 'otplib';
import { UserDTO } from 'src/users/dto/User.dto';
import { UserService } from 'src/users/services/user/user.service';
import { toDataURL } from 'qrcode';

let jwt = require('jwt-simple');

@Injectable()
export class AuthService implements AuthenticationProvider {
	constructor(
		@InjectRepository(User) private userRepo:
		Repository<User>,
		private usersService: UserService) {}

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

	async login(user: UserDTO) {
		const payload = user.username;
		let secret = process.env.JWT_SECRET;
		let token = jwt.encode(payload, secret);
		return(token);
	}

	async login2fa(user: UserDTO) {
		const payload = {
			isTwoFactorAuthenticationEnabled: !!user.isTwoFactorAuthenticationEnabled,
			isTwoFactorAuthenticated: true,
		  };
		let secret = process.env.JWT_SECRET;
		let token = jwt.encode(payload, secret);
		return(token);
	}

	async generateTwoFactorAuthenticationSecret(user: User) {
		const secret = authenticator.generateSecret();
	
		const otpAuthUrl = authenticator.keyuri(
		  user.username,
		  'AUTH_APP_NAME',
		  secret,
		);
	
		await this.usersService.setTwoFactorAuthenticationSecret(
		  secret,
		  user.username,
		);
	
		return {
		  secret,
		  otpAuthUrl,
		};
	  }

	  async generateQrCodeDataURL(otpAuthUrl: string) {
		return toDataURL(otpAuthUrl);
	  }

	  isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode: string, user: UserDTO) {
		return authenticator.verify({
		  token: twoFactorAuthenticationCode,
		  secret: user.twoFactorAuthenticationSecret,
		});
	  }
}
