
//model section   ---------------------------------------------

let todos;

const saveTodos2 = JSON.parse(localStorage.getItem('todos'));

if(Array.isArray(saveTodos2)){
    todos = saveTodos2;
}else{
    todos= [{
        title: "Get Groceries",
        dueDate: '2022-10-04',
        id: 'id1'
    },{
        title: "Wash Car",
        dueDate: '2022-10-04',
        id: 'id2'

    },{
        title: "Make Dinner",
        dueDate: '2022-10-04',
        id: 'id3'
    }];
}

// render();

//create a todo

const createTodo= (title,dueDate) => {
    const id = " " + new Date().getTime();
    todos.push({
        title : title,
        dueDate : dueDate,
        id: id
    });

    saveTodos();
}

//deletes a todo
const  removeTodo= (idToDelete) => {
    todos = todos.filter(function(todo){
        if(todo.id === idToDelete){
            return false;
        }else{
            return true;
        }
    });

    saveTodos();
}

//toogle a todo
const toggleTodo = (todoId, checked) => {
    todos.forEach(function (todo) {
      if (todo.id === todoId) {
        todo.isDone = checked;
      }
    });

    saveTodos();
  }
// set editing
  const  setEditing = todoId => {
    todos.forEach(function (todo) {
      if (todo.id === todoId) {
        todo.isEditing = true;
      }
    });

    saveTodos();
  }
//Update Todo
  const updateTodo = (todoId, newTitle, newDate) => {
    todos.forEach(function (todo) {
      if (todo.id === todoId) {
        todo.title = newTitle;
        todo.dueDate = newDate;
        todo.isEditing = false;
      }
    });

    saveTodos();
  }


const saveTodos= ()=> {
    localStorage.setItem('todos', JSON.stringify(todos));
}



//VIEW SECTION   ---------------------------------------------

const  render = () => {
    //RESET LIST
    document.getElementById('todo-list').innerHTML=" ";


    todos.forEach(todo => {
        const element= document.createElement('div');
        
        if (todo.isEditing === true) {
            const textbox = document.createElement('input');
            textbox.type = 'text';
            textbox.id = 'edit-title-' + todo.id;
            element.appendChild(textbox);

            const datePicker = document.createElement('input');
            datePicker.type = 'date';
            datePicker.id = 'edit-date-' + todo.id;
            element.appendChild(datePicker);

            const updateButton = document.createElement('button');
            updateButton.innerText = 'Update';
            updateButton.dataset.todoId = todo.id;
            updateButton.onclick = onUpdate;
            element.appendChild(updateButton);

          // If this todo is not being edited, render what we had before
          // and add an "Edit" button.
        } else {      
            element.innerText = todo.title + " "+ todo.dueDate;

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.onchange = checkTodo;
            checkbox.dataset.todoId = todo.id;
            if (todo.isDone === true) {
            checkbox.checked = true;
            } else {
            checkbox.checked = false;
            }
            element.prepend(checkbox);

            const editButton = document.createElement('button');
            editButton.innerText = 'Edit';
            editButton.style = 'margin-left: 12px';
            editButton.onclick = onEdit;
            editButton.dataset.todoId = todo.id;
            element.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.innerText= 'Delete';
            deleteButton.style= 'margin-left: 20px;'
            deleteButton.onclick= deleteTodo;
            deleteButton.id=todo.id;
            element.appendChild(deleteButton);
            }

            const TodoList = document.getElementById("todo-list");
            TodoList.appendChild(element);
        });
       
}

//Controller section --------------------------------------------------

function addTodo(){
    const textbox= document.getElementById('todo-title');
    const title = textbox.value;

    const datePicker = document.getElementById('date-picker');
    const dueDate = datePicker.value;    

    createTodo(title,dueDate);

    render();
}

function deleteTodo(event){
    const deleteButton= event.target;
    const idToDelete = deleteButton.id;
    removeTodo(idToDelete);
    render();
}

