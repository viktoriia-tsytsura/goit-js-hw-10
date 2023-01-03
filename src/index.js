import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
    evt.preventDefault();
    const value = evt.target.value.trim();

    if (!value) {
        countryList.innerHTML = '';
        return;
    }

    fetchCountries(value)
        .then(data => {

            if (data.length > 10) {
                countryList.innerHTML = '';
                return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            }
            if (data.length <= 10 && data.length > 1) {
                createDemoMarkup(data);
            }
            if (data.length === 1) {
                createFinalMarkup(data)
            }
        })
        .catch(err => {
            Notiflix.Notify.failure("Oops, there is no country with that name")
            countryList.innerHTML = '';
        })

}




function createFinalMarkup(arr) {
    const markup = arr.map(({ name: { official }, flags: { svg }, capital, population, languages }) => `<li> <div> <img src="${svg}" alt="${official}" width="40"> <h2>
     ${official}</h2 </div>
    </li>
    <li><span>Capital:</span> ${capital}</li>
    <li><span>Population:</span> ${population}</li>
    <li><span>Languages:</span> ${Object.values(languages)}</li>`);
    countryList.innerHTML = markup.join('')
    console.log(arr)
}

function createDemoMarkup(arr) {
     const markup = arr.map(({ name: { official }, flags: { svg } }) => `<li> <div> <img src="${svg}" alt="${official}" width="40"> <h2>
     ${official}</h2 </div>
    </li>`);
    countryList.innerHTML = markup.join('');
}


