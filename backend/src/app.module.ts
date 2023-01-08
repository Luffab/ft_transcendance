import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { entities } from './typeorm';
import { UsersModule } from './users/users.module';
import { FortytwoModule } from './fortytwo/fortytwo.module';
import { ChatGateway } from './chat/chat.gateway';
import { ChatModule } from './chat/chat.module';
import { ChatService } from './chat/chat.service';

@Module({
  imports: [
			ConfigModule.forRoot({ envFilePath: 'back.env'}),
	  		TypeOrmModule.forRoot({
				type: 'postgres',
				host: process.env.DB_HOST,
				port: Number.parseInt(process.env.DB_PORT),
				username: process.env.DB_USERNAME,
				password: process.env.DB_PASSWORD,
				database: process.env.DB_DATABASE,
				entities,
				synchronize: true,
			}),
	  		AuthModule, 
			UsersModule,
			PassportModule.register({ session: true }),
			FortytwoModule,
			ChatModule,
		],
  controllers: [],
  providers: []
})
export class AppModule {}
