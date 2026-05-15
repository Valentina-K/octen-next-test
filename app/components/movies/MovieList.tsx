'use server';
import {MyPagination} from "@/app/components/pagination/Pagination";
import {MovieInfo} from "@/app/components/movies/MovieInfo";
import {IMovie} from "@/app/models/movie";
import {FC} from "react";
import {IResponse} from "@/app/models/response";
import {getMoviesByGenreAndFilter} from "@/app/services/api";
import Link from "next/link";

type MovieListProps = {
    filter: string;
    genreId?: string;
    page: number;
}
export const MovieList: FC<MovieListProps> = async ({filter, genreId = "", page}) => {
    const response: IResponse = await getMoviesByGenreAndFilter(genreId, filter, page);
    const maxPages: number = Math.min(response?.total_pages || 1, 500);
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
            />
        </section>
    );
};