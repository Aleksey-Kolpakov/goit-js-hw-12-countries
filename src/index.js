import './styles.css';
import fetchCountries from './js/fetchCountries'
import debounce from 'lodash.debounce';

const inputHandler = debounce((event) => {
    const searchQuery = event.target.value;
    fetchCountries(searchQuery).then(data => {
        console.log(data);

        const searchQueryQuantity = Number(data.length);
        console.log(searchQueryQuantity);
        if (searchQueryQuantity > 10) {
            console.log('Слишком много совпадений,уточните запрос');
            return;
        }
        if (searchQueryQuantity > 1 && searchQueryQuantity < 10) {
            const countries = data.map(country => country.name);
            console.log(countries);
            return;
        }
        if (searchQueryQuantity === 1) {
            console.log(data.name);
        }
    });
}, 500);

const inputRef = document.querySelector('.search-input');
inputRef.addEventListener('input', inputHandler);

