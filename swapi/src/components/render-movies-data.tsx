import { TFilmResult } from "../types/types";

interface RenderMoviesDataProps {
  movie: TFilmResult;
}

export const RenderMoviesData: React.FC<RenderMoviesDataProps> = ({
  movie,
}) => {
  return (
    <div>
      <h3>{`Title: ${movie.title}`}</h3>
      <h4>{`Release Date: ${movie.releaseDate}`}</h4>
      <h5>
        Opening Crawl: {movie.openingCrawl}
      </h5>
    </div>
  );
};
