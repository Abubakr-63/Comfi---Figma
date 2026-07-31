import { chosenProducts, get } from "../main/API.js";

get()

const carticon = document.querySelector('.cart-icon');
const cartDialog = document.querySelector('#cartDialog');

carticon.onclick = () => {
    cartDialog.showModal();
}

chosenProducts()