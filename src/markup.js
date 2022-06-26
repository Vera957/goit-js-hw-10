import Notiflix from 'notiflix';

export const returnOneCountry = ([data]) => {
  console.log([data].length, 'returnOneCountry');
  return `<span class="flag" style="background-image: url(${
    data.flags.svg
  });
        width: 60px; height: 40px; display:block;
        background-position: cover; background-size: 60px 40px;
        outline: 1px solid black;"></span>
        <p class="onlyCountryName">${data.name.official}</p>
        <p class="onlyCountryInfo"><span class="bold">Capital:</span> ${data.capital.toString()}</p>
        <p class="onlyCountryInfo"><span class="bold">Population:</span> ${
          data.population
        }</p>
        <p class="onlyCountryInfo"><span class="bold">Languages:</span> ${Object.values(
          data.languages
        ).join(', ')}
    `;
};

export function returnFewCountries(data) {
  console.log([...data].length, 'returnFewCountries');
  return data
    .map(
      e =>
        `<li class="countryList-item">
        <span class="flag" style="background-image: url(${e.flags.svg}); width: 30px; height: 20px; display:block;
        background-position: contain; background-size: 30px 20px;
        outline: 1px solid black;"></span>
        <p>${e.name.official}</p></li>`
    )
    .join('');
}

export function tooLongAnswerAlert(data) {
     console.log(data.length, 'tooLongAnswerAlert');
     Notiflix.Notify.info(
       'Too many matches found. Please enter a more specific name.'
     );
}

