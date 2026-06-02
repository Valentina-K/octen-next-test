'use client';
import {IMovie} from "@/app/models/movie";
import {useEffect, useState} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";

export const Slider = ({movies}: { movies: IMovie[] }) => {
    const [angle, setAngle] = useState(0);
    const router = useRouter();
    useEffect(() => {
        const interval = setInterval(() => {
            setAngle((prev) => prev + 360 / movies.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [movies.length]);

    return (
        <div className="relative w-3/4 h-[660px] mx-auto ">
            {movies.map((movie, i) => {
                const step = (360 / movies.length) * i;
                return (
                    <div
                        key={movie.id}
                        className={`absolute top-1/2 left-1/2 w-44 h-64 rounded-2xl transition-transform duration-500`}
                        style={{
                            transform: `
                rotate(${step + angle}deg) 
                translate(20rem) 
                rotate(-${step + angle}deg)
              `,
                        }}
                    >
                        <div onClick={()=> {
                            if((step + angle) % 360 === 0) router.push(`./movies/${movie.id}`)
                        }} >
                            <Image
                                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                alt={movie.title}
                                fill={true}
                                className={`w-full h-full rounded ${
                                    (step + angle) % 360 === 0
                                        ? "grayscale-0 opacity-100 cursor-pointer"
                                        : "grayscale opacity-50"
                                }`}
                            /></div>
                    </div>
                );
            })}
        </div>
    );
};