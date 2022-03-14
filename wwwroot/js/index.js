const getUrl = '/api/items';
const itemsArea = $('main')[0];

var allItems = [];

async function getItems() {
    await fetch(getUrl)
    .then(items => items.json())
    .then(data => { 
        for(let i = 0; i < data.length; i++) {

            // Declaring todoItem html element
            let todoContainer = document.createElement('article');
            let todoAside = document.createElement('section');
            let todoMain = document.createElement('section');
            let todoHeader = document.createElement('header');
            let todoDates = document.createElement('section');
            let todoDesc = document.createElement('section');
            let todoButtons = document.createElement('section');

            // HTML elements that describes a ToDo Item
            let title = document.createElement('h1');
            let created = document.createElement('h2');
            let completeUntil = document.createElement('h2');
            let desc = document.createElement('p');
            let checkInput = document.createElement('input');
            let updateButton = document.createElement('img');
            let deleteButton = document.createElement('img');

            // Adding classes
            todoContainer.classList += 'todo-container';
            todoAside.classList += 'todo-aside';
            todoMain.classList += 'todo-main';
            todoHeader.classList += 'todo-main-header';
            todoDesc.classList += 'todo-main-desc';
            todoButtons.classList += 'todo-main-buttons';

            // Changes and child elements
            title.innerHTML = data[i].title;

            let descriptionn = data[i].description;
            if (descriptionn.length > 125) {
                descriptionn = descriptionn.substring(0, 125) + " (...)";
            }

            desc.innerHTML = descriptionn;

            created.innerHTML = "Criado em: " + data[i].createdAt;
            completeUntil.innerHTML = "Completar até: " + data[i].completeUntil;

            checkInput.type = 'checkbox';

            if (data[i].isComplete) {
                checkInput.checked = true;
                title.style.textDecoration = 'line-through';
                completeUntil.innerHTML = 'Feito!';
            }

            updateButton.src = '../assets/pencil-edit-button-svgrepo-com.svg';
            updateButton.width = 20;

            deleteButton.src = '../assets/icons8-trash.svg';
            deleteButton.width = 25;

            // Events Listeners
            checkInput.addEventListener('change', async function() {
                await checkToDo(data[i].id, checkInput.checked);
                if (checkInput.checked) {
                    title.style.textDecoration = 'line-through';
                    completeUntil.innerHTML = 'Feito!';
                }
                else {
                    title.style.textDecoration = '';
                    completeUntil.innerHTML = 
                    completeUntil.innerHTML = "Completar até: " + data[i].completeUntil;
                }
            });

            // EventListener for update button

            deleteButton.addEventListener('click', async function() {
                if (!checkInput.checked) {
                    if (confirm('Quer mesmo deletá-lo?')) {
                        await deleteToDo(data[i].id);
    
                        todoContainer.style.opacity = 0;
    
                        await sleep(500);
                        todoContainer.remove();
                    }
                }
                else {
                    await deleteToDo(data[i].id);
    
                    todoContainer.style.opacity = 0;

                    await sleep(500);
                    todoContainer.remove();
                }
            });
            
            // Appending childs
            todoDates.appendChild(created);
            todoDates.appendChild(completeUntil);

            todoHeader.appendChild(title);
            todoHeader.appendChild(todoDates);

            todoDesc.appendChild(desc);

            todoButtons.appendChild(updateButton);
            todoButtons.appendChild(deleteButton);

            todoAside.appendChild(checkInput);
                        
            todoMain.appendChild(todoHeader);
            todoMain.appendChild(todoDesc);
            todoMain.appendChild(todoButtons);

            todoContainer.appendChild(todoAside);
            todoContainer.appendChild(todoMain);

            itemsArea.appendChild(todoContainer);

            allItems.push(data[i]); // JUST FOR DEVELOPMENT PURPOSES
        }
     });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function checkToDo(itemId, checked) {
    await fetch("/api/items/" + itemId + "/check", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({isComplete: checked})
    });
}

async function deleteToDo(itemId) {
    await fetch("/api/items/" + itemId, {
        method: "DELETE"
    });
}

getItems();