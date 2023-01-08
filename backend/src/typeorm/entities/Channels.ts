import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('channels')
export class Channels {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	password: string;

	@Column()
	owner: string;

	@Column()
	is_dm: boolean;

	@Column()
	is_private: boolean;
}

export default Channels;