import { Controller, Get, Req, Res, UseGuards, Post, UnauthorizedException, Body, Put, Param } from '@nestjs/common';
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
		//private usersService: UserService,
	  ) {}

	// the user log with /api/auth/login

	@Get('login')
	@UseGuards(FTAuthGuard)
	login() {
		return;;
	}
	
	// the redirect url is in /api/auth/redirect

	@Get('redirect')
	@UseGuards(FTAuthGuard)
	redirect(@Res() res: Response, @Req() req: Request) {
		let jwt = require('jwt-simple');
		let reqq = JSON.parse(JSON.stringify(req.user));
		let secret = process.env.JWT_SECRET;
		let payload = {
			username: reqq.username,
			is2fa: reqq.is2fa };
		let token = jwt.encode(payload, secret);
		//console.log(token);
		res.redirect(process.env.FT_REDIRECT_URL + "?jwt=" + token);
	}

	// logout in /api/auth/logout

	@Get('logout')
  	@UseGuards(AuthenticatedGuard)
  	logout(@Req() req: Request) {
    	//req.logOut();
  	}

	  //test

	//   @Get('2fa/generate')
	//   @UseGuards(AuthenticatedGuard)
	//   generate(@Req() req: Request) {
	// 	  let reqq = JSON.parse(JSON.stringify(req.user));
	// 	  return this.authenticationService.generate2fa(reqq.ft_id, req.user)
	//   }
}

