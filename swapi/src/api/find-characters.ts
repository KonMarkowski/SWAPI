import { TPerson, TPersonResponse, TPlanet, TPlanetResponse } from "../types/types"

const PLANET_START_URL = 'https://swapi.dev/api/planets'
const PERSON_START_URL = 'https://swapi.dev/api/people'

const getResidentsOfPlanets = async (planets: TPlanet[]) => {
    return await Promise.all(planets.map(planet => Promise.all(planet.residents
        .map(async (residentUrl) => await fetch(residentUrl, { method: 'GET' })
            .then(async resRaw => await resRaw.json())
            .then(async (person: TPerson) => await person)))
    )).then((persons) => persons.flat())

}

const findPersonByName = async (
    name: string,

) => {
    const person = await (await fetch(`${PERSON_START_URL}/?search=${name}`, { method: 'GET' })).json() as TPersonResponse

    if (person.count) {

        return person.results

    } else {

        return await findPersonByPlanetName(name)

    }

}

const findPersonByPlanetName = async (
    homeworldName: string,
) => {

    const planets = await (await fetch(`${PLANET_START_URL}/?search=${homeworldName}`, { method: 'GET' })).json() as TPlanetResponse
    
    if(planets.count === 0) {
        throw new Error("There are no characters matching given criteria")
    }
    
    return await getResidentsOfPlanets(planets.results)

}

const findPersonByPlanetPopulation = async (
    population: string,
) => {
    const planets = await (await fetch(PLANET_START_URL ?? '', { method: 'GET' })).json() as TPlanetResponse

    const remainingPages = Array.from({ length: Math.ceil(planets.count / 10) - 1 }, (_, i) => i + 2)

    const remainingPlanets = await Promise.all(remainingPages
        .map(async page => await fetch(`${PLANET_START_URL}/?page=${page}`)
            .then(async resRaw => await resRaw.json())
            .then(async (planetsRes: TPlanetResponse) => await planetsRes))
    ).then(planets => planets.flat())

    const matchingPlanets = [planets, ...remainingPlanets]
    .map(page => page.results
    .filter(planet => planet.population === population)).flat()

    if(matchingPlanets.length === 0) {
        throw new Error("There are no characters matching given criteria")
    }

    const residents = await getResidentsOfPlanets(matchingPlanets)

    return residents

}

export const findCharacters = async (value: string) => {

    if (isNaN(Number(value))) {

        return await findPersonByName(value)

    } else {

        return await findPersonByPlanetPopulation(value)

    }

}