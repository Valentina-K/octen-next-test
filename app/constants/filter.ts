export const movieFilters: Record<string, { title: string; apiParam: string }> = {
    popular: { title: "Popular", apiParam: "popular" },
    now_playing: { title: "Now Playing", apiParam: "now_playing" },
    top: { title: "Top Rated", apiParam: "top_rated" },
    upcoming: { title: "Upcoming", apiParam: "upcoming" }
};