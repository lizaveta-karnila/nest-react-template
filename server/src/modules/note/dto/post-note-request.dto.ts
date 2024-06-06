import { IsString } from "class-validator";

export class PostNoteRequestDto {
  @IsString()
  text: string;
}
