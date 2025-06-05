export interface Entry {
    entryId?: number
    title: string
    start_period: string
    end_period: string | null
    playlist_link: string | null
    cover_image: string
    description: string | null
}