import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { MessageDto } from './dto/message.dto';
import { Server } from 'socket.io';

@WebSocketGateway({
	cors: {
		origine: '*',
	},
})
export class ChatGateway {
	@WebSocketServer()
	server: Server;

	constructor(private readonly chatService: ChatService) {}

	@SubscribeMessage('messageEmitted')
	async sendMessage(@MessageBody() messageContent: MessageDto) {
		const newMessage = await this.chatService.createMessage(messageContent);
		console.log("sendMessage in ChatGateway :\n" + newMessage.username + ": " + newMessage.text + "\n");
		this.server.emit('messageEmitted', newMessage);

		return newMessage;
	}

	//@SubscribeMessage('findAllMessages')
	//findAll() {
	//	return this.chatService.findAll();
	//}

	//@SubscribeMessage('join')
	//joinRoom(
	//	@MessageBody('name') name: string,
	//	@ConnectedSocket() client: Socket,
	//)	{
	//		return this.chatService.identify(name, client.id);
	//}
}

//import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
//
//@WebSocketGateway({ cors: '*' })
//export class ChatGateway {
//	@WebSocketServer()
//	server;
//	@SubscribeMessage('messageEmitted')
//	handleMessage(@MessageBody() message: string): void {
//		console.log("Message: "+message);
//		this.server.emit('messageEmitted', message);
//	}
//}
