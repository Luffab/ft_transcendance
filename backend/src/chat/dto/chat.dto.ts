export class ChannelDTO {
	token: string;
	channel_name: string;
	password: string;
	is_dm: boolean;
	is_private: boolean;
}

export class UserInChanDTO {
	token: string;
	Users: [
		channel_id: number,
		username: string,
	];
}