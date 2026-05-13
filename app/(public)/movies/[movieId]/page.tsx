const MoviePage = async ({
                       params,
                   }: {
    params: Promise<{ movieId: string }>
}) => {
    const { movieId } = await params
    return <>MoviePage {movieId}</>;
}

export default MoviePage;