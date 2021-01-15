import './styles.css';
import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';
import countryListTemplate from './templates/country-list.hbs';
import countryMarkup from './templates/country-markup.hbs';
//import pnotifyError from './js/pnotify.js';

import '@pnotify/core/dist/BrightTheme.css';
import { error, defaultModules, Stack } from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import { defaults } from '@pnotify/core';
console.log(defaults);
defaultModules.set(PNotifyMobile, {});
defaults.closer = false;
defaults.delay = 2000;
defaults.sticker = true;
defaults.height = '100px';


// console.log(pnotifyError);
const inputHandler = debounce((event) => {
    divContainetRef.innerHTML = '';
    const searchQuery = event.target.value;
    fetchCountries(searchQuery).then(data => {
        console.log(data);

        const searchResultsNumber = Number(data.length);
        console.log(searchResultsNumber);
        if (searchResultsNumber > 10) {
            error({
                text: "Notice that's positioned in its own stack.",
                stack: new Stack({
                    dir1: 'down', dir2: 'right', // Position from the top left corner.
                    firstpos1: 90, firstpos2: 90 // 90px from the top, 90px from the left.
                })
            });
            return;
        }
        if (searchResultsNumber > 1 && searchResultsNumber < 10) {
            const countries = data.map(country => country.name);
            console.log(countries);
            divContainetRef.innerHTML = countryListTemplate(countries);

            return;
        }
        if (searchResultsNumber === 1) {
            divContainetRef.innerHTML = countryMarkup(data[0]);
            console.log(data[0]);
        }
    });
}, 500);

const divContainetRef = document.querySelector('.js-container');
const inputRef = document.querySelector('.search-input');
inputRef.addEventListener('input', inputHandler);
