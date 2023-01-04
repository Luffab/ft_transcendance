import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { FTStrategy } from './strategies';
import { AuthService } from './services/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { SessionSerializer } from './utils/serializer';

@Module({
  controllers: [AuthController],
  providers: [
		FTStrategy,
		SessionSerializer,
		{
	  		provide: 'AUTH_SERVICE',
	  		useClass: AuthService,
  		},
	],
	imports: [TypeOrmModule.forFeature([User])],
})
export class AuthModule {}
