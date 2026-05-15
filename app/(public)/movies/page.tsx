import {MovieList} from "@/app/components/movies/MovieList";
import {Filters} from "@/app/components/filters/Filters";
import {GenresList} from "@/app/components/genres/GenresList";
import {movieFilters} from "@/app/constants/filter";
import {useSearchParams} from "next/navigation";

const MoviesPage = () => {
    const searchParams = useSearchParams();
    const filter = searchParams.get("filter") || "";
    const genre = searchParams.get("genre") || "";
    const page = Number(searchParams.get("page") || 1);
    //const [filter, setFilter] = useState<string>('popular');
    //const [genreId, setGenreId] = useState<string>("");
    return (
        <div className={'flex justify-center flex-col items-center gap-10'}>
            <h1 className={'text-4xl font-bold'}>{movieFilters[filter].title}</h1>
            <Filters selectedFilter={filter} />
            <GenresList choiceGenreId={(id)=>setGenreId(id!==0 ? id.toString() : "")}/>
            <MovieList filter={movieFilters[filter].apiParam} genreId={genre} page={page}/>
        </div>
    );
}

export default MoviesPage;