import { Controller, Get, Req, Res, UseGuards, Post, UnauthorizedException, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
import { AuthenticatedGuard, FTAuthGuard } from 'src/auth/guards';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { User } from 'src/typeorm';
import { UserService } from 'src/users/services/user/user.service';

const parseRequest = require('parse-request');

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authenticationService: AuthService,
		private usersService: UserService,
	  ) {}

	// the user log with /api/auth/login

	@Get('login')
	@UseGuards(FTAuthGuard)
	login() {
		return;
	}
	
	// the redirect url is in /api/auth/redirect

	@Get('redirect')
	@UseGuards(FTAuthGuard)
	redirect(@Res() res: Response, @Req() req: Request) {
		let jwt = require('jwt-simple');
		let reqq = JSON.parse(JSON.stringify(req.user));
		let secret = process.env.JWT_SECRET;
		let payload = reqq.username;
		let token = jwt.encode(payload, secret);
		res.redirect(process.env.FT_REDIRECT_URL + "?jwt=" + token);
	}

	// logout in /api/auth/logout

	@Get('logout')
  	@UseGuards(AuthenticatedGuard)
  	logout(@Req() req: Request) {
    	//req.logOut();
  	}

	@Post('2fa/generate')
  	@UseGuards(FTAuthGuard)
  	async register(@Res() res, @Req() req) {
  	  const { otpAuthUrl } =
  	    await this.authenticationService.generateTwoFactorAuthenticationSecret(
  	      req.user,
  	    );
		
  	  return res.json(
  	    await this.authenticationService.generateQrCodeDataURL(otpAuthUrl),
  	  );
  	}

	  @Post('2fa/turn-on')
  	@UseGuards(FTAuthGuard)
  	async turnOnTwoFactorAuthentication(@Req() req, @Body() body) {
  	  const isCodeValid =
  	    this.authenticationService.isTwoFactorAuthenticationCodeValid(
  	      body.twoFactorAuthenticationCode,
  	      req.user,
  	    );
  	  if (!isCodeValid) {
  	    throw new UnauthorizedException('Wrong authentication code');
  	  }
  	  await this.usersService.turnOnTwoFactorAuthentication(req.user.username);
  	}

}

