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
	status(@Req() req: Request) {
		return req.user;
	}

	// logout in /api/auth/logout

	@Get('logout')
	logout() {}
}

@Controller('finish')
export class AuthFinish {
	@Get('slt')
	finish() {
		return 'salut mon pote';
	}
}
