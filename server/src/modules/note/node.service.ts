import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoteEntity } from 'src/common/entities/note.entity';
import { Repository } from 'typeorm';
import { PostNoteRequestDto } from './dto/post-note-request.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NoteEntity)
    private noteRepository: Repository<NoteEntity>,
  ) {}

  async create(note: PostNoteRequestDto): Promise<NoteEntity> {
    const createdNote = this.noteRepository.create(note);
    return this.noteRepository.save(createdNote);
  }

  async findAll(): Promise<NoteEntity[]> {
    return await this.noteRepository.find();
  }

  async findOne(id: NoteEntity["id"]): Promise<NoteEntity> {
    return await this.noteRepository.findOneBy({id: id});
  }
}
