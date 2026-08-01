import { infoEdits, putUser } from "../main/API.js";


const editform = document.querySelector('.edit-form');
export const showimage = document.querySelector('.showimage');
infoEdits(localStorage.getItem('id'));

let reader = null;
if(showimage)editform['image'].onchange = () => {
    let currentFile = editform['image'].files[0];
    reader = new FileReader();
    reader.readAsDataURL(currentFile)
}

if(showimage)editform.onsubmit = (e) => {
    e.preventDefault();
    if(reader == null){
        let edited = {
        id : editform['idUser'].value,
        title : editform['nameProduct'].value,
        company : editform['nameCompany'].value,
        price : editform['price'].value,
        image : localStorage.getItem('image')
    }
    putUser(edited)
    }
    else{
    let edited = {
        id : editform['idUser'].value,
        title : editform['nameProduct'].value,
        company : editform['nameCompany'].value,
        price : editform['price'].value,
        image : reader.result,
    } 
    putUser(edited);
    }
    window.location.href = 'Admin.html'
}