export class ChannelDTO {
	token: string;
	channel_name: string;
	channel_type: string;
	password: string;
}

export class UserInChanDTO {
	token: string;
	channel_id: number;
	Users: [{
		username: string,
		user_id: string,
	}
	];
}