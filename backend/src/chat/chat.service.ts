import { Injectable } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class ChatService {
	//messageArray: Message[] = [{ name: 'Damien', text: 'prout' }]
	//socketByUsername = {username: };
	//socketByUsername = {
	//	username: "",
	//	socketIds: [],
	//};

	addSocketsToUsername(socketByUsername, username: string, newSocketId: string) {
		if (!(socketByUsername.socketIds.includes(newSocketId))) {
			console.log("test 0");
			//if (this.socketByUsername && this.socketByUsername[username])
			//{
			//	console.log("test 1");
			//	console.log("sockets array 1 = ");
			//	console.log(this.socketByUsername[username]);
			//	this.socketByUsername[username].socketIds = [...this.socketByUsername.socketIds, newSocketId];
			//}
			//else
			//{
			//
			//	console.log("sockets array 2 = ");
			//	console.log(this.socketByUsername[username]);
			//	this.socketByUsername[username] = ["prout", "caca"];
			//	this.socketByUsername["gmadec"] = ["pipi", "zezette"];
			//	console.log(this.socketByUsername[username]);
			//	console.log(this.socketByUsername["gmadec"]);
			//	console.log("test 2");
			//	console.log(this.socketByUsername[username].username);
			//	console.log("test 3");
			//	this.socketByUsername[username].username = username;
			//	this.socketByUsername[username].socketIds = [newSocketId];
			//}
			let tab = socketByUsername.socketIds;
			socketByUsername[username] = [...tab, newSocketId];
		}
		console.log("sockets[dpuccion] = ");
		console.log(socketByUsername[username]);
		//let tab = ["afvd5468h5a8f45h1j", "9k25r8f45f25htj4"];
		//this.socketByUsername["gmadec"] = tab;
		//console.log("sockets[gmadec] = ");
		//console.log(this.socketByUsername["gmadec"]);
		//this.socketByUsername["gmadec"] = [...tab, "sg96kyt1sf1rtj1r5878"];
		//console.log("sockets[gmadec] = ");
		//console.log(this.socketByUsername["gmadec"]);
		return socketByUsername;
	}

	//getSocketsByUsername(username: string) {
	//	return socketByUsername[username];
	//}

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
		let test = messageContent.jwt.split("=")[1]
		//console.log("jwt = " + test);
		console.log("socket = " + messageContent.socketId);
		//console.log("content = " + messageContent.text);
		let jwt = require('jwt-simple');
		let secret = process.env.JWT_SECRET;
		let token = jwt.decode(test, secret);
		messageContent.username = token.username;
		console.log("username = " + messageContent.username + "\n");
		return messageContent;
  	}

	//getAllMessages() {
	//	return this.messageArray;
	//}

}
