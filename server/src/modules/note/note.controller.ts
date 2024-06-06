import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NotesService } from './node.service';
import { PostNoteRequestDto } from './dto/post-note-request.dto';
import { NoteEntity } from 'src/common/entities/note.entity';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post()
  async create(@Body() postNoteRequestDto: PostNoteRequestDto):  Promise<NoteEntity> {
    return this.notesService.create(postNoteRequestDto);
  }

  @Get()
  async findAll(): Promise<NoteEntity[]> {
    return this.notesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: NoteEntity["id"]): Promise<NoteEntity> {
    return this.notesService.findOne(id);
  }
}
