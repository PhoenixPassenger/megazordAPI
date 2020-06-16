import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('rhymes')
class Rhyme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  syllable: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Rhyme;
