import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';

import { makeCatAPIRequest } from '../../adapters/cat-api';
import { mapDataToCat, mapDataToCatBreed } from '../../mappers';
import { Cat, CatBreed } from '../../models';

export type CatContextType = {
    breeds: {
        data: CatBreed[],
        loading: boolean
    },
    cats: {
        data: Cat[],
        loading: boolean,
        breedId: string|null,
        page: number,
        limit: number,
        totalCount: number
    },
    cat: {
        data: Cat|null,
        loading: boolean
    },
    changeBreed: (breedId: string|null) => void,
    getBreeds: () => Promise<void>,
    getCats: () => Promise<void>,
    getCat: (id: string) => Promise<void>,
    loadMoreCats: () => void
};

export const CatContext = createContext<CatContextType|undefined>(undefined);

/** NOTE: I was supposed to use useReducer instead of useState but I feel like it's gonna be an overkill. Plus the data sets are not that compleex yet. */

export const CatContextProvider: React.FC = ({ children }) => {
    // Breed-related states and actions
    const [breeds, setBreeds] = useState<CatBreed[]>([]);
    const [breedsLoading, setBreedsLoading] = useState<boolean>(false);

    // Cats-related states and actions
    const [breedId, setBreedId] = useState<string|null>(null);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(10);
    const [cats, setCats] = useState<Cat[]>([]);
    const [catsLoading, setCatsLoading] = useState<boolean>(false);

    // Cat-related states  and actions
    const [cat, setCat] = useState<Cat|null>(null);
    const [catLoading, setCatLoading] = useState<boolean>(false);

    // Error state and action
    const [error, setError] = useState<string|null>();

    // Set breed id and reset cats to empty
    const changeBreed = (breedId: string|null) => {
        setBreedId(breedId);
        setCats([]);
        setTotalCount(0);
        setPage(1);
    }

    // Increment page
    const loadMoreCats = () => {
        setPage(page + 1);
    }

    // Request breeds API while setting the loading status and error
    const getBreeds = async () => {
        setBreedsLoading(true);
        try {
            const { data } = await makeCatAPIRequest('breeds');
            setBreeds([...data].map(breed => mapDataToCatBreed(breed)));
            setError(null);
        } catch (_err: any) {
            setError('Apologies but we could not load new breeds for you at this time! Miau!');
        }
        setBreedsLoading(false);
    }

    // Request cats API while setting the loading status and error
    const getCats = async () => {
        setCatsLoading(true);
        try {
            const { data, headers } = await makeCatAPIRequest(`images/search?page=${page}&limit=${limit}&breed_id=${breedId}`);
            const newCats = [...data].map(newCat => mapDataToCat(newCat))
                                .filter((newCat) => cats.filter((cat) => cat.id === newCat.id).length === 0);
            setCats([...cats, ...newCats]);
            setTotalCount(parseInt(headers['pagination-count'], 10));
            setError(null);
        } catch (_err: any) {
            setError('Apologies but we could not load new cats for you at this time! Miau!');
        }
        setCatsLoading(false);
    }

    // Request cat API while setting the loading status and error
    const getCat = async (id: string) => {
        setCatLoading(true);
        try {
            const { data } = await makeCatAPIRequest(`images/${id}`);
            setCat(mapDataToCat(data));
            setError(null);
        } catch (_err: any) {
            setError('Apologies but we could not load this cat for you at this time! Miau!');
        }
        setCatLoading(false);
    }

    // When breed id and page state value changes, make a request from cats API
    useEffect(() => {
        if (!!breedId) {
            getCats();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [breedId, page])

    return (
        <CatContext.Provider value={{
            breeds: {
                data: breeds,
                loading: breedsLoading
            },
            cats: {
                data: cats,
                loading: catsLoading,
                breedId,
                page,
                limit,
                totalCount
            },
            cat:  {
                data: cat,
                loading: catLoading
            },
            changeBreed,
            getBreeds,
            getCats,
            getCat,
            loadMoreCats
        }}>
            {/* Display if there is error from the API */}
            {error && <Alert variant="danger">This is an error</Alert>}
            {children}
        </CatContext.Provider>
    )
}