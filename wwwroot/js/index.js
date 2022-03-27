var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var mainApiUrl = "/api/items/";
var filtersArea = $("body > nav")[0];
var filters = $("body > nav > ul > li");
var itemsArea = $("#itemsArea")[0];
var newItemButton = $("#newItem")[0];
var modal = $("#modalBackground")[0];
var modalInputTitle = $("#inputTitle")[0];
var modalInputDescription = $("#inputDescription")[0];
var modalInputDate = $("#inputDate")[0];
var btnPostItem = $("#btnPostItem")[0];
var btnPutItem = $("#btnPutItem")[0];
function getItems(url) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    itemsArea.innerHTML = "";
                    return [4 /*yield*/, fetch(url)
                            .then(function (items) {
                            return items.json();
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getAllItems() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getItems(mainApiUrl).then(function (x) { return putItemInItemsArea(x); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function getUncompletedItems() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getItems(mainApiUrl + "uncompleted").then(function (x) { return putItemInItemsArea(x); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function getCompletedItems() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getItems(mainApiUrl + "completed").then(function (x) { return putItemInItemsArea(x); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function putItemInItemsArea(items) {
    return __awaiter(this, void 0, void 0, function () {
        var _loop_1, i;
        return __generator(this, function (_a) {
            // If there's no item:
            if (items.length == 0) {
                itemsArea.style.textAlign = "center";
                itemsArea.innerHTML = "Não há nada aqui!";
                return [2 /*return*/];
            }
            // Otherwise:
            itemsArea.style.textAlign = "left";
            _loop_1 = function (i) {
                var item = items[i];
                // Declaring todoItem html element
                var todoContainer = document.createElement("article");
                var todoAside = document.createElement("section");
                var todoMain = document.createElement("section");
                var todoHeader = document.createElement("header");
                var todoDates = document.createElement("section");
                var todoDesc = document.createElement("section");
                var todoButtons = document.createElement("section");
                // HTML elements that describes a ToDo Item
                var title = document.createElement("h1");
                var created = document.createElement("h2");
                var completeUntil = document.createElement("h2");
                var desc = document.createElement("p");
                var checkInput = document.createElement("input");
                var updateButton = document.createElement("img");
                var deleteButton = document.createElement("img");
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
                }
                else {
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
                checkInput.addEventListener("change", function () {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, checkToDo(item)];
                                case 1:
                                    _a.sent();
                                    if (!checkInput.checked) return [3 /*break*/, 4];
                                    title.style.textDecoration = "line-through";
                                    completeUntil.innerText = "Feito!";
                                    if (!$("body > nav > ul > li")[1].classList.contains("selectedFilter")) return [3 /*break*/, 3];
                                    return [4 /*yield*/, removeToDo(todoContainer)];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3: return [3 /*break*/, 6];
                                case 4:
                                    title.style.textDecoration = "";
                                    completeUntil.innerText = "Completar até: " + formatDate(new Date(item.completeUntil));
                                    if (!$("body > nav > ul > li")[2].classList.contains("selectedFilter")) return [3 /*break*/, 6];
                                    return [4 /*yield*/, removeToDo(todoContainer)];
                                case 5:
                                    _a.sent();
                                    _a.label = 6;
                                case 6: return [2 /*return*/];
                            }
                        });
                    });
                });
                updateButton.addEventListener("click", function () {
                    putItemModal(item);
                });
                deleteButton.addEventListener("click", function () {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!!checkInput.checked) return [3 /*break*/, 4];
                                    if (!confirm("Quer mesmo deletá-lo?")) return [3 /*break*/, 3];
                                    return [4 /*yield*/, deleteToDo(item.id)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, removeToDo(todoContainer)];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3: return [3 /*break*/, 7];
                                case 4: return [4 /*yield*/, deleteToDo(item.id)];
                                case 5:
                                    _a.sent();
                                    return [4 /*yield*/, removeToDo(todoContainer)];
                                case 6:
                                    _a.sent();
                                    _a.label = 7;
                                case 7: return [2 /*return*/];
                            }
                        });
                    });
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
            };
            for (i = items.length - 1; i >= 0; i--) {
                _loop_1(i);
            }
            return [2 /*return*/];
        });
    });
}
function checkToDo(item) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(mainApiUrl + item.id + "/check", {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ isComplete: !item.isComplete })
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function deleteToDo(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(mainApiUrl + id, {
                        method: "DELETE"
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function putItem(id) {
    return __awaiter(this, void 0, void 0, function () {
        var item;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    item = returnItemFromModal();
                    return [4 /*yield*/, fetch(mainApiUrl + id, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(item)
                        })
                            .then(function (x) {
                            if (!(x.status.valueOf().toString() == "204")) {
                                throw Error();
                            }
                            else {
                                closeModal();
                                var oldBtnWithEventListener = btnPutItem;
                                oldBtnWithEventListener.replaceWith(oldBtnWithEventListener.cloneNode(true));
                                location.reload();
                            }
                        })
                            .catch(function (y) {
                            alert("Houve algum erro. Por favor, verifique se o título está devidamente preenchido ou se não é muito grande.");
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function postNewItem() {
    return __awaiter(this, void 0, void 0, function () {
        var item;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    item = returnItemFromModal();
                    if (!(item != null)) return [3 /*break*/, 2];
                    return [4 /*yield*/, fetch(mainApiUrl, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(item)
                        })
                            .then(function (x) {
                            if (!x.ok) {
                                throw Error();
                            }
                            else {
                                closeModal();
                                location.reload();
                            }
                        })
                            .catch(function (y) {
                            alert("Houve algum erro. Por favor, verifique se o título está devidamente preenchido ou se não é muito grande.");
                        })];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
getAllItems();
//# sourceMappingURL=index.js.map