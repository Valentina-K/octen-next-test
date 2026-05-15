import {useState} from "react";
import {movieFilters} from "@/app/constants/filter";

export const Filters = ({ onSelect, selectedFilter }: { onSelect: (filter: string) => void, selectedFilter: string }) => {
    const [selected, setSelected] = useState<string>(selectedFilter);

    return (
        <div className="flex gap-2 mb-6">
            {Object.entries(movieFilters).map(([key, { title }]) => (
                <button
                    key={key}
                    onClick={() => {
                        setSelected(key);
                        onSelect(key);
                    }}
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