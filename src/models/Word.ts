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

@Entity('words')
class Word {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  term: string;

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
