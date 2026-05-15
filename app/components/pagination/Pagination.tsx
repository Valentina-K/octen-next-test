import {FC} from "react";

type PaginationProps = {
    current: number;
    totalPage: number;
    onChange: (page: number) => void;
};

export const MyPagination: FC<PaginationProps> = ({current, totalPage, onChange}) => {
    const pages = Array.from({length: totalPage}, (_, i) => i + 1);

    const renderPages = () => {
        const first = pages.slice(0, 3);
        const last = pages.slice(-3);


        const start = Math.max(current - 1, 4);
        const end = Math.min(current + 1, totalPage - 3);
        const middle = pages.slice(start - 1, end);

        const result: (number | string)[] = [];

        result.push(...first);

        if (start > 4) result.push("...");

        result.push(...middle);

        if (end < totalPage - 3) result.push("...");

        result.push(...last);

        return result;
    };

    return (
        <div className="flex items-center space-x-2 mt-4 mb-4">
            <button
                disabled={current === 1}
                onClick={() => onChange(1)}
                className="px-3 py-1 rounded disabled:opacity-50 uppercase text-purple-800"
            >
                {"<<"}
            </button>
            <button
                disabled={current === 1}
                onClick={() => onChange(current - 1)}
                className="px-3 py-1 disabled:opacity-50 uppercase text-purple-800"
            >
                {"< previous"}
            </button>

            {renderPages().map((page, idx) =>
                    page === "..." ? (
                        <span key={`dots-${idx}`} className="text-purple-800 font-bold">
            ...
          </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => onChange(page as number)}
                            className={`px-3 py-1 border-purple-500 border rounded-full ${
                                page === current ? "bg-purple-500 text-white" : ""
                            }`}
                        >
                            {page}
                        </button>
                    )
            )}

            <button
                disabled={current === totalPage}
                onClick={() => onChange(current + 1)}
                className="px-3 py-1 rounded disabled:opacity-50 uppercase text-purple-800"
            >
                {"next >"}
            </button>

            <button
                disabled={current === totalPage}
                onClick={() => onChange(totalPage)}
                className="px-3 py-1 rounded disabled:opacity-50 uppercase text-purple-800"
            >
                {">>"}
            </button>
        </div>
    );
};