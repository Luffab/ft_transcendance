import { Injectable } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { MessageDto } from './dto/message.dto';
import { UsersInChan } from 'src/typeorm/entities/UserinChan';
import Channels from 'src/typeorm/entities/Channels';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from 'src/typeorm';
import { ChatProvider } from './chat';
import { use } from 'passport';
import { ChannelDTO } from './dto/chat.dto';

let jwt = require('jwt-simple');

@Injectable()
export class ChatService implements ChatProvider{
	constructor(
		@InjectRepository(Channels) private readonly chanRepo: Repository<Channels>,
		@InjectRepository(UsersInChan) private readonly userinchanRepo: Repository<UsersInChan>,
		@InjectRepository(User) private readonly userRepo: Repository<User>,
		private userinchan: UsersInChan,
	) {}
	//messageArray: Message[] = [{ name: 'Damien', text: 'prout' }]
	//socketByUsername = {username: };
	socketByUsername = {
		username: "",
		socketIds: [],
	};

	addSocketsToUsername(username: string, newSocketId: string) {
		console.log("addSocketsToUsername in ChatService :");
		console.log("newSocketId = " + newSocketId);
		let tab = this.socketByUsername[username];
		if (!tab || ((tab.includes(newSocketId)) === false)) {
			console.log("sockets[" + username + "] before fragmentation =");
			console.log(tab);
			if (!tab)
				this.socketByUsername[username] = [newSocketId];
			else
				this.socketByUsername[username] = [...tab, newSocketId];
			console.log("sockets[" + username + "] after fragmentation =");
			console.log(this.socketByUsername[username]);
		}
		console.log("final sockets[" + username + "] =");
		console.log(this.socketByUsername[username] + "\n");
		//return this.socketByUsername;
	}

	getSocketsByUsername(username: string) {
		console.log("getSocketsByUsername in ChatService :")
		console.log("sockets[" + username + "] =")
		console.log(this.socketByUsername[username])
		return this.socketByUsername[username];
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
		let test = messageContent.jwt.split("=")[1]
		console.log("socket = " + messageContent.socketId);
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

	getAllChannels(token: string) {
		let secret = process.env.JWT_SECRET;
		let usernametoken = jwt.decode(token, secret);
		const chanid = this.userinchan.chanid;
		if (this.userinchanRepo.findOne({ where: { username: usernametoken }})) {
			const chan = (this.chanRepo.findBy({ id: chanid }))
			//console.log(chan)
			return (chan);
		}
	}

	async getAllUsers(token: string) {
		let jwt = require('jwt-simple');
		let secret = process.env.JWT_SECRET;
		let usernametoken = jwt.decode(token, secret);
		//let tokenn = JSON.parse(usernametoken);
		const users = await this.userRepo.findBy({
			username: Not(usernametoken.username),
		})
		//console.log(usernametoken.username);
		return users;
	}

	createChannel(channel: ChannelDTO) {
		let jwt = require('jwt-simple');
		let secret = process.env.JWT_SECRET;
		let usernametoken = jwt.decode(channel.token, secret);
		let json = {	"name": channel.channel_name,
						"password": channel.password,
						"owner": usernametoken.username,
						"is_dm": channel.is_dm,
						"is_private": channel.is_private
					};
		//console.log(channel.channel_name)
		//const chann = this.chanRepo
		//			.createQueryBuilder()
		//			.update(Channels)
		//			.set({name: channel.channel_name, password: channel.password, owner: usernametoken.username, is_dm: channel.is_dm, is_private: channel.is_private})
		//			.execute()
		const chan = this.chanRepo.create(json);
		return this.chanRepo.save(chan);
	}

}
