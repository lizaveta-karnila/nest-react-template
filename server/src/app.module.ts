import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteModule } from './modules/note/note.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { dataSourceOptions } from './config/data-source';

// migrations removed to not run migration files when start app
const {migrations, ...dataSourceOptionsWithoutMigrations} = dataSourceOptions;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true
    }),

    TypeOrmModule.forRoot({...dataSourceOptionsWithoutMigrations}),

    NoteModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
