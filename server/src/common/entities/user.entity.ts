import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { NoteEntity } from "./note.entity";

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    select: false,
  })
  password: string;

  @OneToMany(
    () => NoteEntity,
    (note) => note.user,
  )
  notes: NoteEntity[];
}
