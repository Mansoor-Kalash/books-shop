
let arrObj=[];
let tableHeader=['Book Name', 'Book Pages', 'Price'];


function Books(book,page, price){
  this.Book=book;
  this.Page=page;
  this.Price=price;
  arrObj.push(this);
  saveToLocalStorage(this);
}

function saveToLocalStorage(){
  let stringObj= JSON.stringify(arrObj);
  localStorage.setItem('book',stringObj);
}

function readFromLocalStorage(){
  let data = localStorage.getItem('book');
  let normalObj= JSON.parse(data);
  if (normalObj){
    for(let i =0;i<normalObj.length; i++)
    {
      new Books(normalObj[i].Book,normalObj[i].Page, normalObj[i].Price);
    }
  }
}

function addBook(event){
  event.preventDefault();
  let nameOfBook = event.target.book.value;
  let numberOfgpages = Math.floor(Math.random() * (500 - 1 + 1) + 1);
  let valuePrice= event.target.price.value;

  let node = document.getElementById('table');
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }

  new Books (nameOfBook,numberOfgpages,valuePrice);
  console.log(arrObj);
  tableHead();
  addTable();


}

let form= document.getElementById('form');
form.addEventListener('submit',addBook);

function tableHead(){
  let table = document.getElementById('table');
  let tHead= document.createElement('thead');
  let tr = document.createElement('tr');

  for(let i=0; i<tableHeader.length;i++)
  {
    let th = document.createElement('th');
    th.textContent=tableHeader[i];
    tr.appendChild(th);
  }
  tHead.appendChild(tr);
  table.appendChild(tHead);
}


function addTable(){
  let table1 = document.getElementById('table');
  let tBody= document.createElement('tbody');

  let total=0;

  for(let i =0 ; i<arrObj.length;i++)
  {
    let tr = document.createElement('tr');
    let tdBookName = document.createElement('td');
    tdBookName.textContent=arrObj[i].Book;
    tr.appendChild(tdBookName);

    let tdBookPages = document.createElement('td');
    tdBookPages.textContent=arrObj[i].Page;
    tr.appendChild(tdBookPages);

    let tdPrice = document.createElement('td');
    tdPrice.textContent=`JOD ${arrObj[i].Price}`;
    tr.appendChild(tdPrice);

    total+=arrObj[i].Price;

    tBody.appendChild(tr);
  }
  let totalEl = document.createElement('td');
  totalEl.textContent= `JOD ${total}`;
  let trtotal = document.createElement('tr');

  trtotal.appendChild(totalEl);

  tBody.appendChild(trtotal);
  table1.appendChild(tBody);





}
readFromLocalStorage();
tableHead();
addTable();

