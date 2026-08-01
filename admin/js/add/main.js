import { postUser } from "../main/API.js";

const addform = document.querySelector('.add-form');
const showimage2 = document.querySelector('.show-image');


let reader = null;
if(showimage2)addform['image'].onchange = (e) => {
    e.preventDefault()
    let currentFile = addform['image'].files[0];
    reader = new FileReader();
    reader.readAsDataURL(currentFile);
}
addform['watch-Image'].onclick = () => {
    let imagObj = {
        image : reader.result,
    }
    showimage2.src = imagObj.image;
    addform['watch-Image'].style.display = 'none';
    showimage2.style.display = 'block'
}

if(showimage2)addform.onsubmit = () => {
    let edited = {
        id : addform['idUser'].value,
        title : addform['nameProduct'].value,
        company : addform['nameCompany'].value,
        price : addform['price'].value,
        image : reader.result,
    } 
    addform.reset();
    postUser(edited);
    window.location.href = 'Admin.html';
}