import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';

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
}