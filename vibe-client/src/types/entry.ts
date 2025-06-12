import { Track } from "./track"
export interface Entry {
    entry_id?: number
    title: string
    start_period: string
    end_period: string | null
    playlist_link: string | null
    cover_image: string
    description: string | null
    trackcount: number
    tracks: Track[]
}