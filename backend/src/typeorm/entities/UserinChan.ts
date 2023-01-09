import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'usersinchan' })
export class UsersInChan {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	user_id: string;

	@Column()
	chanid: number;

	@Column()
	username: string;

	@Column({ default: false})
	isowner: boolean;

	@Column({ default: false})
	is_admin: boolean;
}

export default UsersInChan;