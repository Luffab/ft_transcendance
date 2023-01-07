import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { entities } from './typeorm';
import { UsersModule } from './users/users.module';
import { FortytwoModule } from './fortytwo/fortytwo.module';
<<<<<<< HEAD
import { MailModule } from './mail/mail.module';
=======
import { ChatGateway } from './chat/chat.gateway';
>>>>>>> 07d5422aaeba0f64a8aa166adb1e0f8b2be098b3

@Module({
  imports: [
			ConfigModule.forRoot({ envFilePath: 'back.env'}),
	  		TypeOrmModule.forRoot({
				  type: 'postgres',
				  host: process.env.DB_HOST,
				  port: Number.parseInt(process.env.DB_PORT),
				  username: process.env.DB_USERNAME,
				  password: process.env.DB_PASSWORD,
				  database: process.env.DB_DATABASE,
				  entities,
				  synchronize: true,
			  }),
	  		AuthModule, 
			UsersModule,
			PassportModule.register({ session: true }),
			FortytwoModule,
			MailModule,
		],
  controllers: [],
  providers: [ChatGateway],
})
export class AppModule {}
