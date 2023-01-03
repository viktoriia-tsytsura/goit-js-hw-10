export function fetchCountries(country) {
    const BASE_URL = `https://restcountries.com/v3.1/name/${country}`;
    return fetch(`${BASE_URL}?fields=name,capital,population,flags,languages`)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.statusText)
            }
            return resp.json()
        });   
}

