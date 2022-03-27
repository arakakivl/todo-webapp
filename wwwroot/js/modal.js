function postItemModal() {
    showModal();
    btnPostItem.style.display = "block";
}
function putItemModal(item) {
    modalInputTitle.value = item.title;
    modalInputDescription.value = item.description;
    modalInputDate.valueAsDate = new Date(item.completeUntil);
    showModal();
    btnPutItem.style.display = "block";
    btnPutItem.addEventListener("click", function () { putItem(item.id); });
}
function returnItemFromModal() {
    var completeUntil;
    var item;
    try {
        completeUntil = new Date(modalInputDate.value);
        item = { title: modalInputTitle.value,
            description: modalInputDescription.value,
            completeUntil: completeUntil.toISOString()
        };
        return item;
    }
    catch (_a) {
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
//# sourceMappingURL=modal.js.map