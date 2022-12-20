import { User } from "src/typeorm";
import { UserDetails } from "src/utils/types";

export interface AuthenticationProvider {
	validateUser(details: UserDetails);
	createUser(details: UserDetails);
	findUser(ft_id: string): Promise<User | undefined>;
}