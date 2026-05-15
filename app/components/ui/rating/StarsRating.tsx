import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface StarRatingProps {
    rating: number;
    max?: number;
}

export const StarRating = ({ rating, max = 5 }: StarRatingProps) => {
    const normalized = (rating / 10) * max;
    const fullStars = Math.floor(normalized);
    const hasHalfStar = normalized % 1 >= 0.5;

    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: max }).map((_, i) => {
                if (i < fullStars) {
                    return <FaStar key={i} className="text-yellow-500" />;
                }
                if (i === fullStars && hasHalfStar) {
                    return <FaStarHalfAlt key={i} className="text-yellow-500" />;
                }
                return <FaRegStar key={i} className="text-yellow-500" />;
            })}
        </div>
    );
};