import { Notify } from 'notiflix/build/notiflix-notify-aio';

const countryInfo = document.querySelector('.country-info');

export function fetchCountries(name) {
  fetch(
    `https://restcountries.com/v2/name/${name.trim()}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        console.log(response);
        //throw new Error(response.status);
        if (response.status == '404') {
          Notify.failure('Oops, there is no country with that name');
          countryInfo.innerHTML = '';
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
  return Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}

function flagAndCountry(data) {
  const markUpSeveral = data.map(
    e =>
      `<span class="flag" style="background-image: url(${e.flags.svg});
       width: 30px; height: 20px; display:block;
        background-position: contain; background-size: 30px 20px;
        outline: 1px solid black;"></span><p>${e.name}</p>`
  ).join('');
  console.log(markUpSeveral);
  return (countryInfo.innerHTML = markUpSeveral);
}

function oneCountry(data) {
  const markUp = data
    .map(
      e =>
        `
        <span class="flag" style="background-image: url(${e.flags.svg});
       width: 60px; height: 40px; display:block;
        background-position: contain; background-size: 60px 40px;
        outline: 1px solid black;"></span>
        <h2>${e.name}</h2>
        <p>Capital: ${e.capital}</p>
        <p>Population: ${e.population}</p>
        <p>Languages: ${e.languages.map(
          element => element.name
          )}</p>`
    )
    .join('');
  return (countryInfo.innerHTML = markUp);
}
