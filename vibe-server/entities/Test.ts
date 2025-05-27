import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// THIS A TEST ENTITY

@Entity("test")
export class Test {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  role: string;
}
