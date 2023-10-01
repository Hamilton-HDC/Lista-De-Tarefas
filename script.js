document.addEventListener("DOMContentLoaded", function () {
    let listElement = document.querySelector("#app ul");
    let inputElement = document.querySelector("#app input");
    let buttonElement = document.querySelector("#app button");

    let tarefas = JSON.parse(localStorage.getItem("@listaDeTarefas")) || [];

    function renderTarefas() {
        listElement.innerHTML = "";

        tarefas.forEach((nova, posicao) => {
            let liElement = document.createElement("li");
            let tarefaText = document.createTextNode(nova);

            let linkElement = document.createElement("a");
            linkElement.setAttribute("href", "#");

            let linkText = document.createTextNode(" Excluir");
            linkElement.appendChild(linkText);

            linkElement.addEventListener("click", () => deletarTarefa(posicao));

            liElement.appendChild(tarefaText);
            liElement.appendChild(linkElement);
            listElement.appendChild(liElement);
        });
    }

    function addTarefas() {
        if (inputElement.value.trim() === "") {
            alert("Digite alguma tarefa");
        } else {
            let novaTarefa = inputElement.value;
            tarefas.push(novaTarefa);
            inputElement.value = '';

            renderTarefas();
            salvarDados();
        }
    }

    function deletarTarefa(posicao) {
        tarefas.splice(posicao, 1);
        renderTarefas();
        salvarDados();
    }

    function salvarDados() {
        localStorage.setItem('@listaDeTarefas', JSON.stringify(tarefas));
    }

    renderTarefas();

    buttonElement.addEventListener("click", addTarefas);

    inputElement.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            addTarefas();
        }
    });
});
