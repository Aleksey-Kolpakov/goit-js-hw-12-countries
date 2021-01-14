export default function fetchCountries(searchQuery) {
    return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}?fields=name;capital;flag;languages;population`)
        .then(response => response.json());

};