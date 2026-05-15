import {colorClasses} from "@/app/constants/colors";
import {GenreBadge} from "@/app/components/genres/GenreBages";
import {IGenre} from "@/app/models/genre";
import {StarRating} from "@/app/components/ui/rating/StarsRating";
import {useEffect, useState} from "react";
import {IMovie} from "@/app/models/movie";
import {getGenres, getImagesByMovieId, getMovieById} from "@/app/services/api";

export const MoviesListCard = ({movieId}: { movieId: number }) => {
    const [genres, setGenres] = useState<IGenre[]>([]);
    const [error, setError] = useState<boolean>(false);
    const [movie, setMovie] = useState<IMovie>();
    const [posterPath, setPosterPath] = useState<string>("");

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const data = await getGenres();
                setGenres(data);
            } catch {
                setError(true)
            }
        }
        fetchGenres();
    }, []);

    useEffect(() => {
        const fetchMovie = async (movieId: number) => {
            try {
                const data: IMovie = await getMovieById(movieId);
                setMovie(data);
                const image = await getImagesByMovieId(movieId);
                setPosterPath(image[0].file_path);
            } catch {
                setError(true);
            }
        }
        fetchMovie(movieId);
    }, [movieId]);

    const movieGenres: IGenre[] =
        movie?.genre_ids ?
            genres.filter((g) => movie?.genre_ids?.includes(g.id))
            : movie?.genres ? movie.genres : [];

    if (error) return <div>Error...</div>;
    const rating = movie ? movie.vote_average : 0;
    return (
        <div
            style={{
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%), url(https://image.tmdb.org/t/p/w1280${posterPath})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: "0.8"
            }}
            className="w-full h-[100vh] text-white p-5 rounded-lg"
        >
            <div className={'w-[500px] mb-5'}>
                <h1 className={'text-5xl font-extrabold'}>{movie?.title}</h1>
                <h2 className={'text-3xl align-middle'}>({movie?.original_title})</h2>
            </div>
            <p>Popularity: {movie?.popularity}</p>
            <div className={'flex gap-2'}><StarRating
                rating={rating}/> {movie?.vote_average} ({movie?.vote_count})
            </div>

            <p>Release date: {movie?.release_date}</p>
            <p className={'w-1/3 h-1/2 overflow-y-auto text-2xl mt-2.5 mb-2.5'}>{movie?.overview}</p>
            <p className={'text-xl mb-3'}>Original language: <span
                className={'uppercase'}>{movie?.original_language}</span></p>
            <div className={'flex gap-2 items-center text-2xl'}>Genres: {movieGenres.map((g: IGenre, i: number) => (
                <GenreBadge key={i} color={colorClasses[i]} isChoice={false}>{g.name}</GenreBadge>))}
            </div>
        </div>
    );
};