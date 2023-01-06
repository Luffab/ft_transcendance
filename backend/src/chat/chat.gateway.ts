import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway({ cors: '*' })
export class ChatGateway {
	@WebSocketServer()
	server;
	@SubscribeMessage('message')
	handleMessage(@MessageBody() message: string): void {
		console.log("Message: "+message);
		this.server.broadcast.emit('message', message);
	}
}
