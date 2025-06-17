export function validateTitle(title: string): string[] {

    const errors: string[] = [];
    const MAX_TITLE_LENGTH = 120;
    const MIN_TITLE_LENGTH = 1;
    if (typeof title !== "string" || !title.trim()) {
        errors.push("Title is required and must be a string");
    } else if (title.length > MAX_TITLE_LENGTH) {
        errors.push("Title can be max " + MAX_TITLE_LENGTH + " characters");
    } else if (title.length < MIN_TITLE_LENGTH) {
        errors.push("Title must be at least " + MIN_TITLE_LENGTH + " characters");
    }

    return errors;
}

export function validateDescription(description: string): string[] {
    const errors: string[] = [];
    const MAX_DESCRIPTION_LENGTH = 600;
    const MIN_DESCRIPTION_LENGTH = 10;

    if (description.length > MAX_DESCRIPTION_LENGTH) {
        errors.push("Description can be max " + MAX_DESCRIPTION_LENGTH + " characters");
    } else if (description.length < MIN_DESCRIPTION_LENGTH && description.length !== 0) {
        errors.push("Description must be at least " + MIN_DESCRIPTION_LENGTH + " characters or empty");
    }

    return errors;
}

export function validateStartPeriod(start_period: string): string[] {
    const errors: string[] = [];
    const dateRegex = /^\d{4}-\d{2}-\d{2}/; // YYYY-MM-DD format

    if (!start_period) {
        errors.push("Start period is required");
    } else if (!dateRegex.test(start_period)) {
        errors.push("Start period must be a valid date");
    }

    return errors;
}

export function validateEndPeriod(end_period: string): string[] {
    const errors: string[] = [];
    const dateRegex = /^\d{4}-\d{2}-\d{2}/; // YYYY-MM-DD format

    if (end_period) {
        if (!dateRegex.test(end_period) && end_period.length !== 0) {
            errors.push("End period must be a valid date");
        }
    }
    return errors;
}

export function validateCoverImage(cover_image: string): string[] {
    const errors: string[] = [];

    if (!cover_image) {
        errors.push("Cover image is required");
    } else if (typeof cover_image !== "string") {
        errors.push("Cover image must be a string");
    }

    return errors;
}

export function validatePlaylistLink(playlist_link: string): string[] {
    const errors: string[] = [];
    const spotifyRegex = /https?:\/\/open\.spotify\.com\/playlist\/[a-zA-Z0-9]+/;
    const appleMusicRegex = /https?:\/\/music\.apple\.com\/[a-z]{2}\/playlist\/[^/]+\/pl\.[a-zA-Z0-9]+/;
    const youtubeRegex = /https?:\/\/(www\.)?youtube\.com\/playlist\?list=[a-zA-Z0-9_-]+/;

    if (playlist_link.trim()) {
        if (!spotifyRegex.test(playlist_link) && !appleMusicRegex.test(playlist_link) && !youtubeRegex.test(playlist_link)) {
            errors.push("Link must be from Spotify, Apple Music or Youtube")
        }
    }

    return errors;
}