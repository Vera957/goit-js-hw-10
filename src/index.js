import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { _, debounce } from 'lodash';

const DEBOUNCE_DELAY = 300;

const inputSearch = document.querySelector('#search-box');

inputSearch.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  e.preventDefault();
  const val = e.target.value;
  fetchCountries(val);
}
