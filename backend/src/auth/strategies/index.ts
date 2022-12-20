import { Strategy, Profile } from 'passport-42';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { AuthenticationProvider } from '../services/auth/auth';

@Injectable()
export class FTStrategy extends PassportStrategy(Strategy) {
	constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthenticationProvider) {
		super({
			clientID: 'u-s4t2ud-447e173752bf779dab453ef688b2e1307f846c8d8cc22b625baad5ab79c77720',
			clientSecret: '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',
			callbackURL: '/api/auth/redirect',
			scope: ['public'],
		});
	}

	async validate(accessToken: string, refreshToken: string, profile: Profile) {
		const { username, id: ft_id, avatar } = profile;
		const details = { username, ft_id, avatar };
		return this.authService.validateUser(details);
	}
}