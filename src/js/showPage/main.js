import { chosenProducts, get, getAllPrice } from "../main/API.js";

get();
getAllPrice()

const carticon = document.querySelector('.cart-icon');
const cartDialog = document.querySelector('#cartDialog');

carticon.onclick = () => {
    cartDialog.showModal();
}

chosenProducts()