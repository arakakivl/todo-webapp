const mainApiUrl = '/api/items';
const itemsArea = document.getElementById('itemsArea');
const newItemButton = document.getElementById('newItem');
const modal = document.getElementById('modalBackground');

async function getItems(url) {
    itemsArea.innerHTML = '';
    
    await fetch(url)
    .then(items => items.json())
    .then(data => {
        putItemInItemsArea(data);
    });
}

/* Vamos ignorar essa gambiarra? =D */
async function getAllItems() {
    $('body > nav > ul > li')[0].style.color = 'red';
    $('body > nav > ul > li')[1].style.color = 'black';
    $('body > nav > ul > li')[2].style.color = 'black';

    await getItems(mainApiUrl)
}

async function getUncompletedItems() {
    $('body > nav > ul > li')[1].style.color = 'red';
    $('body > nav > ul > li')[0].style.color = 'black';
    $('body > nav > ul > li')[2].style.color = 'black';
    await getItems(mainApiUrl + '/uncompleted');
}

async function getCompletedItems() {
    $('body > nav > ul > li')[2].style.color = 'red';
    $('body > nav > ul > li')[0].style.color = 'black';
    $('body > nav > ul > li')[1].style.color = 'black';

    await getItems(mainApiUrl + '/completed');
}

async function putItemInItemsArea(items) {
    if (items.length == 0) {
        itemsArea.style.textAlign = 'center';
        itemsArea.innerHTML = 'Não há nada aqui!';

        return;
    }

    itemsArea.style.textAlign = 'left';
    for (let i = 0; i < items.length; i++) {
        let item = items[i];

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
        title.innerHTML = item.title;

        let descriptionn = item.description;
        if (descriptionn.length > 125) {
            descriptionn = descriptionn.substring(0, 125) + " (...)";
        }

        desc.innerHTML = descriptionn;

        // Dates
        created.innerHTML = "Criado em: " + formatDate(new Date(item.createdAt));
        completeUntil.innerHTML = "Completar até: " + formatDate(new Date(item.completeUntil));

        checkInput.type = 'checkbox';

        if (item.isComplete) {
            checkInput.checked = true;
            title.style.textDecoration = 'line-through';
            completeUntil.innerHTML = 'Feito!';
        }

        updateButton.src = '../assets/pencil-edit-button-svgrepo-com.svg';
        updateButton.width = 20;

        deleteButton.src = '../assets/icons8-trash.svg';
        deleteButton.width = 25;

        // Events Listeners
        checkInput.addEventListener('change', async function () {
            await checkToDo(item.id, checkInput.checked);
            if (checkInput.checked) {
                title.style.textDecoration = 'line-through';
                completeUntil.innerHTML = 'Feito!';

                if ($('body > nav > ul > li')[1].style.color == 'red') {
                    await removeToDo(todoContainer);
                }
            }
            else {
                title.style.textDecoration = '';
                completeUntil.innerHTML = "Completar até: " + formatDate(new Date(item.completeUntil));
                
                if ($('body > nav > ul > li')[2].style.color == 'red') {
                    await removeToDo(todoContainer);
                }
            }
        });

        updateButton.addEventListener('click', function() {
            putItemModal(item.id);
        });
        
        deleteButton.addEventListener('click', async function () {
            if (!checkInput.checked) {
                if (confirm('Quer mesmo deletá-lo?')) {
                    await deleteToDo(item.id);
                    await removeToDo(todoContainer);
                }
            }
            else {
                await deleteToDo(item.id);
                await removeToDo(todoContainer);
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
    }
}

function formatDate(date) {
    let day;
    let month;

    if (date.getDate().toString().length == 1) {
        day = "0" + date.getDate();
    } else {
        day = date.getDate();
    }

    month = "0" + (date.getMonth() + 1);
    if ((date.getMonth() + 1).toString().length == 1) {
    } else {
        month = date.getMonth() + 1;
    }

    return day + "/" + month;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function removeToDo(item) {
    item.style.opacity = 0;

    await sleep(500);
    item.remove();
}

async function checkToDo(itemId, checked) {
    await fetch("/api/items/" + itemId + "/check", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isComplete: checked })
    });
}

async function deleteToDo(itemId) {
    await fetch("/api/items/" + itemId, {
        method: "DELETE"
    });
}

function showModal() {
    document.getElementById('btnPostItem').style.display = 'none';
    document.getElementById('btnPutItem').style.display = 'none';

    newItemButton.style.display = 'none';
    modal.style.display = 'flex';
}

function postItemModal() {
    showModal();
    document.getElementById('btnPostItem').style.display = 'block';
}

async function putItemModal(id) {
    let itemm;
    itemm = await fetch('api/items/' + id).then(response => response.json()).then(data => { return data; }) ;

    document.getElementById('inputTitle').value = itemm.title;
    document.getElementById('inputDescription').value = itemm.description;

    let date = new Date(itemm.completeUntil);
    document.getElementById('inputDate').valueAsDate = date;

    showModal();
    document.getElementById('btnPutItem').style.display = 'block';

    document.getElementById('btnPutItem').addEventListener('click', function() { putItem(id) });
}

function closeModal() {
    document.getElementById('inputTitle').value = "";
    document.getElementById('inputDescription').value = "";
    document.getElementById('inputDate').value = "";

    newItemButton.style.display = 'block';
    modal.style.display = 'none';
}

function returnItemFromForm() {
    let completeUntil;
    let item;

    try {
        completeUntil = new Date(document.getElementById('inputDate').value);
        item = { title: document.getElementById('inputTitle').value, "description": document.getElementById('inputDescription').value, "completeUntil": completeUntil.toISOString() };

        return item;
    } catch {
        alert("Houve um erro. Verifique se a data está preenchida corretamente.");
        return "null";
    }
}

async function postNewItem() {
    let item = returnItemFromForm();
    if (item != "null") {
        await fetch("/api/items", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item)
        })
        .then(x => {
            if (!x.ok) { 
                throw Error(); 
            } else { 
                closeModal();
            }
        })
        .catch(y => {
            alert("Houve algum erro. Por favor, verifique se o título está devidamente preenchido ou se não é muito grande.");
        });
    }
}

async function putItem(id) {
    let item = returnItemFromForm();
    item.id = id;

    await fetch('/api/items/' + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
    })
    .then(x => {
        if (!(x.status.valueOf() == "204")) { 
            throw Error(); 
        }  else { 
            closeModal();
            let oldBtnWithEventListener = document.getElementById('btnPutItem');
            oldBtnWithEventListener.replaceWith(oldBtnWithEventListener.cloneNode(true));
        }
    })
    .catch(y => {
        alert("Houve algum erro. Por favor, verifique se o título está devidamente preenchido ou se não é muito grande.");
    });
}

getAllItems()