
// criação de um array para armazenar as tarefas

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

// Função para limpar o formulário
function limparFormulario(){
    $('#titulo').val("");
    $('#descricao').val("");
    $('#prioridade').val("Baixa");
    $('#estado').val("Por Fazer")

}

// Função para ativar o recurso de arrastar e soltar (sortable) nas colunas de tarefas
function ativarSortable(){

    $("#por-fazer, #em-progresso, #concluidas").sortable({
        connectWith: "#por-fazer, #em-progresso, #concluidas",
        placeholder: "placeholder",
        stop: function(event, ui){
            const id = ui.item.data('id');
            const novaColuna = ui.item.parent().attr('id');

            let novoEstado;
            if(novaColuna === 'por-fazer'){
                novoEstado = 'Por Fazer';
            }else if(novaColuna === 'em-progresso'){
                novoEstado = 'Em progresso';
            }else if(novaColuna === 'concluidas'){
                novoEstado = 'Concluída';
            }

            const tarefa = tarefas.find(function(tarefa){
                return tarefa.id === id;
            });

            if(!tarefa){
                return;
            }

            tarefa.estado = novoEstado;
    
            salvarTarefas();
            
            renderizarTarefas(tarefas);
        }

  
    }).disableSelection();

}


// Função para salvar as tarefas no localStorage
function salvarTarefas(){
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

$('form').on('submit', function(event){

    
    event.preventDefault();
    const titulo = $('#titulo').val();

    const descricao = $('#descricao').val();

    const prioridade = $('#prioridade').val();

    const estado = $('#estado').val()
    
    let formularioValido = true;


    if(titulo.trim() === ""){
        $('#avisoTitulo').css('display', 'block');
        formularioValido = false
    }
    
    if(descricao.trim() === ""){
        $('#avisoDescricao').css('display', 'block');
        formularioValido = false;
    }
    
    if(formularioValido === false){
        return;
    }


   
    
    const tarefa = {
        id: Date.now(),
        titulo,
        descricao,
        prioridade,
        estado
                
    }
    tarefas.push(tarefa)

    
    
    limparFormulario()
    salvarTarefas()
    renderizarTarefas(tarefas);
    
})


// Função para remover os avisos de validação do título quando o usuário começa a digitar
$('#titulo').on('input', function(){
    if($(this).val().trim() !== ""){

        $('#avisoTitulo').css('display', 'none');
    }
})

// Função para remover os avisos de validação da descrição quando o usuário começa a digitar
$('#descricao').on('input', function(){
    if($(this).val().trim() !== ""){

        $('#avisoDescricao').css('display', 'none');
    }
})

// Função para renderizar as tarefas na tela

function renderizarTarefas(lista){
    $('#por-fazer').empty()
    $('#em-progresso').empty()
    $('#concluidas').empty()
    lista.forEach(function(tarefa){
        let card = $(`<div class="card" data-id="${tarefa.id}"> </div>`);
        card.append(`<h3>${tarefa.titulo}</h3>`)
        card.append(`<p class= "desc">${tarefa.descricao}</p>`)
        card.append(`<p class="prioridade" data-prioridade="${tarefa.prioridade}">
            Prioridade: ${tarefa.prioridade}
        </p>`)
        card.append(`<P>Estado:${tarefa.estado}</P>`)

        card.append(`<button class="editar" data-id=${tarefa.id}>Editar</button>`)

        
        if(tarefa.estado === 'Por Fazer'){
            
            $('#por-fazer').append(card)
        }else if(tarefa.estado === 'Em progresso'){
            
            $('#em-progresso').append(card)
        }else{
            
            $('#concluidas').append(card)
        }
    });    
    
    ativarSortable();
    
}

// Renderizar as tarefas ao carregar a página
renderizarTarefas(tarefas)


// Funções para apagar tarefas

$(document).on('dblclick', '.card', function(event){
    if($(event.target).is('input, select, button')){
        return;
    }

    $(this).fadeOut(300, function(){
   
        const id = $(this).data('id');
    
        tarefas = tarefas.filter(function(tarefa){
            return tarefa.id !== id;
        });
    
        salvarTarefas();
        renderizarTarefas(tarefas);
    });
});


// Funções para editar tarefas

$(document).on('click', '.editar', function(){
    const card = $(this).closest('.card');

    const titulo = card.find('h3').text();
    const descricao = card.find('.desc').text();
    const prioridade = card.find('.prioridade').data('prioridade');

    card.find('h3').replaceWith(
        `<input type="text" class="editar-titulo aviso emEdicao" value="${titulo}">`
    );
    card.find('.desc').replaceWith(
        `<input type="text" class="editar-descricao aviso emEdicao"  value="${descricao}">`
    );

    card.find('.prioridade').replaceWith(
        `<select class="editar-prioridade emEdicao">
            <option value="Baixa" ${prioridade === 'Baixa' ? 'selected' : ''}>Baixa</option>
            <option value="Média" ${prioridade === 'Média' ? 'selected' : ''}>Média</option>
            <option value="Alta" ${prioridade ==='Alta' ? 'selected' : ''}>Alta</option>
        </select>`
    );

    $(this)
    .text('Concluir')
    .removeClass('editar')
    .addClass('concluir-edicao');

});


// Função para concluir a edição da tarefa

$(document).on('click', '.concluir-edicao', function(){
    const card = $(this).closest('.card');
    const id = card.data('id');
    const novoTitulo = card.find('.editar-titulo').val();
    const novaDescricao = card.find('.editar-descricao').val();
    const novaPrioridade = card.find('.editar-prioridade').val();
    const tarefa = tarefas.find(function(tarefa){
        return tarefa.id === id;
    })
    let edicaoValida = true;

    if(novoTitulo.trim() === ''){
        card.find('.editar-titulo').css('border', '1px solid red');
        edicaoValida = false
        
    }if(novaDescricao.trim() === ''){
        card.find('.editar-descricao').css('border', '1px solid red');
        edicaoValida = false
        
    }

    if(edicaoValida === false){
        return;
    }

        
        
    tarefa.titulo = novoTitulo
    tarefa.descricao = novaDescricao
    tarefa.prioridade = novaPrioridade
    salvarTarefas();
    renderizarTarefas(tarefas);
    
})



// Função para pesquisar tarefas
$('#pesquisa').on('input', function(){
    let pesquisa = $(this).val();
    let tarefasFiltradas = tarefas.filter(function(tarefa){
        return tarefa.titulo
        .toLowerCase()
        .includes(pesquisa.toLowerCase());
            
    });

    renderizarTarefas(tarefasFiltradas);
});
