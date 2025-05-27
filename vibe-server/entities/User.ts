import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column, OneToMany } from "typeorm";
import { Entry } from "./Entry";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column({ unique: true })
  password: string;

  // Will set timestamp when row is inserted
  @CreateDateColumn({ type: "timestamptz", default: () => "NOW()" })
  created_at: Date;

  // Will set timestamp when row is updated (each time you call .save)
  @UpdateDateColumn({ type: "timestamptz", nullable: true })
  updated_at: Date;

  // Will set timestamp when row is soft deleted (each time you call .softRemove())
  @DeleteDateColumn({ type: "timestamptz", nullable: true })
  deleted_at: Date;

  // One user has many entries
  @OneToMany(() => Entry, (entry) => entry.user)
  entries: Entry[];
}
