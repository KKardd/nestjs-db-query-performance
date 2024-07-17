import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Users } from './users.entity';
import { BigJobKind } from './big-job-kind.entity';
import { MidJobKind } from './mid-job.kind.entity';
import { SmallJobKind } from './small-job-kind.entity';

@Entity('company')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column('float')
  longitude: number;

  @Column('float')
  latitude: number;

  @Column()
  scale: string;

  @Column({ name: 'big_job_kind_id' })
  bigJobKindId: number;

  @Column({ name: 'mid_job_kind_id' })
  midJobKindId: number;

  @Column({ name: 'small_job_kind_id' })
  smallJobKindId: number;

  @ManyToOne(() => BigJobKind, (bigJobKind) => bigJobKind.company)
  @JoinColumn({ name: 'big_job_kind_id' })
  bigJobKind: BigJobKind;

  @ManyToOne(() => MidJobKind, (midJobKind) => midJobKind.company)
  @JoinColumn({ name: 'mid_job_kind_id' })
  midJobKind: MidJobKind;

  @ManyToOne(() => SmallJobKind, (smallJobKind) => smallJobKind.company)
  @JoinColumn({ name: 'small_job_kind_id' })
  smallJobKind: SmallJobKind;

  @OneToMany(() => Users, (users) => users.company)
  users: Users[];
}
