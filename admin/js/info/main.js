import axios from '../../../node_modules/axios/dist/esm/axios.js';
import { deleteUser, infoEdits, infoproducts } from '../main/API.js';
export const imageinfo = document.querySelector('.imageinfo');
export const infoName = document.querySelector('.infoName');
export const brand = document.querySelector('.brand');
export const price = document.querySelector('.price');

infoproducts(localStorage.getItem('id'));

if(document.querySelector('.btn-delete'))document.querySelector('.btn-delete').onclick = () => {
    deleteUser(localStorage.getItem('id'));
    window.location.href = 'Admin.html'
}

if(document.querySelector('.btn-edit'))document.querySelector('.btn-edit').onclick = () => {
    infoEdits(localStorage.getItem('id'));
    window.location.href = 'edit.html'
}