var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function(event){
    event.preventDefault();

    var form = document.querySelector("#form-adiciona");
   
    var paciente = obtemPacienteDoForm(form);
    
    var erros = validaPaciente(paciente);

    if(erros.length > 0){
        exibeMensagensDeErro(erros);

        return;
    }

    adicionaPacienteNatabela(paciente);

    form.reset();
    var MensagensDeErro = document.querySelector("#mensagens-erro");
    MensagensDeErro.innerHTML = "";
})

function adicionaPacienteNatabela(paciente){
    var pacienteTr = montaTr(paciente);
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);
}

function exibeMensagensDeErro (erros) {
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = "";
    erros.forEach(function(erro){
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    })
}

function obtemPacienteDoForm(form){
    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }
    return paciente;
}

function montaTr(paciente){
    var pacienteTr = document.createElement("tr");

    pacienteTr.classList.add("paciente");

    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "infor-imc"));
    
    return pacienteTr;
}
function montaTd (dado,classe) {
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);

    return td;
}

function validaPaciente (paciente){

    var erros = [];

    if(paciente.nome.length == 0){
        erros.push("Nome n??o pode ser em branco")
    }

    if(!validaPeso(paciente.peso)){
        erros.push("Peso ?? inv??lido");
    }

    if(!validaAltura(paciente.altura)){
        erros.push("Altura ?? inv??lida");
    }

    if(paciente.gordura.length == 0){
        erros.push("Gordura n??o pode ser em branco")
    }
    if(paciente.peso.length == 0){
        erros.push("Peso n??o pode ser em branco")
    }
    if(paciente.altura.length == 0){
        erros.push("Altura n??o pode ser em branco")
    }
    return erros;
}