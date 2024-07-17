import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Company } from './company.entity';
import { MidJobKind } from './mid-job.kind.entity';

@Entity('small_job_kind')
export class SmallJobKind {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'mid_job_kind_id' })
  midJobKindId: number;

  @Column()
  name: string;

  @ManyToOne(() => MidJobKind, (midJobKind) => midJobKind.smallJobKind)
  @JoinColumn({ name: 'mid_job_kind_id' })
  midJobKind: MidJobKind;

  @OneToMany(() => Company, (company) => company.smallJobKind)
  company: Company[];
}
