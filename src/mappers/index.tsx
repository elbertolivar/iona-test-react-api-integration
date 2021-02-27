import { Cat, CatBreed } from "../models";

// Map API data to cat breed model
export const mapDataToCatBreed = (data: any) => {
    return { 
        id: data.id, 
        name: data.name 
    } as CatBreed;
}

// Map API data to cat model
export const mapDataToCat = (data: any) =>  {
    return {
        id: data.id,
        name: data.breeds[0].name,
        imgUrl: data.url,
        origin: data.breeds[0].origin,
        temperament: data.breeds[0].temperament,
        description: data.breeds[0].description,
        breedId: data.breeds[0].id
    } as Cat;
}