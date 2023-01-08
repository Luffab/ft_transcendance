import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import Channels from 'src/typeorm/entities/Channels';
import UsersInChan from 'src/typeorm/entities/UserinChan';
import Messages from 'src/typeorm/entities/Messages';

@Module({
	providers: [ChatGateway, ChatService],
	imports: [TypeOrmModule.forFeature([Channels]), TypeOrmModule.forFeature([UsersInChan]), TypeOrmModule.forFeature([Messages])]
})
export class ChatModule {}
