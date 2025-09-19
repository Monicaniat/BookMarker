var nameInput = document.getElementById("name");
var urlInput = document.getElementById("url");
var addBtn = document.getElementById("addBtn");

var tableBody = document.getElementById("tableBody")

var bookMarks;
var mainIndex=0;

if (localStorage.getItem("bookMarks") == null){
  bookMarks = [];
} else{
  bookMarks = JSON.parse(localStorage.getItem("bookMarks"));
  displayBook(bookMarks);
}

var nameRegex = /^[A-Z][a-z]{1,8}$/;
function validateName(){
  if(nameRegex.test(nameInput.value) == true){
    return true;
  } else {
    return false;
  }
}

var urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
function validateUrl(){
  if(urlRegex.test(urlInput.value) == true){
    return true;
  } else {
    return false;
  } 
}

nameInput.onkeyup = function(){
  if(validateName() && validateUrl()){
    addBtn.removeAttribute("disabled");
  } else {
    addBtn.disabled = "true"; // Fixed typo: "diabled" should be "disabled"
  }
}
urlInput.onkeyup = function(){
  if(validateName() && validateUrl()){
    addBtn.removeAttribute("disabled"); 
  } else {
    addBtn.disabled = "true"; // Fixed typo: "diabled" should be "disabled"
  }   
}


addBtn.onclick = function(){
  if(addBtn.innerHTML == "Update"){
    addBtn.innerHTML = "Submit";
        var bookMark = {
      name: nameInput.value,
      url: urlInput.value
  }

  bookMarks.splice(mainIndex,1,bookMark);

} else {
    var bookMark = {
      name: nameInput.value,
      url: urlInput.value
    }
    bookMarks.push(bookMark);
  }

  localStorage.setItem("bookMarks",JSON.stringify(bookMarks));
  displayBook(bookMarks);
  clearData();
}

function displayBook(anyArray){
  var marks = "";
  for(var i=0; i<anyArray.length ; i++){ // Fixed: Added ".length" to loop condition; was missing, causing infinite loop or no iteration

    marks += `
    <tr>
    <td>${anyArray[i].name}</td>
    <td><button onclick="window.open('${anyArray[i].url}')" class="btn btn-primary" target="_blank">Visit</button></td> <!-- Fixed: Added onclick to open URL; was missing functionality -->
    <td><button onclick="updateBook(${i})" class="btn btn-info">Update</button></td>
    <td><button onclick="deleteBook(${i})" class="btn btn-danger">Delete</button></td>
    </tr>`;
  }
  tableBody.innerHTML = marks;
}

function deleteBook(i){
  bookMarks.splice(i,1);
  localStorage.setItem("bookMarks",JSON.stringify(bookMarks));
  displayBook(bookMarks);
}

function clearData(){
  nameInput.value = "";
  urlInput.value = "";
}

function updateBook(i){
  nameInput.value = bookMarks[i].name;
  urlInput.value = bookMarks[i].url;
  addBtn.innerHTML = "Update"; // Fixed: Removed extra space; was "Update " which is minor but inconsistent
  mainIndex = i;

}

function search(term){
  var wantedBook = []; // Fixed: Changed from string "" to array []; was wrong type, causing push error
  for(var i=0; i<bookMarks.length; i++){
    if(bookMarks[i].name.toLowerCase().includes(term)){ // Fixed typo: "toloweCase" should be "toLowerCase"
      wantedBook.push(bookMarks[i]);
    }
  }
  displayBook(wantedBook);
}