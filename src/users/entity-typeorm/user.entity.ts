import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @Column({ comment: '이름' })
  name: string;

  @Column({ comment: '성별' })
  gender: boolean;

  // @OneToMany(() => company, (company) => company.user)
  // orderDetail: Company[];
}
