import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Rhyme from './Rhyme';

@Entity('users')
class Word {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  word: string;

  @Column()
  image: string;

  @Column()
  rhyme_id: string;

  @ManyToOne(() => Rhyme)
  @JoinColumn({ name: 'rhyme_id' })
  rhyme: Rhyme;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Word;
