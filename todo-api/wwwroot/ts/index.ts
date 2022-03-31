const mainApiUrl = "/api/items/";

const filtersArea = $("body > nav")[0];
const filters = $("body > nav > ul > li");

const itemsArea = $("#itemsArea")[0];
const newItemButton = $("#newItem")[0];

const modal = $("#modalBackground")[0];

const modalInputTitle : HTMLFormElement = <HTMLFormElement>$("#inputTitle")[0];
const modalInputDescription : HTMLFormElement = <HTMLFormElement>$("#inputDescription")[0];
const modalInputDate : HTMLFormElement = <HTMLFormElement>$("#inputDate")[0]

const btnPostItem = $("#btnPostItem")[0];
const btnPutItem = $("#btnPutItem")[0];

interface Item {
    id? : string, // "?": Because we're using DTOs
    title : string,
    description : string,
    isComplete? : boolean, // "?": Because we're using DTOs
    completeUntil : string, 
    createdAt? : string // "?": Because we're using DTOs
}

async function getItems(url : string) : Promise<Item[]> {
    itemsArea.innerHTML = "";

    return await fetch(url)
    .then(items => {
       return items.json() as Promise<Item[]>; 
    });
}

async function getAllItems() {
    await getItems(mainApiUrl).then(x => putItemInItemsArea(x));
}

async function getUncompletedItems() {
    await getItems(mainApiUrl + "uncompleted").then(x => putItemInItemsArea(x));
}

async function getCompletedItems() {
    await getItems(mainApiUrl + "completed").then(x => putItemInItemsArea(x));
}

async function putItemInItemsArea(items : Item[]) {
    // If there's no item:
    if (items.length == 0) {
        itemsArea.style.textAlign = "center";
        itemsArea.innerHTML = "Não há nada aqui!";

        return;
    }

    // Otherwise:
    itemsArea.style.textAlign = "left";
    for(let i : number = items.length - 1; i >= 0; i--) {
        let item = items[i];
        
        // Declaring todoItem html element
        let todoContainer = document.createElement("article");
        let todoAside = document.createElement("section");
        let todoMain = document.createElement("section");
        let todoHeader = document.createElement("header");
        let todoDates = document.createElement("section");
        let todoDesc = document.createElement("section");
        let todoButtons = document.createElement("section");

        // HTML elements that describes a ToDo Item
        let title = document.createElement("h1");
        let created = document.createElement("h2");
        let completeUntil = document.createElement("h2");
        let desc = document.createElement("p");
        let checkInput = document.createElement("input");
        let updateButton = document.createElement("img");
        let deleteButton = document.createElement("img");

        // Adding classes
        todoContainer.classList.add("todo-container");
        todoAside.classList.add("todo-aside");
        todoMain.classList.add("todo-main");
        todoHeader.classList.add("todo-main-header");
        todoDesc.classList.add("todo-main-desc");
        todoButtons.classList.add("todo-main-buttons");

        // Changes in child ToDo Item html elements attributes
        title.innerText = item.title;

        if (item.description.length > 125) {
            desc.innerText = item.description.substring(0, 125);
        } else {
            desc.innerText = item.description;
        }

        completeUntil.innerText = "Completar até: " + formatDate(new Date(item.completeUntil));
        created.innerText = "Criado em: " + formatDate(new Date(item.createdAt));

        checkInput.type = "checkbox";

        if (item.isComplete) {
            checkInput.checked = true;
            title.style.textDecoration = "line-through";
            completeUntil.innerText = "Feito!";
        }

        updateButton.src = "../assets/pencil-edit-button-svgrepo-com.svg";
        updateButton.width = 20;

        deleteButton.src = "../assets/icons8-trash.svg";
        deleteButton.width = 25;
        
        // Event Listeners for interaction
        checkInput.addEventListener("change", async function() {
            await checkToDo(item);
            
            if (checkInput.checked) {
                title.style.textDecoration = "line-through";
                completeUntil.innerText = "Feito!";

                if ($("body > nav > ul > li")[1].classList.contains("selectedFilter")) {
                    await removeToDo(todoContainer);
                }

            } else {
                title.style.textDecoration = "";
                completeUntil.innerText = "Completar até: " + formatDate(new Date(item.completeUntil));

                if ($("body > nav > ul > li")[2].classList.contains("selectedFilter")) {
                    await removeToDo(todoContainer);
                }
            }
        });

        updateButton.addEventListener("click", function() {
            putItemModal(item);
        });

        deleteButton.addEventListener("click", async function() {
            if (!checkInput.checked) {
                if (confirm("Quer mesmo deletá-lo?")) {
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

async function checkToDo(item : Item) {
    await fetch(mainApiUrl + item.id + "/check", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isComplete: !item.isComplete})
    })
}

async function deleteToDo(id : string) {
    await fetch(mainApiUrl + id, {
        method: "DELETE"
    });
}

async function putItem(id : string) {
    let item = returnItemFromModal();

    await fetch(mainApiUrl + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
    })
    .then(x => {
        if (!(x.status.valueOf().toString() == "204")) { 
            throw Error(); 
        } else { 
            closeModal();

            let oldBtnWithEventListener = btnPutItem;
            oldBtnWithEventListener.replaceWith(oldBtnWithEventListener.cloneNode(true));
            location.reload();
        }
    })
    .catch(y => {
        alert("Houve algum erro. Por favor, verifique se o título está devidamente preenchido ou se não é muito grande.");
    });
}

async function postNewItem() {
    let item : Item = returnItemFromModal();
    if (item != null) {
        await fetch(mainApiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item)
        })
        .then(x => {
            if (!x.ok) { 
                throw Error(); 
            } else { 
                closeModal();
                location.reload();
            }
        })
        .catch(y => {
            alert("Houve algum erro. Por favor, verifique se o título está devidamente preenchido ou se não é muito grande.");
        });
    }
}

getAllItems();