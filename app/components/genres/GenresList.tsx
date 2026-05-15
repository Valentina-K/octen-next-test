'use client';
import {GenreBadge} from "@/app/components/genres/GenreBages";
import {colorClasses} from "@/app/constants/colors";
import {IGenre} from "@/app/models/genre";
import {FC, useEffect, useState} from "react";
import {getGenres} from "@/app/services/api";
import {useRouter, useSearchParams} from "next/navigation";

export const GenresList: FC = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
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
        const params = new URLSearchParams(searchParams.toString());
        const genreId: number = Number(params.get("genre")) || 0;
        if(genreId === id) params.set("genre", "");
        else params.set("genre", id.toString());
        router.push(`?${params}`);
    }

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