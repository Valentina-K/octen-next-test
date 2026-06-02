import {movieFilters} from "@/app/constants/filter";
import {getMoviesByGenreAndFilter} from "@/app/services/api";
import {Slider} from "@/app/components/slider/Slider";
import {Filters} from "@/app/components/filters/Filters";

const Home = async ({searchParams}: { searchParams: { filter?: string } }) => {
    const filter = searchParams?.filter || "popular";
    const movies = await getMoviesByGenreAndFilter("", movieFilters[filter].apiParam, 1);
    return (
        <div className={'flex justify-center flex-col items-center'}>
            <h1 className={'text-4xl font-bold mb-10'}>Discover Unlimited Content</h1>
            <Filters selectedFilter={filter}/>
            {movies && <Slider movies={movies.results.slice(0, 10)}/>}
        </div>
    );
}

export default Home;
