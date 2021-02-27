export interface CatBreed {
    id: string;
    name: string;
}

export interface Cat {
    id: string;
    name: string;
    imgUrl: string;
    origin: string;
    temperament: string;
    description: string;
    breedId: string;
}