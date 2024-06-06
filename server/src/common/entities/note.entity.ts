import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class NoteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(
    () => UserEntity,
    (user) => user.notes,
  )
  @JoinColumn({
    name: 'user_id',
  })
  user: UserEntity;
}
