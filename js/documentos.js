function search(){
    var cpf = document.getElementById('inputCPF').value;
    validation(cpf);
}
function validation(cpfValue){
    var storage = firebase.storage();
    //Retorna uma promisse que será processada
    var resultado = storage.ref().child(cpfValue).listAll().then(function(todosArquivos){
        if(todosArquivos.items.length >= 1){
            listFiles(cpfValue);
            next(cpfValue);
        } else {
            alert('CPF Não Cadastrado');
        }
        
    })
    .catch(function(error){
        console.log('Erro', error);
    });
}
function listFiles(cpfValue){
    document.getElementById('tituloDocumentos').innerHTML = 'Certificados de: '+cpfValue;
    var storage = firebase.storage();
    var arquivos;
    var nomeArquivos = [];
    var linksArquivos = [];
    storage.ref().child(cpfValue).listAll().then(function(todosArquivos){
        arquivos = todosArquivos.items;
        console.log(arquivos);
        for(let i=0; i<arquivos.length; i++){
            nomeArquivos.push(arquivos[i].name);
            storage.ref(cpfValue+'/'+nomeArquivos[i]).getDownloadURL().then(function(url){
                console.log(url);
                var ul = document.getElementById("list");
                var li = document.createElement("li");
                var listItem = '<li><a href="'+url+'" target="_blank">"'+nomeArquivos[i]+'"</a></li>';
                li.innerHTML = listItem;
                ul.appendChild(li);
                linksArquivos.push(url);
                
            }).catch(function(error){
                console.log(error);
            });
        }
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

