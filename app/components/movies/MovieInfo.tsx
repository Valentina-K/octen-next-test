'use client';
import {IGenre} from "@/app/models/genre";
import {PosterPreview} from "@/app/components/ui/poster/PosterPreview";
import {IMovie} from "@/app/models/movie";
import {useEffect, useState} from "react";
import {getGenres} from "@/app/services/api";

export const MovieInfo = ({movie}: { movie: IMovie }) => {
    const [genres, setGenres] = useState<IGenre[]>([]);
    const [error, setError] = useState<boolean>(false);

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
    }, [])

    const movieGenres: IGenre[] =
        movie.genre_ids ?
            genres.filter((g: IGenre) => movie.genre_ids?.includes(g.id))
            : movie.genres ? movie.genres : [];
    if (error) return <p>Error...</p>;
    return (
        <div className="group w-2xs h-96 [perspective:1000px]">
            <div
                className="relative w-full h-full transition-transform duration-500 ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <PosterPreview movie={movie}/>
                <div
                    className="absolute inset-0 bg-gray-700 text-white p-4 rounded-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <h2 className={'text-xl'}>{movie.title}</h2>
                    <p className={'h-3/4 overflow-y-auto mb-1.5'}>{movie.overview}</p>
                    <div
                        className={'flex gap-2 flex-wrap items-center text-2xs'}>Genres: <span
                        className={'text-xs'}>{movieGenres.map((g: IGenre) => g.name).join(', ')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};