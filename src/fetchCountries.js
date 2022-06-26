import Notiflix from 'notiflix';

export function fetchCountries(name) {
  name = name.trim();
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      } 
        return response.json();
    })
    .catch(error => {
      console.error(error);
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}
