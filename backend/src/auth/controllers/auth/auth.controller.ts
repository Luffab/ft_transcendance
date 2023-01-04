import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
import { AuthenticatedGuard, FTAuthGuard } from 'src/auth/guards';

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
	redirect(@Res() res: Response) {
		console.log(process.env.DB_PORT);
		res.redirect(process.env.FT_REDIRECT_URL);
	}

	// the auth status is in /api/auth/status

	@Get('status')
	@UseGuards(AuthenticatedGuard)
	status(@Res() res: Response, @Req() req: Request) {
		let jwt = require('jwt-simple');
		let payload = req.user;
		let secret = 'eewn3g3rg5rg4564DDD**rfrgtbt8r79bjvrfrf';
		let token = jwt.encode(payload, secret);
		res.send(token);
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

