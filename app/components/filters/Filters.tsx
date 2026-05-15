'use client';
import {useState} from "react";
import {movieFilters} from "@/app/constants/filter";
import {useRouter, useSearchParams} from "next/navigation";

export const Filters = ({ selectedFilter }: { selectedFilter: string }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [selected, setSelected] = useState<string>(selectedFilter);
    const onSelectFilter = (filter: string) => {
        setSelected(filter);
        const params = new URLSearchParams(searchParams.toString());
        params.set("filter", filter);
        router.push(`?${params.toString()}`);
    }

    return (
        <div className="flex gap-2 mb-6">
            {Object.entries(movieFilters).map(([key, { title }]) => (
                <button
                    key={key}
                    onClick={() => onSelectFilter(key)}
                    className={`px-4 py-2 rounded-2xl transition 
            ${selected === key
                        ? "bg-purple-900 text-white shadow-inner"
                        : "bg-gray-200 text-black hover:bg-gray-300"}`}
                >
                    {title}
                </button>
            ))}
        </div>
    );
};