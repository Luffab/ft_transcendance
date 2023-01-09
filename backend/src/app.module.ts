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
			ConfigModule.forRoot({ envFilePath: '../../.env'}),
	  		TypeOrmModule.forRoot({
				type: 'postgres',
				host: 'postgres',
				username: process.env.POSTGRES_USER,
				password: process.env.POSTGRES_PASSWORD,
				database: process.env.POSTGRES_DB,
				//entities: [User, Channels, Messages, UsersInChan],
				autoLoadEntities: true,
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
