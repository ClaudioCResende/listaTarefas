const inputTarefa = document.querySelector('#texto');
const inputBtn = document.querySelector('.btn__add');
const listaTarefas = document.querySelector('ul');

inputBtn.addEventListener('click', ()=>{
    if(!inputTarefa.value) return;
    criarTarefa(inputTarefa.value);
})

inputTarefa.addEventListener('keypress', (e)=> {
    if(e.keyCode === 13){
        if(!inputTarefa.value) return;
        criarTarefa(inputTarefa.value);
        
    }
})

document.addEventListener('click', (e)=> {
    const elemento = e.target;
    if(elemento.classList.contains('apagarTarefa')){
        elemento.parentElement.remove();
        salvarTarefas();
    }
})

function criaLi(){
    const li = document.createElement('li');
    return li;
}

function criarTarefa(inputTarefas){
    let li = criaLi();
    li.innerText = inputTarefas;
    listaTarefas.appendChild(li);
    limpaInput();
    criaBtnApagar(li);
    salvarTarefas();
}

function limpaInput(){
    inputTarefa.value = '';
    inputTarefa.focus();
}

function criaBtnApagar(li){
    const btnApagar = document.createElement('button');
    btnApagar.innerText = 'Apagar';
    btnApagar.setAttribute('class', 'apagarTarefa');
    li.appendChild(btnApagar);
}

function salvarTarefas(){
    const tarefas = listaTarefas.querySelectorAll('li');
    const listaDeTarefas = [ ];
    for ( let tarefa of tarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', ' ').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON)
}

function carregarTarefas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
    console.log(tarefas)
    for ( let tarefa of listaDeTarefas ){
        criarTarefa(tarefa);
        console.log(tarefa)
    }
}

carregarTarefas();





