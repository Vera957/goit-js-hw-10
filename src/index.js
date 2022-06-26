import './css/styles.css';

import { _, debounce } from 'lodash';

import { fetchCountries } from './fetchCountries';
import {
  returnFewCountries,
  returnOneCountry,
  tooLongAnswerAlert,
} from './markup';

const DEBOUNCE_DELAY = 300;
const ci = document.querySelector('.country-info');
const cl = document.querySelector('.country-list');

const inputSearch = document.querySelector('#search-box');

inputSearch.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  let val = e.target.value.trim();
  if (val == '') {
    return;
  }
  fetchCountries(val)
    .then(data => {
      clearMarkUp();
      if (data == undefined) return;
      if (data.length == 1) {
        ci.innerHTML = returnOneCountry(data);
      }
      if (data.length >= 2 && data.length <= 10) {
        cl.innerHTML = returnFewCountries(data);
      }
      if (data.length > 10) {
        tooLongAnswerAlert(data);
      }
    })
    .catch(error => {
      console.error(error, "catch"), clearMarkUp();
    });
}

function clearMarkUp() {
  ci.innerHTML = '';
  cl.innerHTML = '';
}
