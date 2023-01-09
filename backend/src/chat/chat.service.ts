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

	async getAllChannels(token: string) {
		let secret = process.env.JWT_SECRET;
		let usernametoken = jwt.decode(token, secret);
		const chanid = this.userinchan.chanid;
		const channels = await this.chanRepo.find({
			where : [
				{ channel_type: "public" },
				{ channel_type: "password" }
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
		console.log(usernametoken.username);
		return users;
	}

	createChannel(channel: ChannelDTO) {
		let jwt = require('jwt-simple');
		let secret = process.env.JWT_SECRET;
		let usernametoken = jwt.decode(channel.token, secret);
		let json = {	"name": channel.channel_name,
						"password": channel.password,
						"owner_id": usernametoken.ft_id,
						"channel_type": channel.channel_type
					};
		const chan = this.chanRepo.create(json);
		return this.chanRepo.save(chan);
	}

	//JSON TAB ITERATE

	addUserInChan(channel: UserInChanDTO) {
		let jwt = require('jwt-simple');
		let secret = process.env.JWT_SECRET;
		let usernametoken = jwt.decode(channel.token, secret);
		if (this.userinchanRepo.findOne({ where: { is_admin: true, chanid: channel.channel_id, user_id: usernametoken.ft_id }})) {
			if (channel.Users[0])
			{
			let chan = {
				"user_id": "",
				"chanid": -1,
				"username": "",
			};
			channel.Users.map((user, i) => {
				let json = {	"user_id": user.user_id,
						"chanid": channel.channel_id,
						"username": user.username
					};
					chan = this.userinchanRepo.create(json);
			});
			return this.userinchanRepo.save(chan);

			}
		}
	}

}