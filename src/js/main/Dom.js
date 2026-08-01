import getUsers, { putSizeproduct, removeProduct, searchInp, selectCompany } from "./API.js";

const box = document.querySelector('.products-grid');
const cartDialog = document.querySelector('#cartDialog');
const search = document.querySelector('.search');
const selectbyCompany = document.querySelector('.selectbyCountry');

export default function showUser(data) {
    if(box)box.innerHTML = '';
    data.forEach(element => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `<div class="product-image">
        <img src="${element.image}" alt="High-Back Bench">
        <i class="ri-search-line search-icon"></i>
        </div>
        <h3>${element.title}</h3>
        <p class="price">$${element.price}</p>`
        
        card.onclick = () => {
            localStorage.setItem('id', element.id)
            localStorage.setItem('productPrice', element.price)
            window.location.href = 'infoPage.html'
        }
        if(box)box.append(card);
    });
}

const carticon = document.querySelector('.cart-icon');
if(carticon)carticon.onclick = () => {
    cartDialog.showModal();
}


export async function showProctsinBasket(data, basketid, cnt, price) {
    const cartitems = document.querySelector('.cart-items');
    const card = document.createElement('div');
    card.className = 'cart-item';
    card.innerHTML = `<img src="${data.image}" alt="Albany Table">
        <div class="item-info">
            <h4>${data.title}</h4>
            <p class="price">$${data.price}</p>
            <div class="quantity-controls">
                <button type="button" class="qty-btn plus"><i class="fa-regular fa-square-plus"></i></button>
                <span class="qty-value">${cnt}</span>
                <button type="button" class="qty-btn minus"><i class="fa-regular fa-square-minus"></i></button>
            </div>
        </div>
        <button type="button" class="remove-btn">
            <i class="fa-solid fa-xmark"></i>
        </button>`;
        const plus = card.querySelector('.plus');
        const minus = card.querySelector('.minus');

        plus.onclick = () => {
            let newSize = {
               count : cnt+1,
               idUser : data.id,
               id : basketid,
               price : +price + +price,
            }
            console.log(+price + +price)
            putSizeproduct(newSize)
        }

        minus.onclick = () => {
            let res = [`${+price - +localStorage.getItem('productPrice')}`]
            let res2 = res[0].slice(0, 5)
            let newSize = {
               count : cnt-1,
               idUser : data.id,
               id : basketid,
               price : res2,
            }
            if(cnt == 1){
                alert('There is need to be one, it cannot become zero')
                return ''
            }
            putSizeproduct(newSize)
        }

        const removebtn = card.querySelector('.remove-btn');
        removebtn.onclick = () => {
            removeProduct(basketid)
        }

    cartitems.append(card);
}


if(search)search.oninput = () => {
    searchInp(search.value)
}


export function showcompany(arr){
    arr.forEach(element => {
        const option = document.createElement('option');
        option.innerHTML = element;
        option.value = element;
        selectbyCompany.append(option);
    })
}

if(selectbyCompany)selectbyCompany.onchange = () => {
    if(selectbyCompany.value == 'all'){
        getUsers();
        return "";
    }
    selectCompany(selectbyCompany.value)
}
