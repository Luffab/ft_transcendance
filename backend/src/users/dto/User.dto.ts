export interface UserDTO {
	 photos: string;
	 emails: string;
	 username: string;
	 password: string;
}

export class ImageDTO {
	token: string;
	image: string;
}

export class UsernameDTO {
	token: string;
	username: string;
}