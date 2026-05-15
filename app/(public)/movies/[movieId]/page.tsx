import {MoviesListCard} from "@/app/components/movies/MovieListCard";

const MoviePage = async ({params}: {
    params: Promise<{ movieId: string }>
}) => {
    const {movieId} = await params;
    return <MoviesListCard movieId={Number(movieId)}/>;
}

export default MoviePage;