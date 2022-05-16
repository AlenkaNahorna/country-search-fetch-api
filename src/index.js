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

const getCountryList = countries => countries.map(country => countryListTpl(country)).join('');

const сountryCard = countries => {
  const countriesСount = countries.length;
  if (countriesСount > 10) {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (countriesСount > 1 && countriesСount <= 10) {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = getCountryList(countries);
  } else if (countriesСount === 1) {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = countryCardTpl(countries[0]);
  }
};

const onFetchError = Error => {
  Notiflix.Notify.failure('Oops! There is no country with that name!');
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
};

const clearInput = () => {
  const currentData = refs.searchInput.value;
  if (currentData === '') {
    refs.countryInfo.innerHTML = '';
  }
};
const onSearch = e => {
  e.preventDefault;
  const inputData = refs.searchInput.value.trim();
  fetchCountries(inputData).then(сountryCard).catch(onFetchError);

  clearInput();
};

refs.searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
