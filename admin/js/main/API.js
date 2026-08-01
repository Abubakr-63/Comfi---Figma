import axios from '../../../node_modules/axios/dist/esm/axios.js';
import showProducts, { showcompany } from "./Dom.js";
import { brand, imageinfo, infoName, price } from '../info/main.js';
import { showimage } from '../edit/main.js';

const API = 'http://localhost:3000/products';
const ImageAPI = 'http://localhost:3000/image';

export default async function getUsers() {
    try {
        const {data} = await axios.get(API);
        showProducts(data)
    } catch (error) {
        console.log(error)
    }
}

export async function deleteUser(id) {
    try {
        await axios.delete(`${API}/${id}`);
        getUsers();
    } catch (error) {
        console.log(error)
    }
}

export async function infoproducts(id) {
    if(imageinfo){
        try {
        const {data} = await axios.get(`${API}/${id}`);
        if(imageinfo)imageinfo.src = data.image;
        if(infoName)infoName.innerHTML = data.title;
       if(brand)brand.innerHTML = data.company;
       if(price)price.innerHTML = data.price;
    } catch (error) {
        console.log(error)
    }
    }
}

const editform = document.querySelector('.edit-form');
export async function infoEdits(id) {
    if(showimage){
    try {
        const {data} = await axios.get(`${API}/${id}`);
        editform['nameProduct'].value = data.title;
        editform['nameCompany'].value = data.company;
        editform['price'].value = `$${data.price}`;
        editform['idUser'].value = data.id;
        localStorage.setItem('image', data.image)
        showimage.src = data.image
    } catch (error) {
        console.log(error)
    }
}
}

export async function putUser(user) {
    try {
        await axios.put(`${API}/${user.id}`, user);
        getUsers();
    } catch (error) {
        console.log(error)
    }
}


export async function selectCompany(value) {
    try {
        const {data} = await axios.get(`${API}?company=${value}`);
        showProducts(data);
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

export async function postUser(product) {
    try {
        await axios.post(API, product);
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
        showProducts(data);
    } catch (error) {
        console.log(error)
    }
}


export async function filterPrices(value) {
    try {
        if(value == ''){
            getUsers();
            return '';
        }
        const {data} = await axios.get(`${API}?price_lte=${value}`);
        showProducts(data);
    } catch (error) {
        console.log(error)
    }
}