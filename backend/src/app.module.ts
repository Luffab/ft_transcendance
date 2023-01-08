import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
//import { entities } from './typeorm';
import { UsersModule } from './users/users.module';
import { FortytwoModule } from './fortytwo/fortytwo.module';
import { MailModule } from './mail/mail.module';
import { ChatGateway } from './chat/chat.gateway';
import { ChatModule } from './chat/chat.module';
import { ChatService } from './chat/chat.service';
import { MailService } from './mail/mail.service';
import { User } from './typeorm';
import Channels from './typeorm/entities/Channels';
import { Message } from './chat/entities/message.entity';
import Messages from './typeorm/entities/Messages';
import UsersInChan from './typeorm/entities/UserinChan';

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
				entities: [User, Channels, Messages, UsersInChan],
				synchronize: true,
			}),
	  		AuthModule, 
			UsersModule,
			PassportModule.register({ session: true }),
			FortytwoModule,
			ChatModule,
			MailModule,
		],
  controllers: [],
  providers: []
})
export class AppModule {}
