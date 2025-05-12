import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("test")
export class Test {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  role: string;
}
