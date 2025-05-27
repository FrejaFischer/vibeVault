import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Entry } from "./Entry";
import { Track } from "./Track";

@Entity("entry_track")
export class EntryTrack {
  @PrimaryColumn()
  entry_id: number;
  @PrimaryColumn()
  track_id: number;

  @ManyToOne(() => Entry, (entry) => entry.entryTracks, { onDelete: "CASCADE" })
  @JoinColumn({ name: "entry_id" })
  entry: Entry;

  @ManyToOne(() => Track, (track) => track.entryTracks, { onDelete: "CASCADE" })
  @JoinColumn({ name: "track_id" })
  track: Track;
}
