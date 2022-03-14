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

            let title = document.createElement('h1');
            let created = document.createElement('h2');
            let completeUntil = document.createElement('h2');
            let desc = document.createElement('p');
            let checkInput = document.createElement('input');
            
            // Adding classes
            todoContainer.classList += 'todo-container';
            todoAside.classList += 'todo-aside';
            todoMain.classList += 'todo-main';
            todoHeader.classList += 'todo-main-header';
            todoDesc.classList += 'todo-main-desc';

            // Changes and child elements
            title.innerHTML = data[i].title;

            let descriptionn = data[i].description;
            if (descriptionn.length > 80) {
                descriptionn = descriptionn.substring(0, 55) + " (...)";
            }

            desc.innerHTML = descriptionn;
            created.innerHTML = "Criado em: " + data[i].createdAt;
            completeUntil.innerHTML = "Completar até: " + data[i].completeUntil;

            checkInput.addEventListener('change', async function() {
                await checkToDo(data[i].id, checkInput.checked);
                if (checkInput.checked) {
                    title.style.textDecoration = 'line-through';
                }
                else {
                    title.style.textDecoration = '';
                }
            });

            checkInput.type = 'checkbox';
            if (data[i].isComplete)
            {
                checkInput.checked = true;
                title.style.textDecoration = 'line-through';
            }
            
            todoHeader.appendChild(title);
            todoDates.appendChild(created);
            todoDates.appendChild(completeUntil);

            todoDesc.appendChild(desc);

            todoAside.appendChild(checkInput);
            todoHeader.appendChild(todoDates);
            todoMain.appendChild(todoHeader);
            todoMain.appendChild(todoDesc);

            todoContainer.appendChild(todoAside);
            todoContainer.appendChild(todoMain);

            itemsArea.appendChild(todoContainer);

            allItems.push(data[i]); // THIS
        }
     });
}

async function checkToDo(itemId, checked) {
    await fetch("/api/items/" + itemId + "/check", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({isComplete: checked})
    });
}

getItems();