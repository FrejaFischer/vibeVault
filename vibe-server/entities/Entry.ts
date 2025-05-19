import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity("entry")
export class Entry {
  @PrimaryGeneratedColumn()
  entry_id: number;

  @Column()
  user_id: number;

  @Column()
  title: string;

  @Column({ type: "timestamp" })
  start_period: Date;

  @Column({ type: "timestamp", nullable: true })
  end_period: Date;

  @Column({ nullable: true })
  playlist_link: string;

  @Column()
  cover_image: string;

  @Column()
  description: string;

  // Will set timestamp when row is inserted
  @CreateDateColumn({ type: "timestamptz", default: () => "NOW()" })
  created_at: Date;

  // Will set timestamp when row is updated (each time you call .save)
  @UpdateDateColumn({ type: "timestamptz", nullable: true })
  updated_at: Date;

  // Will set timestamp when row is soft deleted (each time you call .softRemove())
  @DeleteDateColumn({ type: "timestamptz", nullable: true })
  deleted_at: Date;

  // Many entries belong to one user
  @ManyToOne(() => User, (user) => user.entries)
  @JoinColumn({ name: "user_id" }) // links this column to user's PK in the user table
  user: User;
}
