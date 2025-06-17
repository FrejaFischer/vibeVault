import { Album } from "./album"

export interface Track {
    track_id: number
    name: string
    album: Album | undefined
}