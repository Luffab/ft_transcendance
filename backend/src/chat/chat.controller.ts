import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChannelDTO, UserInChanDTO, UserNotInChanDTO } from './dto/chat.dto';

@Controller('chat')
export class ChatController {
	constructor(
		private readonly chatService: ChatService,
	) {}

	@Get('channels')
	getChannels(@Query() query: { token: string }) {
		return this.chatService.getAllChannels(query.token);
	}

	@Get('users')
	getUsers(@Query() query: { token: string }) {
		return this.chatService.getAllUsers(query.token);
	}

	@Post('create')
	createChannel(@Body() body: ChannelDTO) {
		//console.log(body);
		return this.chatService.createChannel(body);
	}

	@Post('add_users')
	addusers(@Body() body: UserInChanDTO) {
		return this.chatService.addUserInChan(body);
	}

	@Get('get_users_not_in_chan')
	getusersnotinchan(@Body() body: UserNotInChanDTO) {
		return this.chatService.getUserNotInChan(body);
	}
}