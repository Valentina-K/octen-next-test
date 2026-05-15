import {GenreBadge} from "@/app/components/genres/GenreBages";
import {colorClasses} from "@/app/constants/colors";
import {IGenre} from "@/app/models/genre";
import {FC, useEffect, useState} from "react";
import {getGenres} from "@/app/services/api";

type GenresProps = {
    choiceGenreId: (id: number) => void;
}
export const GenresList: FC<GenresProps> = ({choiceGenreId}) => {
    const [genreId, setGenreId] = useState<number>(0);
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
    }, []);

    const handleClick = (id: number) => {
        setGenreId(prevState => prevState === id ? 0 : id);
    }

    useEffect(() => {
        choiceGenreId(genreId);
    }, [genreId, choiceGenreId])

    if (error) return <p>Error...</p>;
    return (
        <div className={'flex gap-2 flex-wrap w-1/2 justify-center'}>
            {genres.map((genre: IGenre, ind: number) =>
                <GenreBadge key={genre.id} color={colorClasses[ind]} isChoice={genreId === genre.id}>
                    <div onClick={() => handleClick(genre.id)}>
                        {genre.name}
                    </div>
                </GenreBadge>)}
        </div>
    );
};