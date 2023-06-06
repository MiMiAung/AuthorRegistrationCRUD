
let formauthor = document.forms[0];
    //console.log('formauthor => ', formauthor);

let formbook = document.forms[1];
   // console.log('formbook=> ', formbook);
let plzJoin = document.getElementById('plzJoin');
let btnSaveAuthor = document.getElementById("saveauthor");
let btnSaveBook = document.getElementById('savebook');
let showdatabtn = document.getElementById("showdatabtn");
let showdata = document.getElementById("showdata");
let btnModel = document.getElementById('btnModel');

let imgBookPreview = document.getElementById("output-book");

let authorImgContainer = document.getElementById('authorImgContainer');
      
let authorPreview = document.getElementById("author-preview");
      

let idspanli = document.getElementById('id-span-li');


let tableContainer = document.getElementById('div-table-container');
let idTable = document.getElementById('id-table');

let liEle = document.createElement('li');
let aEle = document.createElement('a');
aEle.setAttribute('type','button');
aEle.setAttribute('class','aclick');
aEle.setAttribute('data-bs-toggle','modal');
aEle.setAttribute('data-bs-target','#staticBackdrop-book');
aEle.textContent = 'Add-Book';
let authorObj = {};
let booklist = [];

let imgsrc;
let bookImgSrc;

var loadFileAuthor = function (event) {
    //console.log('loadfile author method...', event.target)
    let img = document.getElementById("output-author");
    //console.log('img=> ', img)
    let fildReader = new FileReader();
   // console.log(fildReader);
    fildReader.addEventListener("load", () => {
      //console.log("fildReader.result", fildReader.result);
      img.setAttribute('src',fildReader.result)
      imgsrc = fildReader.result;
    });
    
    fildReader.readAsDataURL(event.target.files[0]);
  };

  btnSaveAuthor.addEventListener("click", (e) => {
  
    e.preventDefault();
   
    let formdata = new FormData(formauthor);
    

   // console.log(formdata.values());
    formdata.forEach((value, key) => {
     // console.log(typeof value , 'author imag => ', imgsrc);
      if (typeof value == "object") {
        authorObj[key] = imgsrc;
      } else {
        authorObj[key] = value;
      }
    });

    console.log("authorObj", authorObj, typeof authorObj.image);

   
   // console.log(json);
    //console.log("imgsrc=> ", imgsrc);
    
    btnSaveAuthor.addEventListener('mouseleave', showAuthorInfo);
    formauthor.reset();
 });

  function showAuthorInfo(){
    console.log(plzJoin)
    plzJoin.style.display = 'none';
    showdata.textContent = 'Hello ' + authorObj.name + ' , you can upload your book by clicking ADD-Book button.'

      btnModel.replaceWith(authorImgContainer);
      liEle.appendChild(aEle);
      console.log('liEle ==> ', liEle , 'aele=> ', aEle)
      idspanli.prepend(liEle);
     
      authorPreview.setAttribute("src", authorObj.image);
      authorPreview.style.height = '100%'
      console.log("obj" , authorObj);
  }


  var loadFileBook = function (event) {
    
    console.log('loadfile book method...', event.target);
   // event.target.value = "";
    
   // console.log('img=> ', img)
    let fildReader = new FileReader();
   // console.log(fildReader);
    fildReader.addEventListener("load", () => {
     // console.log("fildReader.result", fildReader.result);
      imgBookPreview.setAttribute('src',fildReader.result)
      bookImgSrc = fildReader.result;
    });
    
    fildReader.readAsDataURL(event.target.files[0]);
    
  };

  btnSaveBook.addEventListener("click", (e) => {
  console.log('click btn save ')
   
  let formdata = new FormData(formbook);
  let obj = {};
  let bookImg = document.getElementById('output-book');
  console.log('bookImgSrc' , bookImgSrc , typeof bookImgSrc)
  formdata.forEach((value,key)=>{
    console.log( "key" ,key ,value);
      if (typeof value == "object") {
        obj[key] = bookImg.src;
      } else {
        obj[key] = value;
      }
    
  });
  console.log("obj in btn click==>  ", obj , 'obj.tbindex==> ' , obj.tb_index)
 
if(obj.tb_index === ''){
  booklist.push(obj);
}else{
  booklist[obj.tb_index - 1] = obj;
}

  btnSaveBook.addEventListener('mouseleave', showBookInfo(obj));
})

 function showBookInfo(obj){
  //let bookPreview = document.getElementById('book-preview');

  console.log('obj in showbookinfo' ,obj)
  formbook.reset();
  imgBookPreview.setAttribute('src',"");

  let div = document.createElement('div');
  div.style.width = '50px';
  div.style.height = '50px';
  div.style.margin = '0 auto';
  let img = document.createElement('img');
  img.style.width = "100%";
  img.style.height = '100%';
  img.style.padding = '5px'
  div.append(img);
  
  console.log('img ==> ', img)
  let showObj = {
    'name' : obj.name,
    'year' : obj.year
  }
  
  console.log('booklist', booklist);
  console.log('obj=> ', obj)
  
  tableContainer.style.display = 'block';

  let tr = document.createElement('tr');
 
  let tdCell = document.createElement('td');
  img.setAttribute('src',obj.image);
  //bookPreview.style.borderRadius = '0'
  tdCell.append(div);
  tr.prepend(tdCell);

  for(let prop in showObj){
      let td = document.createElement('td');
    
      td.textContent = obj[prop];
      tr.append(td);
  }

  let tdEdit = document.createElement('td');
  tdEdit.textContent = 'Edit';
  tdEdit.setAttribute('data-bs-toggle','modal');
  tdEdit.setAttribute('data-bs-target','#staticBackdrop-book');
  tdEdit.textContent = 'Edit';
  tdEdit.style.cursor = 'pointer';
  tr.append(tdEdit);
 
 

  tdEdit.addEventListener('click',(e)=>{
   // console.log('form book after edit click==> ', formbook)
    //console.log('form book id==> ', formbook['book_id'].value)
   
  obj.tb_index = tr.rowIndex;
    
    console.log('booklist==> ', booklist); 
    console.log(booklist[tr.rowIndex-1]);
    let data = booklist[tr.rowIndex-1];
      console.log('data==> ', data);
      
    
    formbook['name'].value = data.name;
   
    console.log('data.img==> ', data.image)
    imgBookPreview.setAttribute('src', data.image);
    
    formbook['tb_index'].value = tr.rowIndex;
    formbook['language'].value = data.language;
    formbook['category'].value = data.category;
    formbook['pages'].value = data.pages;
    formbook['year'].value = data.year;
    formbook['bookdetail'].value = data.bookdetail;

    console.log(formbook);   

    
   })

  
  
  idTable.append(tr);

  if( obj.tb_index === '' ){
    
  
    idTable.append(tr);
  } else{
      
       idTable.rows[obj.tb_index].replaceWith(tr);
         
   }

  
 }

 
aEle.addEventListener('click',()=>{
 imgBookPreview.setAttribute('src',"");
 formbook.reset();
 console.log('book list ==> ', booklist);
 console.log('author ==> ', authorObj);


})

  
 