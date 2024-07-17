import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Company } from './company.entity';
import { MidJobKind } from './mid-job.kind.entity';

@Entity('big_job_kind')
export class BigJobKind {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Company, (company) => company.bigJobKind)
  company: Company[];

  @OneToMany(() => MidJobKind, (midJobKind) => midJobKind.bigJobKind)
  midJobKind: MidJobKind[];
}
