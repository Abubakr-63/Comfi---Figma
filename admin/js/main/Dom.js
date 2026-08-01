import getUsers, { deleteUser, filterPrices, searchInp, selectCompany } from "./API.js";

const box = document.querySelector('.products-grid');
const selectbyCompany = document.querySelector('.selectbyCompany');
const addbtn = document.querySelector('.addbtn');
const searchinput = document.querySelector('.search-input');

export default async function showProducts(data) {
    box.innerHTML = '';
    data.forEach(element => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `<div class="product-image-container">
          <img src="${element.image}" alt="High-Back Bench">
          <div class="product-actions">
            <button class="info-btn" title="Информация"><i class="fa-solid fa-circle-info"></i></button>
            <button class="edit-btn" title="Редактировать"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="delete-btn" title="Удалить"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        </div>
        <h4>${element.title}</h4>
        <p class="price">$${element.price}</p>`;

        const deletebtn = card.querySelector('.delete-btn');
        deletebtn.onclick = () => {
           deleteUser(element.id)
        }

        const infobtn = card.querySelector('.info-btn');
        infobtn.onclick = () => {
            localStorage.setItem('id', element.id)
            window.location.href = 'info.html'
        }

        const editbtn = card.querySelector('.edit-btn');
        editbtn.onclick = () => {
          localStorage.setItem('id', element.id);
          window.location.href = 'edit.html'
        }
        box.append(card);
    });
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

if(addbtn)addbtn.onclick = () => {
  window.location.href = 'add.html'
}

if(searchinput)searchinput.oninput = () => {
  searchInp(searchinput.value)
}

const pricerange = document.querySelector('.price-slider');
const pricevalue = document.querySelector('.price-value')
pricerange.oninput = () => {
  pricevalue.innerHTML = `Value : $${pricerange.value}`
    filterPrices(pricerange.value)
}