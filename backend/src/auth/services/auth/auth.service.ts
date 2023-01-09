import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';
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
		private mailService: MailService
		) {}

		async validateUser(details: UserDetails) {
			const { ft_id } = details;
			const { emails } = details;
			const user = await this.userRepo.findOne({ where: {ft_id: ft_id } });
			if (user) {
				await this.userRepo.update({ ft_id }, details);
				this.userRepo
					.createQueryBuilder()
					.update(User)
					.set({ emails: emails[0].value })
					.where("ft_id= :id", { id: ft_id })
					.execute()
				console.log('\nUser updated\n');
				return user;
			}
			return this.createUser(details);
		}

	async createUser(details: UserDetails) {
		console.log('\nCreating User\n');
		const { ft_id } = details;
		const { emails } = details;
		const user = this.userRepo.create(details);
		this.userRepo
					.createQueryBuilder()
					.update(User)
					.set({ emails: emails[0].value })
					.where("ft_id= :id", { id: ft_id })
					.execute()
		return this.userRepo.save(user);
	}

	findUser(ft_id: string): Promise<User | undefined> {
		return this.userRepo.findOne({ where: { ft_id: ft_id } })
	}

	//find2fa(tfa: boolean): Promise<User | undefined> {
	//	return this.userRepo.findOne({ where: { is2fa: tfa } })
	//}
	//
	async generate2fa(ft_id: string, user: Partial<User>) {
		if (this.userRepo.findOne({ where: { is2fa: true } })) {
			let random = generateRandomString(6);
			console.log(user.emails);
			await this.mailService.sendUserConfirmation(user.emails, user.username, random);
			this.userRepo
    			.createQueryBuilder()
    			.update(User)
    			.set({ verify_code: random })
    			.where("ft_id= :id", { id: ft_id })
    			.execute()
		}
		return user;
	}

	twofaactivate(id: string) {
		this.userRepo
    			.createQueryBuilder()
    			.update(User)
    			.set({ is2fa: true })
    			.where("ft_id= :id", { ft_id: id })
    			.execute()
	}
}

const generateRandomString = (myLength) => {
	const chars =
	  "0123456789";
	const randomArray = Array.from(
	  { length: myLength },
	  (v, k) => chars[Math.floor(Math.random() * chars.length)]
	);
	const randomString = randomArray.join("");
	return randomString;
  };