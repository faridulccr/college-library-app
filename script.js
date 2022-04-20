// class constructor create a book obj
class Book {
    constructor(bookname, auther, type){
        this.bookname = bookname;
        this.auther = auther;
        this.type = type;
    }
    // clear function to reset the form
    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    };
    // form validation
    formValidate(){
        if(this.bookname.length>2 && this.auther.length>2){
            return true;
        }else {
            return false;
        };
    };

    showAlert(type, message){
        let alertDiv = document.getElementById('alertDiv');
        alertDiv.innerHTML = `<div class="alert alert-${type}" role="alert">
                                ${message}
                            </div>`;
        setTimeout(()=>{alertDiv.innerHTML =''},3000);
    };
};

// get book from localStorage and assign it to booksArray

let books = localStorage.getItem('books'); // it is an Array or null
let booksArray; // here I will be assign existing array or empty array
if (books) {
    booksArray = JSON.parse(books); // here booksArray's value will convert from JSON format to Object
} else {
    booksArray = [];
};
addBooks(booksArray);

// Add submit event listener to libraryForm 
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

// this function will call after submit the form
function libraryFormSubmit(event) {
    let bookname = document.getElementById('bookname').value;
    let auther = document.getElementById('author').value;
    // radio elements
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    let type;
    // for assign value of checked input to type variable
    if (fiction.checked) {
        type = fiction.value;
    } else if (programming.checked) {
        type = programming.value;
    } else if (cooking.checked) {
        type = cooking.value;
    }else {
        type = "you don't select type.";
    };

    // create a book object
    let bookObj = new Book(bookname, auther, type);

    if(bookObj.formValidate()){
        booksArray.push(bookObj);
        localStorage.setItem('books', JSON.stringify(booksArray)); // JSON.stingify create a json file in the local storage
        addBooks(booksArray);
        bookObj.clear();
        bookObj.showAlert('success','Your Book has been <a href="#" class="alert-link">successfully added</a>.');
    }else {
        bookObj.showAlert('danger','Please <a href="#" class="alert-link">fill-out</a> the form.');
    };
     
    event.preventDefault(); // prevent the default behaviour of the form reloading
};

// add function to display book object in the table body
function addBooks(booksArray){
    let tbody = document.getElementById('tbody');
    let html ='';
    booksArray.forEach((bookObj, index) => {
        html +=`<tr>
                    <td>${index + 1}</td>
                    <td>${bookObj.bookname}</td>
                    <td>${bookObj.auther}</td>
                    <td>${bookObj.type}</td>
                    <td>
                        <button onclick="removeBook(this.id)" id ="${index}" class="btn btn-primary">
                            Remove
                        </button>
                    </td>
                </tr>` ;
    });
    tbody.innerHTML = html;        
};

function removeBook(index){
    booksArray.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(booksArray));
    addBooks(booksArray);
};

// home work
/*
 *Store all the to the local storage
 *Give another column as an option to delete the book
 *Add a srollbar to the view

 I have completed the task.

*/