function checkTodo(event) {
    const checkbox = event.target;
    const todoId = checkbox.dataset.todoId;
    const checked = checkbox.checked;

    toggleTodo(todoId, checked);
    render();
  }

  function onEdit(event) {
    const editButton = event.target;
    const todoId = editButton.dataset.todoId;

    setEditing(todoId);
    render();
  }

  function onUpdate(event) {
    const updateButton = event.target;
    const todoId = updateButton.dataset.todoId;

    const textbox = document.getElementById('edit-title-' + todoId);
    const newTitle = textbox.value;

    const datePicker = document.getElementById('edit-date-' + todoId);
    const newDate = datePicker.value;

    updateTodo(todoId, newTitle, newDate);
    render();
  }

  render();































// function pickApples(fruitArray) {
//     let applesPicked = 0;
  
//     const filteredArray = fruitArray.filter(function (fruit) {
//       if (applesPicked >= 2) {
//         // Remember, returning true keeps this value in the array.
//         return true;
//       } else if (fruit === 'apple') {
//         applesPicked = applesPicked + 1;
//         return false;
//       } else {
//         return true;
//       }
//     });
  
//     return filteredArray;
//   }

// console.log(pickApples(['cherry', 'apple', 'orange', 'apple', 'banana', 'apple']));


// function max(item){
//     let min = Infinity;
//     item.filter(function(num){
//         if(num<min && num>=0 ){
//             min=num;
//         }
//     });

//     return min;
// }

// console.log(max([1, 5, -2, 4, 3, 5, 0]));





// function aboveFreezing(temps){
//     const tempsfree=temps.filter(function(item){
//         if(item>0){
//             return true;
//         }else{
//             return false;
//         }
//     });

//    return tempsfree;
// }

// aboveFreezing([3,4,5,23,33,-13,-13]);


// let total=0;


// function createCart(foodPrices){
//     const foods= Object.keys(foodPrices);
//     console.log(foods);

//     foods.forEach(function(food){
//         const cartItem= document.createElement('div');


//         const foodPrice= foodPrices[food];
//         cartItem.innerText= food + ' ' + '$' + foodPrice;

//         const addButton= document.createElement('button');
//         addButton.innerText= "ADD";


//         addButton.onclick = function(){
//             total=total+foodPrice;
//         };

//         cartItem.appendChild(addButton);

//         document.body.appendChild(cartItem);
//         console.log(foodPrice);
//     });
// }

// createCart({ Apple: 3, Orange: 4, Egg: 2 });



// function cartTotal(cartArray) {
//     let total = 0;

//     cartArray.forEach(function(item) {
//     total=total + item.price*item.quantity;
// });

// console.log(total);

// }

// cartTotal([
//     {name:'apple', price: 4, quantity: 2},
//     {name:'orange', price: 3, quantity: 3}
// ]);


// function displayReceipt(cartArray){
//     //RESET LIST
//     document.getElementById('receipt').innerHTML=" ";


//     cartArray.forEach(function(item){
//         const element= document.createElement('div');
//         element.innerText = item.name + ' $' + item.price + ' * ' + item.quantity;
//         document.getElementById('receipt').appendChild(element);
//     });

//     let cartTotal = 0;
//     cartArray.forEach(function (item) {
//       cartTotal = cartTotal + item.price * item.quantity;
//     });
//     const totalLine = document.createElement('div');
//     totalLine.innerText = 'Cart total = $' + cartTotal;
//     document.getElementById('receipt').appendChild(totalLine);
  
// }

// displayReceipt([
//     { name: 'Apple', price: 4, quantity: 2 },
//     { name: 'Orange', price: 3, quantity: 3 }
//   ]);









// const cart = document.getElementById('cart');

// function apple(){
//     const element = document.createElement('div');
//     element.innerText="Apple";
//     document.getElementById('cart').appendChild(element);
// }

// function tomato(){
//     const element = document.createElement('div');
//     element.innerText="Tomato";
//     document.getElementById('cart').appendChild(element);
// }
// function eggs(){
//     const element = document.createElement('div');
//     element.innerText="Eggs";
//     document.getElementById('cart').appendChild(element);
// }

// function clear2() {
//     cart.innerHTML = '';
// }


// const measurement = document.getElementById('mesaurement');

// function convertToCm(){
//     const value = measurement.value;
//     const element = document.createElement('div');
//     element.innerText= +value*2.54;
//     document.body.appendChild(element);

// }


// function convertToInch() {
//   const value = measurement.value;
//   const convertedValue = +value / 2.54;

//   const result = document.createElement('div');
//   result.innerText = convertedValue;
//   document.body.appendChild(result);
// }



