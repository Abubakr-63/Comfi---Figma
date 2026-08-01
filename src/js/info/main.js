import axios from '../../../node_modules/axios/dist/esm/axios.js';
import { addCount, checkforDuplicates, chosenProducts, findId, get, getAllPrice, infoeditproducts, putSizeproduct } from "../main/API.js";
get();
getAllPrice()
export const imageinfo = document.querySelector('.imageinfo');
export const infoName = document.querySelector('.infoName');
export const brand = document.querySelector('.brand');
export const price = document.querySelector('.price');
let boolean = false;


infoeditproducts(localStorage.getItem('id'));

const btninfobrown = document.querySelector('.btn-brown');
if(btninfobrown)btninfobrown.onclick = () => {
    checkforDuplicates();
}

const carticon = document.querySelector('.cart-icon');
const cartDialog = document.querySelector('#cartDialog');

carticon.onclick = () => {
    cartDialog.showModal();
}


chosenProducts()


export function dublicate(arr){
    arr.forEach(element => {
        if(element == localStorage.getItem('id')){
            boolean = true;
        }
    });
    let obj = {
        idUser : localStorage.getItem('id'),
        count : 1,
        price : +localStorage.getItem('productPrice')
    }
    if(boolean == false){
       addCount(obj);
       window.location.href = 'productPage.html'
    }
    else {
        findId(localStorage.getItem('id'))
    }
}