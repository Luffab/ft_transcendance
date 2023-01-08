import { User } from "src/typeorm";
import Channels from "src/typeorm/entities/Channels";
import UsersInChan from "src/typeorm/entities/UserinChan";
import { MessageDto } from "./dto/message.dto";

export interface ChatProvider {
	addUserToId(userName: string, userId: string);
	getUserById(userId: string);
	createMessage(messageContent: MessageDto);
	getAllChannels(token: string);
	getAllUsers(token: string);
}