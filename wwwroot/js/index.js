const getUrl = '/api/items';
const itemsArea = $('main')[0];

async function getItems() {
    await fetch(getUrl)
    .then(items => items.json())
    .then(data => { 
        for(let i = 0; i < data.length; i++) {

            // Declaring todoItem html element
            let todoContainer = document.createElement('div');
            let todoAside = document.createElement('div');
            let todoMain = document.createElement('div');

            let title = document.createElement('h1');
            let desc = document.createElement('p');
            let checkInput = document.createElement('input');
            
            // Adding classes
            todoContainer.classList += 'todo-container';
            todoAside.classList += 'todo-aside';
            todoMain.classList += 'todo-main';
            title.classList += 'todo-main-title';
            desc.classList += 'todo-main-desc';

            // Changes and child elements
            title.innerHTML = data[i].title;
            desc.innerHTML = data[i].description;

            checkInput.type = 'checkbox';
            checkInput.checked = data[i].isComplete;

            todoAside.appendChild(checkInput);
            todoMain.appendChild(title);
            todoMain.appendChild(desc);

            todoContainer.appendChild(todoAside);
            todoContainer.appendChild(todoMain);

            itemsArea.appendChild(todoContainer);
        }
     });
}

getItems();