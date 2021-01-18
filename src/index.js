import './styles.css';
import fetchCountriesHandler from './js/fetchCountriesHandler.js'

const inputRef = document.querySelector('.search-input');
inputRef.addEventListener('input', fetchCountriesHandler);
