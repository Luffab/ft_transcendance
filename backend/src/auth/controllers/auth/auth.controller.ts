import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
import { AuthenticatedGuard, FTAuthGuard } from 'src/auth/guards';
import { User } from 'src/typeorm';

const parseRequest = require('parse-request');

@Controller('auth')
export class AuthController {

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
		let secret = 'eewn3g3rg5rg4564DDD**rfrgtbt8r79bjvrfrf';
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

	  //test

	@Get('test')
	@UseGuards(AuthenticatedGuard)
	test(@Res() res: Response) {
		res.send({"name":"GeeksforGeeks"});
		//return "Bonjour";
	}
}

