import Notiflix from 'notiflix';

const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

export function fetchCountries(name) {
  if (name === '') return;
  fetch(
    `https://restcountries.com/v2/name/${name.trim()}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        console.log(response);
        //throw new Error(response.status);
        if (response.status == '404') {
          Notiflix.Notify.failure('Oops, there is no country with that name');
          countryInfo.innerHTML = '';
          countryList.innerHTML = '';
        }
      }
      return response.json();
    })
    .then(data => {
      if (data.length === 1) oneCountry(data);
      if (data.length >= 2 && data.length <= 10) flagAndCountry(data);
      if (data.length > 10) tooLongAnswerAlert(data);
      // Data handling
    })
    .catch(error => {
      console.error(error);
      // Error handling
    });
}

function tooLongAnswerAlert() {
  return Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}

function flagAndCountry(data) {
  const markUpSeveral = data
    .map(
      e =>
        `<li class="countryList-item"><span class="flag" style="background-image: url(${e.flags.svg});
       width: 30px; height: 20px; display:block;
        background-position: contain; background-size: 30px 20px;
        outline: 1px solid black;"></span><p>${e.name}</p></li>`
    )
    .join('');
  countryInfo.innerHTML = '';
  return (countryList.innerHTML = markUpSeveral);
}

function oneCountry(data) {
  const markUp = data
    .map(
      e =>
        `
        <span class="flag" style="background-image: url(${e.flags.svg});
        width: 60px; height: 40px; display:block;
        background-position: cover; background-size: 60px 40px;
        outline: 1px solid black;"></span>
        <p class="onlyCountryName">${e.name}</p>
        <p class="onlyCountryInfo">Capital: ${e.capital}</p>
        <p class="onlyCountryInfo">Population: ${e.population}</p>
        <p class="onlyCountryInfo">Languages: ${e.languages
          .map(element => element.name)
          .join(', ')}</p>`
    )
    .join('');
  countryList.innerHTML = '';
  return (countryInfo.innerHTML = markUp);
}
