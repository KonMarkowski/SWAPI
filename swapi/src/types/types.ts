export interface TPlanet {
    climate: string;
    created: Date;
    diameter: string;
    edited: Date;
    films: string[];
    gravity: string;
    name: string;
    orbital_period: string;
    population: string;
    residents: string[];
    rotation_period: string;
    surface_water: string;
    terrain: string;
    url: string;
}

export interface TPerson {
    birth_year: string;
    eye_color: string;
    films: string[];
    gender: string;
    hair_color: string;
    height: string;
    homeworld: string 
    mass: string;
    name: string;
    skin_color: string;
    created: Date;
    edited: Date;
    species: string[];
    starships: string[];
    url: string;
    vehicles: string[];
}

export interface TFilm {
    characters: string[];
    created: Date;
    director: string;
    edited: Date;
    episode_id: string;
    opening_crawl: string;
    planets: string[];
    producer: string;
    release_date: Date;
    species: string[] ;
    starships: string[];
    title: string;
    url: string;
    vehicles: string[];
}

export interface TPersonResponse {
    count: number;
    next: string;
    previous: string;
    results : TPerson[];
}

export interface TPlanetResponse {
    count: number;
    next: string;
    previous: string;
    results : TPlanet[];
}

export interface TFilmResult {
    title: string;
    releaseDate: Date;
    openingCrawl: string;
}