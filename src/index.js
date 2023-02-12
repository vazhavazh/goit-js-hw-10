import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce'


const DEBOUNCE_DELAY = 300;

const refs = {
    searchBox: document.querySelector('#search-box'),
    list: document.querySelector('country-list'),
    info: document.querySelector('country-info')
}

const { searchBox, list, info } = refs

const handleInput = () => {
    const searchValue = searchBox.value.trim()
    console.log(searchValue);
}

searchBox.addEventListener('input', handleInput)
