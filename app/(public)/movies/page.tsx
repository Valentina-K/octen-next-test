import {MovieList} from "@/app/components/movies/MovieList";
import {Filters} from "@/app/components/filters/Filters";
import {GenresList} from "@/app/components/genres/GenresList";
import {movieFilters} from "@/app/constants/filter";

const MoviesPage = async ({searchParams}: {
    searchParams: Promise<{ filter?: string, genre?: string, page: string }>
}) => {
    const {filter, genre, page} = await searchParams;
    const movieFilter = filter ? filter : 'popular';

    return (
        <div className={'flex justify-center flex-col items-center gap-10'}>
            <h1 className={'text-4xl font-bold'}>{movieFilters[movieFilter].title}</h1>
            <Filters selectedFilter={movieFilter} />
            <GenresList />
            <MovieList filter={movieFilters[movieFilter].apiParam} genreId={genre ? genre : ""} page={page ? Number(page) : 1}/>
        </div>
    );
}

export default MoviesPage;