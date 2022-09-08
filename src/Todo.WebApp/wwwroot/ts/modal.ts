function postItemModal() {
    showModal();
    btnPostItem.style.display = "block";
}

function putItemModal(item : Item) {
    modalInputTitle.value = item.title;
    modalInputDescription.value = item.description;

    let date = new Date(item.completeUntil);
    modalInputDate.valueAsDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))

    showModal();

    btnPutItem.style.display = "block";
    btnPutItem.addEventListener("click", function() { putItem(item.id) });
}

function returnItemFromModal() : Item {
    let completeUntil : Date;
    let item : Item;

    try {
        completeUntil = new Date(modalInputDate.value);
        item = { title: modalInputTitle.value, 
                 description: modalInputDescription.value, 
                 completeUntil: completeUntil.toISOString() 
        };

        return item;
    } catch {
        alert("Houve um erro. Verifique se a data está preenchida corretamente.");
        return null;
    }
}

function showModal() {
    btnPostItem.style.display = "none";
    btnPutItem.style.display = "none";

    newItemButton.style.display = "none";
    modal.style.display = "flex";
}

function closeModal() {
    modalInputTitle.value = "";
    modalInputDescription.value = "";
    modalInputDate.value = "";

    newItemButton.style.display = "block";
    modal.style.display = "none";
}