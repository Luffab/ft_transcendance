import { UserDTO } from "src/users/dto/User.dto";

export interface IUserService {
	createUser(user: UserDTO);
	getUser();
	deleteUser();
	getUserByUsername(username: string): UserDTO | undefined;
	setTwoFactorAuthenticationSecret(secret: string, username: string);
	turnOnTwoFactorAuthentication(username: string);
}