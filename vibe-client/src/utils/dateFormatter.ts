export const formatDateYM = (dateString: string) => {
    const date = new Date(dateString);
    return date
        .toLocaleString("da-DK", {
            month: "short",
            year: "numeric",
        })
        .replace(".", "");
};

export const formatDateYMD = (dateString: string) => {
    const date = new Date(dateString);
    return date
        .toLocaleString("da-DK", {
            day: "numeric",
            month: "short",
            year: "numeric",
        })
};

