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
import { ChannelDTO, UserInChanDTO } from './dto/chat.dto';
import { channel } from 'diagnostics_channel';

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

	async getAllChannels(token: string) {
		let secret = process.env.JWT_SECRET;
		let usernametoken = jwt.decode(token, secret);
		let user = await this.userinchanRepo.find({
			select: {chanid: true},
			where: { user_id: usernametoken.ft_id }
		})
		let reqq = JSON.parse(JSON.stringify(user));
		//console.log(reqq.UserinChan.chanid);
		console.log(user[0])
		let channels = await this.chanRepo.find({
			where : [
				{ channel_type: "public" },
				{ channel_type: "password" },
				{ channel_type: "private", id: user[0].chanid}
			]
		});
		return channels;
	}


	async getAllUsers(token: string) {
		let jwt = require('jwt-simple');
		let secret = process.env.JWT_SECRET;
		let usernametoken = jwt.decode(token, secret);
		const users = await this.userRepo.findBy({
			username: Not(usernametoken.username),
		})
		//console.log(usernametoken.username);
		return users;
	}

	async createChannel(channel: ChannelDTO) {
		let jwt = require('jwt-simple');
		let secret = process.env.JWT_SECRET;
		let usernametoken = jwt.decode(channel.token, secret);
		let json = {	"name": channel.channel_name,
						"password": channel.password,
						"owner_id": usernametoken.ft_id,
						"channel_type": channel.channel_type
					};
		const chan = await this.chanRepo.create(json);
		const chann = await this.chanRepo.save(chan);
		let adduser = {	"user_id": usernametoken.ft_id,
						"chanid": chann.id,
						"username": usernametoken.username,
						"isowner": true,
						"is_admin": true
					};
		const addusers = this.userinchanRepo.create(adduser);
		return this.userinchanRepo.save(addusers);
	}

	//JSON TAB ITERATE

	addUserInChan(channel: UserInChanDTO) {
		let jwt = require('jwt-simple');
		let secret = process.env.JWT_SECRET;
		let usernametoken = jwt.decode(channel.token, secret);
		if (this.userinchanRepo.findOne({ where: { is_admin: true, chanid: channel.channel_id, user_id: usernametoken.ft_id }})) {
			if (channel.Users[0])
			{
				channel.Users.map((user, i) => {
				let json = {	"user_id": user.user_id,
						"chanid": channel.channel_id,
						"username": user.username
					};
					const chan = this.userinchanRepo.create(json);
					return this.userinchanRepo.save(chan);
			});
			}
		}
	}
}