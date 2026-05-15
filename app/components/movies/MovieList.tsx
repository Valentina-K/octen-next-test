import {MyPagination} from "@/app/components/pagination/Pagination";
import {MovieInfo} from "@/app/components/movies/MovieInfo";
import {IMovie} from "@/app/models/movie";
import {FC, useEffect, useState} from "react";
import {IResponse} from "@/app/models/response";
import {getMoviesByGenreAndFilter} from "@/app/services/api";
import Link from "next/link";

type MovieListProps = {
    filter: string;
    genreId?: string;
}
export const MovieList: FC<MovieListProps> = ({filter, genreId = ""}) => {
    const [page, setPage] = useState<number>(1);
    const [response, setResponse] = useState<IResponse>();
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const result = await getMoviesByGenreAndFilter(genreId, filter, page);
                setResponse(result);
            } catch {
                setError(true);
            }
        }
        fetchMovies();
    }, [filter, genreId, page]);

    if (error) return <p>Error...</p>;
    const maxPages = Math.min(response?.total_pages || 1, 500);
    return (
        <section className={'flex justify-center flex-col items-center'}>
            <div className={'flex flex-wrap gap-5 justify-center'}>
                {response?.results.slice(0, 60).map((movie: IMovie) =>
                    <Link href={`/movies/:${movie.id}`} key={movie.id}>
                        <MovieInfo movie={movie}/>
                    </Link>)}
            </div>

            <MyPagination
                current={page}
                totalPage={maxPages}
                onChange={setPage}
            />
        </section>
    );
};