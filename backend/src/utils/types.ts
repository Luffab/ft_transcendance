import { User } from 'src/typeorm';

export type UserDetails = {
	username: string;
	ft_id: string;
	avatar: string;
	accessToken: string;
	refreshToken: string;
	photos: string;
	emails: any;
}

export type Done = (err: Error, user: User) => void