function acessarAPI(url) {
    let requisicao = new XMLHttpRequest();
    requisicao.open("GET", url, false);
    requisicao.send();
    return requisicao.responseText;
}

function initialize(){
    carregarPortos();
    carregarPesagens();
}

function carregarPesagens(){
    let selectBox = document.getElementById("portoSelect");
    let dados = acessarAPI(`http://balancaunama.herokuapp.com/pesagens/porto/${selectBox.options[selectBox.selectedIndex].value}`);
    let pesagens = JSON.parse(dados);
    let pesoBruto = 0;
    let pesoLiquido = 0;
    divPesagem = "";
    pesagens.forEach(e => {
        divPesagem += '<tr>'
        divPesagem += '<td>' + e.id +'</td>'
        divPesagem += '<td>' + e.primeiraPesagem +'</td>'
        divPesagem += '<td>' + e.segundaPesagem +'</td>'
        divPesagem += '<td>' + e.dataPrimeiraPesagem +'</td>'
        divPesagem += '<td>' + e.dataSegundaPesagem +'</td>'
        divPesagem += '<td>' + e.autorizacao.id +'</td>'
        divPesagem += '<td>' + e.veiculo.placa +'</td>'
        divPesagem += '</tr>'
        pesoBruto += e.primeiraPesagem + e.segundaPesagem;
        pesoLiquido += e.primeiraPesagem - e.segundaPesagem;

    });
    document.getElementById("pesagens").innerHTML = divPesagem;
    document.getElementById("pesagensDiarias").innerHTML = pesagens.length
    document.getElementById("PesoBruto").innerHTML = pesoBruto;
    document.getElementById("PesoLiquido").innerHTML = pesoLiquido;
}

function carregarDadosAPI() {
    let dados = acessarAPI(
        "https://balancaunama.herokuapp.com/peso/last");
    let peso = JSON.parse(dados);
    divDados = '';
        divDados += '<div class="card">';
        divDados += '<div class="container">';
        divDados += '<h4>';
        divDados += '<b>ID ' + peso.id + '</b>';
        divDados += '</h4>';
        divDados += '<p>dataPesagem: ' + peso.dataPesagem + '</p>';
        divDados += '<p>peso: ' + peso.peso + '</p>';
        divDados += '</div></div>';
    document.getElementById("dados").innerHTML = 
            divDados;
} 


function carregarPortos(){
    let dados = acessarAPI('http://balancaunama.herokuapp.com/portos');

    let portos = JSON.parse(dados);

    let selectBox = document.querySelector("#portoSelect");

    portos.forEach(element => {
        selectBox.options[selectBox.options.length] = new Option(element.descricao, element.id);
    });
}