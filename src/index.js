import './css/styles.css';
import { Notify } from 'notiflix';
import debounce from 'lodash.debounce'
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
    searchBox: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info')
}

const { searchBox, list, info } = refs

const debounced = debounce(() => {
    
    if (searchBox.value.trim() === "") {
        list.textContent = "";
        info.textContent = "";
        return
    }

    fetchCountries(searchBox.value.trim())
        .then(result => {
            list.textContent = "";
            info.textContent = "";

            if (result.length > 10) {
                return Notify.info(
                    'Too many matches found. Please enter a more specific name.'
                );
            } else if (10 > result.length > 1) {
                const markup = result.map(
                    ({ name, flags }) =>
                        `<li>
  <div class="wrapper">
    <img src="${flags.svg}" alt="flag" width="50">
    <h3>${name.common}</h3>
  </div>
</li>`
                )
                list.insertAdjacentHTML('beforeend', markup.join(''))
            } else {
                markup = result.map(
                    ({ name, flags, capital, population, languages }) =>
                        `<div class="wrap">
  <img src=${flags.svg} alt="flag" width="70"/>
  <h2>${name.common}</h2>
          </div>
          <p><strong>Capital:</strong> ${capital}</p>
          <p><strong>Population:</strong> ${population}</p>
          <p><strong>Languages:</strong> ${Object.values(languages)}</p>`
                )
                list.insertAdjacentHTML('beforeend', markup.join(''))
            }
        })
        .catch(error => {
            Notify.failure(error.message)
            list.textContent = "";
            info.textContent = "";
        })

}, DEBOUNCE_DELAY);

searchBox.addEventListener('input', debounced)

