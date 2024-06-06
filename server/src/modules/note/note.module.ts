import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteEntity } from 'src/common/entities/note.entity';
import { NotesController } from './note.controller';
import { NotesService } from './node.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([NoteEntity]),
    UsersModule,
  ],
  controllers: [NotesController],
  providers: [NotesService]
})
export class NoteModule {}
