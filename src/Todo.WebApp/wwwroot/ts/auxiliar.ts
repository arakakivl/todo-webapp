for (let i : number = 0; i < filters.length; i++) {
    filters[i].addEventListener("click", function() {
        var selectedFilter = $(".selectedFilter");
        selectedFilter[0].className = selectedFilter[0].className.replace("selectedFilter", "");

        filters[i].className += "selectedFilter";
    });
}

function formatDate(date : Date) : string {
    let day : string;
    let month : string;

    if (date.getDate().toString().length == 1) {
        day = "0" + date.getDate();
    } else {
        day = date.getDate().toString();
    }

    if ((date.getMonth() + 1).toString().length == 1) {
        month = "0" + (date.getMonth() + 1);
    } else {
        month = (date.getMonth() + 1).toString();
    }

    return (day + "/" + month);
}

async function sleep(ms : number) : Promise<unknown> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function removeToDo(container : HTMLElement) {
    container.style.opacity = "0";

    await sleep(500);
    container.remove();

    if (itemsArea.children.length == 0) {
        itemsArea.style.textAlign = "center";
        itemsArea.innerHTML = "Não há nada aqui!";
    }
}