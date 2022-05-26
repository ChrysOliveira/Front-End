import { log } from './utils/Promise-helpers.js';
import './utils/Array-helpers.js';
import { notasService as service } from './nota/Service.js';

document.querySelector('#myButton')
    .onclick = () =>
    service.sumItems('2143')
    .then(console.log)
    .catch(console.log)