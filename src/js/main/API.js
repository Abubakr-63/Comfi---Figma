import axios from '../../../node_modules/axios/dist/esm/axios.js';
import { brand, dublicate, imageinfo, infoName, price } from '../info/main.js';
import showUser, { showcompany, showProctsinBasket } from './Dom.js';
const API = 'http://localhost:3000/products';
const APIbasket = 'http://localhost:3000/basket';

export default async function getUsers() {
    try {
        const {data} = await axios.get(API);
        showUser(data);
        showProducts(data)
    } catch (error) {
        console.log(error)
    }
}


//API2
export async function addCount(obj) {
    try {
        await axios.post(APIbasket, obj);
        getAPI2()
    } catch (error) {
        console.log(error)
    }
}


export async function get() {
    try {
        const {data} = await axios.get(APIbasket);
        document.querySelector('.cart-badge').innerHTML = data.length
    } catch (error) {
        console.log(error)
    }
}

export async function infoeditproducts(id) {
    if(imageinfo){
        try {
        const {data} = await axios.get(`${API}/${id}`);
        if(imageinfo)imageinfo.src = data.image;
        if(infoName)infoName.innerHTML = data.title;
       if(brand)brand.innerHTML = data.company;
       if(price)price.innerHTML = `$${data.price}`;
    } catch (error) {
        console.log(error)
    }
    }
}

export async function chosenProducts() {
    try {
        const {data} = await axios.get(APIbasket)
        for(let i = 0; i < data.length; i++){
            showProducts(data[i].idUser, data[i].id, data[i].count, data[i].price)
        }
    } catch (error) {
        console.log(error)
    }
}


export async function showProducts(id, basketid, cnt, price) {
    try {
        const {data} = await axios.get(`${API}/${id}`);
        localStorage.setItem('productName', data);
        localStorage.setItem('idbasket', basketid)
        showProctsinBasket(data, basketid, cnt, price)
    } catch (error) {
        console.log(error)
    }
}

const cartitems = document.querySelector('.cartitems');
export async function removeProduct(id) {
    try {
        await axios.delete(`${APIbasket}/${id}`);
        cartitems.innerHTML = '';
        chosenProducts();
    } catch (error) {
        console.log(error)
    }
}

export async function searchInp(value) {
    try {
        if(value == ''){
            getUsers();
            return '';
        }
        const {data} = await axios.get(`${API}?title:contains=${value}`);
        showUser(data);
    } catch (error) {
        console.log(error)
    }
}

export async function putSizeproduct(edited) {
    try {
        await axios.put(`${APIbasket}/${edited.id}`, edited);
        cartitems.innerHTML = '';
        chosenProducts();
    } catch (error) {
        console.log(error)
    }
}

let ArrOfCompany = [];
export async function addCompany() {
    try {
        const {data} = await axios.get(API);
        for(let i = 0; i < data.length; i++){
            if(!ArrOfCompany.includes(data[i].company))ArrOfCompany.push(data[i].company);
        }
        showcompany(ArrOfCompany)
    } catch (error) {
        console.log(error)
    }
}

export async function selectCompany(value) {
    try {
        const {data} = await axios.get(`${API}?company=${value}`);
        showUser(data);
    } catch (error) {
        console.log(error)
    }
}

export async function checkforDuplicates() {
    try {
        const {data} = await axios.get(APIbasket);
        let arr = [];
        for(let i = 0; i < data.length ; i++){
        arr.push(data[i].idUser)
    }
    dublicate(arr);
    } catch (error) {
        console.log(error)
    }
}

export async function findId(id) {
    try {
        const {data} = await axios.get(APIbasket);
        data.forEach(element => {
            if(element.idUser == id){
                let edited = {
                  id : element.id,
                  idUser : element.idUser,
                  count :  element.count + 1,
                  price : +element.price + +element.price,
                }
                putSizeproduct(edited)
                window.location.href = 'productPage.html'
            }
        });
    } catch (error) {
        console.log(error)
    }
}

let res = 0
export async function getAllPrice() {
    try {
        const {data} = await axios.get(APIbasket);
        data.forEach(element => {
            res += +element.price
        })
        document.querySelector('.total-amount').innerHTML = `$${res}`;
    } catch (error) {
        console.log(error)
    }
}