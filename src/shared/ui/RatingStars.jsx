import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

/** Five-star rating supporting halves, e.g. 3.5. */
export default function RatingStars({ value, max = 5 }) {
  return (
    <span className="rating-stars" role="img" aria-label={`${value} out of ${max}`}>
      {Array.from({ length: max }, (_, i) => {
        const fill = value - i;
        if (fill >= 1) return <FaStar key={i} aria-hidden="true" />;
        if (fill >= 0.5) return <FaStarHalfAlt key={i} aria-hidden="true" />;
        return <FaRegStar key={i} aria-hidden="true" />;
      })}
    </span>
  );
}
