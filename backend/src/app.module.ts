import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { entities } from './typeorm';
import { UsersModule } from './users/users.module';
import { FortytwoModule } from './fortytwo/fortytwo.module';

@Module({
  imports: [
	  		TypeOrmModule.forRoot({
				  type: 'postgres',
				  host: 'db',
				  port: 5432,
				  username: 'postgres',
				  password: 'postgres',
				  database: '',
				  entities,
				  synchronize: true,
			  }),
	  		ConfigModule.forRoot({ envFilePath: '.env.development' }),
	  		AuthModule, 
			UsersModule,
			PassportModule.register({ session: true }),
			FortytwoModule,
		],
  controllers: [],
  providers: [],
})
export class AppModule {}
