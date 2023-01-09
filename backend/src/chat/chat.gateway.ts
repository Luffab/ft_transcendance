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

	//socketByUsername = {
	//	username: "",
	//	socketIds: [],
	//};

	@SubscribeMessage('messageEmitted')
	async sendMessage(@MessageBody() messageContent: MessageDto) {
		console.log("\n\n------------------------------- NEW MESSAGE -------------------------------\n")

		const newMessage = await this.chatService.createMessage(messageContent);
		this.chatService.addSocketsToUsername(newMessage.username, newMessage.socketId)
		console.log("sendMessage in ChatGateway :\n" + newMessage.username + ": " + newMessage.text);
		//console.log("sockets[" + newMessage.username + "] =")
		this.chatService.getSocketsByUsername(newMessage.username)
		this.server.emit('messageEmitted', newMessage);

		return newMessage;
	}
	
	handleConnection(client: Socket) {
		console.log(`Client connected: ${client.id}`);
	}

	handleDisconnect(client: Socket) {
		console.log(`Client disconnected: ${client.id}`);
	}
	  
	//handleConnection(client: Socket, ...args: any[]) {
	//	console.log(`Client connected: ${client.id}`);
	//}

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
