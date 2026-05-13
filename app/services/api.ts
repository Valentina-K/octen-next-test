import type {IGenre} from "../models/genre.ts";
import type {IMovie} from "../models/movie.ts";
import type {IImage} from "../models/image.ts";
import type {IResponse} from "../models/response.ts";

const base_url = "https://api.themoviedb.org/3";
const config = {
    method: 'GET',
    headers: {
        "accept": "application/json",
        "Authorization": `Bearer ${process.env.DB_TOKEN}`,
    }
}

export const getGenres = async (): Promise<IGenre[]> => {
    const response = await fetch(`${base_url}/genre/movie/list`, config);
    const data = await response.json();
    return data.genres as IGenre[];
}

export const GetMovieByGenres = async ({genres}: {genres: string}): Promise<IMovie[]> => {
    const response = await fetch(`${base_url}/discover/movie?with_genres=${genres}`, config);
    const data = await response.json();
    return data.results as IMovie[];
}

export const getMoviesByGenreAndFilter = async (
    genreId: string,
    filter: string,
    page: number,
) => {
    let url: string;
    if (genreId) url = `${base_url}/discover/movie?with_genres=${genreId}&sort_by=${filter}.desc&page=${page}`;
    else url = `${base_url}/movie/${filter}?page=${page}`;
    const response = await fetch(url, config);
    const data = await response.json();
    return data as IResponse;
};

//now_playing, popular, top_rated, upcoming, latest
export const getMoviesByFilter = async ({filter="", page=1}: {filter: string, page: number}): Promise<IResponse> => {
    const response: Response = await fetch(`${base_url}/movie/${filter}?page=${page}`, config);
    const data = await response.json();
    return data as IResponse;
}

export const getMovieBySearch = async (query: string): Promise<IMovie[]> => {
    const response = await fetch(`${base_url}/search/movie?query=${query}`,config);
    const data = await response.json();
    return data.results as IMovie[];
}

export const getMovieById = async (movieId: number): Promise<IMovie> => {
    const response = await fetch(`${base_url}/movie/${movieId}`, config);
    return await response.json() as IMovie;
}

export const getImagesByMovieId = async (movieId: number): Promise<IImage[]> => {
    const response = await fetch(`${base_url}/movie/${movieId}/images`, config);
    const data = await response.json();
    return data.posters as IImage[];
}