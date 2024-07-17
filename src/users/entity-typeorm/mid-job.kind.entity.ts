import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Company } from './company.entity';
import { BigJobKind } from './big-job-kind.entity';
import { SmallJobKind } from './small-job-kind.entity';

@Entity('mid_job_kind')
export class MidJobKind {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'big_job_kind_id' })
  bigJobKindId: number;

  @Column()
  name: string;

  @ManyToOne(() => BigJobKind, (bigJobKind) => bigJobKind.midJobKind)
  @JoinColumn({ name: 'big_job_kind_id' })
  bigJobKind: BigJobKind;

  @OneToMany(() => Company, (company) => company.midJobKind)
  company: Company[];

  @OneToMany(() => SmallJobKind, (smallJobKind) => smallJobKind.midJobKind)
  smallJobKind: SmallJobKind[];
}
