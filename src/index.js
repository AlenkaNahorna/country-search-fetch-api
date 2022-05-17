import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

import { fetchCountries } from './js/fetchCountries.js';
import countryListTpl from './template/country-list.hbs';
import countryCardTpl from './template/country-card.hbs';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchInput: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

function cleanMarkup() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}

const getCountryList = countries => (refs.countryList.innerHTML = countryListTpl(countries));

const сountryCard = countries => {
  const countriesСount = countries.length;
  cleanMarkup();
  if (countriesСount > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (countriesСount > 1 && countriesСount <= 10) {
    getCountryList(countries);
  } else if (countriesСount === 1) {
    refs.countryInfo.innerHTML = countryCardTpl(countries);
  }
};

const onFetchError = () => {
  Notiflix.Notify.failure('Oops! There is no country with that name!');
  cleanMarkup();
};

const onSearch = e => {
  e.preventDefault;
  const inputData = e.target.value.trim();
  if (inputData === '') {
    cleanMarkup();
    return;
  }
  fetchCountries(inputData).then(сountryCard).catch(onFetchError);
};

refs.searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
