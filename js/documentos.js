function search(){
    var cpf = document.getElementById('inputCPF').value;
    validation(cpf);
}
function validation(cpfValue){
    var storage = firebase.storage();
    //Retorna uma promisse que será processada
    var resultado = storage.ref().child(cpfValue).listAll().then(function(todosArquivos){
        if(todosArquivos.items.length >= 1){
            next(cpfValue);
        } else {
            alert('CPF Não Cadastrado');
        }
        
    })
    .catch(function(error){
        console.log('Erro', error);
    });
}
function next(cpfValue){
    document.getElementById('busca').setAttribute("class", "ocultar");
    document.getElementById('resultado').removeAttribute("class", "ocultar");
    document.getElementById('tituloDocumentos').innerHTML = 'Certificados de: '+cpfValue;
}
function back(){
    document.getElementById('busca').removeAttribute("class", "ocultar");
    document.getElementById('resultado').setAttribute("class", "ocultar");
    document.getElementById('inputCPF').value = '';
}

