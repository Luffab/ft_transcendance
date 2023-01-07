import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User{
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'ft_id', unique: true })
	ft_id: string;

	@Column()
	username: string;

	@Column({ name: 'access_token' })
	accessToken: string;

	@Column({ name: 'refresh_token' })
	refreshToken: string;

	@Column({ name: 'emails', nullable: true })
	emails: string;

	@Column({ nullable: true })
	verify_code: string;

	@Column({ default: false})
	is2fa: boolean;

}