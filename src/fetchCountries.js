import Notiflix from 'notiflix';

import {
  returnOneCountry,
  returnFewCountries,
  tooLongAnswerAlert,
} from './markup';

let countryInfo = '';
let countryList = '';
const ci = document.querySelector('.country-info');
const cl = document.querySelector('.country-list');

export function fetchCountries(name) {
  name = name.trim();
  if (name === '') return;
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        countryInfo = '';
        countryList = '';
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.length === 0) {
        countryInfo = '';
        countryList = '';
      }

      if (data.length == 1) {
        countryInfo = returnOneCountry(data);
        countryList = '';
      }
      if (data.length >= 2 && data.length <= 10) {
        countryList = returnFewCountries(data);
        countryInfo = '';
      }

      if (data.length > 10) {
        tooLongAnswerAlert(data)
        countryInfo = ''; countryList = '';
      }
      ci.innerHTML = countryInfo;
      cl.innerHTML = countryList;
    })
    .catch(error => {
      console.log('error', error);
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

