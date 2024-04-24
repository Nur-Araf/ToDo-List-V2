let first = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
  
renderTodo();

function renderTodo() {
    let renderHTML = ``;

    first.forEach(function(todoObj,index) {
        const { name, date } = todoObj;

        const html = `
        <p class="bg-slate-400 px-2 py-1 rounded text-lg font-normal w-auto mt-4 hover:shadow-lg hover:shadow-black shadow shadow-black border-[4px] border-[#F3EAD3]">${name}</p>
        <p class="bg-slate-400 px-2 py-1 rounded text-lg font-normal mt-4 hover:shadow-lg hover:shadow-black shadow shadow-black border-[4px] border-[#F3EAD3]">${date}</p>
        <button class="bg-slate-400 px-2 rounded py-1 text-xl font-medium w-[110px] mt-4 hover:shadow-lg hover:shadow-black shadow shadow-black border-[4px] border-[#F3EAD3]"
        onclick="first.splice(${index}, 1); renderTodo()">Remove</button>
        `;

        renderHTML += html;
    });
    document.getElementById(`js_todo`).innerHTML = renderHTML;

}



function addTodo() {
    const input = document.getElementById(`js-name`);
    const name = input.value;
    const inputDate = document.getElementById(`js-date`);
    const date = inputDate.value;
        //  throw an error
    if (name.trim() === '' || date.trim() === '') {
        const alertDiv = document.getElementById(`js-alert`);
        alertDiv.classList.remove("translate-x-full");
        alertDiv.classList.add("translate-x-0");
        const okBtn = document.getElementById(`js-ok`);

         // Define a function to close the error message
        function closeError() {
            alertDiv.classList.remove("translate-x-0");
            alertDiv.classList.add("translate-x-full");
        }

        // Attach an event listener to the OK button
        okBtn.addEventListener('click', closeError);
        return; 
    }


    first.push({
        name,
        date
    })
    input.value = ``;
    inputDate.value = ``;
    renderTodo();
    saveToLocalStorage();
    reloadPage();
}

       // button for Search
const searchInput = document.getElementById(`js-search`);
const searchBtn = document.getElementById(`js-search-btn`);

searchBtn.addEventListener(`click`, () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredTodos = first.filter(todo => todo.name.toLowerCase().includes(searchTerm));
    renderTodoList(filteredTodos);
});

function renderTodoList(todos) {
    let renderHTML = ``;

    todos.forEach(todoObj => {
        const { name, date } = todoObj;

        const html = `
            <p class="bg-slate-400 px-2 py-1 rounded text-lg font-normal w-auto mt-4 hover:shadow-lg hover:shadow-black shadow shadow-black border-[4px] border-[#F3EAD3]">${name}</p>
            <p class="bg-slate-400 px-2 py-1 rounded text-lg font-normal mt-4 hover:shadow-lg hover:shadow-black shadow shadow-black border-[4px] border-[#F3EAD3]">${date}</p>
            <button class="bg-slate-400 px-2 rounded py-1 text-xl font-medium w-[110px] mt-4 hover:shadow-lg hover:shadow-black shadow shadow-black border-[4px] border-[#F3EAD3]" onclick="removeTodo('${name}')">Remove</button>
        `;

        renderHTML += html;
    });
    document.getElementById(`js_todo`).innerHTML = renderHTML;
}

function removeTodo(name) {
    const index = first.findIndex(todo => todo.name === name);
    if (index !== -1) {
        first.splice(index, 1);
        renderTodoList(first);
        saveToLocalStorage();
        reloadPage();
    }
}
//    set at Local storage
function saveToLocalStorage() {
    localStorage.setItem('items', JSON.stringify(first));
}

// ok click page reload
const okBtn = document.getElementById(`js-ok-btn`);

okBtn.addEventListener(`click`, () => {
    reloadPage();
})

function reloadPage() {
    window.location.reload();
}