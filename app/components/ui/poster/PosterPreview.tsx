import {IMovie} from "@/app/models/movie";
import Image from "next/image";

export const PosterPreview = ({movie}: { movie: IMovie }) => {
    return (
        <div className="absolute inset-0 [backface-visibility:hidden]">
            <Image
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className={`w-full h-full object-cover rounded-xl shadow-lg`}
                fill={true}
            />
        </div>
    );
};