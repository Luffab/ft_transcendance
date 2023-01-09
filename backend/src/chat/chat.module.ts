import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import Channels from 'src/typeorm/entities/Channels';
import UsersInChan from 'src/typeorm/entities/UserinChan';
import Messages from 'src/typeorm/entities/Messages';
import { ChatController } from './chat.controller';
import { UserService } from 'src/users/services/user/user.service';
import { User } from 'src/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
	controllers:[ChatController],
	providers: [ChatGateway, ChatService, UsersInChan],
	imports: [UsersInChan,TypeOrmModule.forFeature([Channels]), TypeOrmModule.forFeature([UsersInChan]), TypeOrmModule.forFeature([Messages]), TypeOrmModule.forFeature([User])],
	exports: [ChatService]
})
export class ChatModule {}
