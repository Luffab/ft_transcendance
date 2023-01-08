import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect,} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { MessageDto } from './dto/message.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
	cors: {
		origine: '*',
	},
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	server: Server;

	constructor(private readonly chatService: ChatService) {}

	socketByUsername = {
		username: "",
		socketIds: [],
	};

	@SubscribeMessage('messageEmitted')
	async sendMessage(@MessageBody() messageContent: MessageDto) {
		this.socketByUsername = this.chatService.addSocketsToUsername(this.socketByUsername, messageContent.username, messageContent.socketId)
		const newMessage = await this.chatService.createMessage(messageContent);
		console.log("sendMessage in ChatGateway :\n" + newMessage.username + ": " + newMessage.text + "\n" + "sockets[" + messageContent.username + "]");
		//this.socketByUsername = this.chatService.getSocketsByUsername(messageContent.username)
		console.log(this.socketByUsername.socketIds)
		this.server.emit('messageEmitted', newMessage);

		return newMessage;
	}

	test() {
		console.log("heyyyy");
	}
	  
	handleDisconnect(client: Socket) {
		console.log(`Client disconnected: ${client.id}`);
	}
	  
	handleConnection(client: Socket, ...args: any[]) {
		console.log("salut");
		console.log(`Client connected: ${client.id}`);
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
