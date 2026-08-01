import axios from '../../../node_modules/axios/dist/esm/axios.js';
import { infoproducts } from '../main/API.js';
export const imageinfo = document.querySelector('.imageinfo');
export const infoName = document.querySelector('.infoName');
export const brand = document.querySelector('.brand');
export const price = document.querySelector('.price');

infoproducts(localStorage.getItem('id'));