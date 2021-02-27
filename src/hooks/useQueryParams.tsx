import { useLocation } from 'react-router-dom';
import qs from 'querystring';

// A custom hook to get the query params of the current url location
export function useQueryParams<T>() {
    const location = useLocation();

    return qs.parse(location.search.slice(1)) as unknown as T;
}