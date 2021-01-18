import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import countryListTemplate from '../templates/country-list.hbs';
import countryMarkup from '../templates/country-markup.hbs';
import pnotifyError from './pnotify.js'


const pnotifyContainerRef = document.querySelector('.pnotify');
const divContainetRef = document.querySelector('.js-container');

const fetchCountriesHandler = debounce(event => {
    containerCleaner();
    const searchQuery = event.target.value;
    fetchCountries(searchQuery).then(data => {
        const searchResultsNumber = Number(data.length);
        if (searchResultsNumber > 10) {
            pnotifyError("Cлишком много совпадений, уточните запрос");
            return;
        }
        if (searchResultsNumber > 1 && searchResultsNumber < 10) {
            const countries = data.map(country => country.name);
            divContainetRef.innerHTML = countryListTemplate(countries);

            return;
        }
        if (searchResultsNumber === 1) {
            divContainetRef.innerHTML = countryMarkup(data[0]);
            return;
            }
        pnotifyError('По Вашему запросу нет совпадений');
    });
}, 500);


function containerCleaner(){
    divContainetRef.innerHTML = '';
    const pnotifyContainerRef = document.querySelector('.pnotify');
    if (pnotifyContainerRef) { pnotifyContainerRef.innerHTML = ''; }
};

export default fetchCountriesHandler;