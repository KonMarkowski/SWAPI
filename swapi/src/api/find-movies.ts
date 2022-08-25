import { TFilm, TFilmResult, TPerson } from "../types/types";

export const findMoviesByPerson = async (entity: TPerson) => {
    return await Promise.all(entity.films.map(async film => await fetch(film, { method: 'GET' })
        .then(async filmRaw => await filmRaw.json())
        .then(async (filmData: TFilm) => await {
            title: filmData.title,
            releaseDate: filmData.release_date,
            openingCrawl: filmData.opening_crawl.substring(0, 129) + '...',
        }
        ))
    ).then((data: TFilmResult[]) => data)
    
}
