import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'usersinchan' })
export class UsersInChan {
	@PrimaryGeneratedColumn()
	id: Number;

	@Column()
	chanid: number;

	@Column()
	username: string;

	@Column()
	isowner: boolean;

	@Column()
	is_admin: boolean;
}

export default UsersInChan;