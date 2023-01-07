import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { FTStrategy } from './strategies';
import { AuthService } from './services/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { SessionSerializer } from './utils/serializer';
import { MailModule } from 'src/mail/mail.module';
import { UserService } from 'src/users/services/user/user.service';

@Module({
  controllers: [AuthController],
  providers: [
		FTStrategy,
		UserService,
		AuthService,
		SessionSerializer,
		{
	  		provide: 'AUTH_SERVICE',
	  		useClass: AuthService,
  		},
	],
	imports: [TypeOrmModule.forFeature([User]),
				MailModule,
			],
})
export class AuthModule {}
