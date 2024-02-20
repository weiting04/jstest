let listState = [];
const STATE_KEY = "todo-list";
function loadState() {
  const listState = localStorage.getItem(STATE_KEY);
  if (listState !== null) {
    return JSON.parse(listState);
  }
  return [];
}
function saveState(list) {
  localStorage.setItem(STATE_KEY, JSON.stringify(list));
}
function initList() {
  listState = loadState();
  const ul = document.getElementById("list");
  for (const item of listState) {
    const li = document.createElement("li");
    li.innerText = item.text;
    const deletebtn = document.createElement("span");
    deletebtn.classList.add("delete");
    deletebtn.onclick = deleteitem;
    li.appendChild(deletebtn);
    li.classList.add("item");
    if (item.checked) {
      li.classList.add("checked");
    }
    li.onclick = checkitem;
    ul.appendChild(li);
  }
}
function addItem() {
  const input = document.getElementById("input");
  const text = input.value;
  const ul = document.getElementById("list");
  if (text !== "") {
    const newitem = document.createElement("li");
    newitem.classList.add("item");
    newitem.innerHTML = text;
    const deletebtn = document.createElement("span");
    deletebtn.classList.add("delete");
    deletebtn.onclick = deleteitem;
    newitem.appendChild(deletebtn);
    newitem.onclick = checkitem;
    ul.appendChild(newitem);
    input.value = "";
    listState.push({
      text,
      checked: false,
    });
    saveState(listState);
  } else alert("請輸入內容");
  return;
}
function deleteitem(e) {
  const item = e.target.parentNode;
  const parent = item.parentNode;
  const idx = Array.from(parent.childNodes).indexOf(item);
  listState = listState.filter((e, i) => i !== idx);
  saveState(listState);
  parent.removeChild(item);
  e.stopPropagation();
}
function checkitem() {
  const item = this;
  const parent = item.parentNode;
  const idx = Array.from(parent.childNodes).indexOf(item);
  listState[idx].checked = !listState[idx].checked;
  item.classList.toggle("checked");
  saveState(listState);
}
initList();
const addbtn = document.getElementById("add-btn");
addbtn.onclick = addItem;
const form = document.getElementById("input-wrapper");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});
