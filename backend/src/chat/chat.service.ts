import { Injectable } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class ChatService {
	//messageArray: Message[] = [{ name: 'Damien', text: 'prout' }]
	userById = {};

	addUserToId(userName: string, userId: string) {
		this.userById[userId] = userName;

		return Object.values(this.userById);
	}

	getUserById(userId: string) {
		return this.userById[userId];
	}

	//createMessage(createMessageDto: MessageDto) {
	//	const message = {...createMessageDto}
	//	this.messageArray.push(message);
	//	console.log("createMessage in ChatService :");
	//	console.log("message = ");
	//	console.log(message);
	//	console.log("messageDto = ");
	//	console.log(createMessageDto);
	//	console.log("name = " + message.name);
	//	console.log("text = " + message.text + "\n");
	//	return message
  	//}

	createMessage(messageContent: MessageDto) {
		console.log("createMessage in ChatService :");
		console.log("jwt = " + messageContent.jwt.split("=")[1]);
		console.log("socket = " + messageContent.socketId);
		console.log("content = " + messageContent.text);
		let jwt = require('jwt-simple');
		let secret = process.env.JWT_SECRET;
		let token = jwt.decode(messageContent.jwt.split("=")[1], secret);
		messageContent.username = token;
		console.log("username = " + messageContent.username + "\n");
		return messageContent;
  	}

	//getAllMessages() {
	//	return this.messageArray;
	//}

}
