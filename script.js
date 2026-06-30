// ============================
// VARIÁVEIS GERAIS
// ============================


let cena = 1;


// pontuação das dicas do caso 1
let dicasUsadas = 0;
let dicasAbertas = [];


// controle de qual caso abrir
let proximoCasoAtual = 2;




// ============================
// NOVA INVESTIGAÇÃO
// BOTÃO INICIAL
// ============================


function novaInvestigacao(){


// tira qualquer janela perdida

let caixa=document.getElementById("janelaJogo");


if(caixa){

caixa.remove();

}



// fecha tela inicial

document.getElementById("telaInicial").style.display="none";



// abre cadastro da equipe

document.getElementById("cadastro").style.display="flex";



}

// ============================
// CADASTRAR EQUIPE
// ============================


function liberarArquivos(){


let nome = document.getElementById("nomeEquipe").value;


let turma = document.getElementById("turma").value;



let equipe={


nome:nome,


turma:turma,


pontos:0


};



localStorage.setItem(

"equipeAtual",

JSON.stringify(equipe)

);



document.getElementById("cadastro").style.display="none";


iniciarHistoria();



}









// ============================
// HISTÓRIA ANIMADA
// ============================


function iniciarHistoria(){


cena=1;


document.getElementById("telaInicial").style.display="none";

document.getElementById("cadastro").style.display="none";


let tela=document.getElementById("historia");


tela.style.display="block";

tela.style.backgroundImage="url('imagem1.png')";


}


// ============================
// FINAL DA HISTÓRIA
// ============================


function escolherCaso(){

document.getElementById("historia").style.display="none";

document.getElementById("telaInvestigacoes").style.display="block";

}

function avancarHistoria(){


let tela=document.getElementById("historia");


if(cena==1){


cena=2;

tela.style.backgroundImage="url('imagem2.png')";

return;

}


if(cena==2){


cena=3;

tela.style.backgroundImage="url('imagem3.png')";

return;

}


if(cena==3){


tela.style.display="none";

document.getElementById("telaInvestigacoes").style.display="block";


}


}
// ============================
// ABRIR CASO 1
// ============================


function abrirCaso1(){


// fecha tela das investigações

document.getElementById("telaInvestigacoes").style.display="none";


// garante que outras telas sumam

document.getElementById("historia").style.display="none";

document.getElementById("avisoEquipe").style.display="none";


// abre investigação 1

document.getElementById("caso1").style.display="block";


}






// ============================
// ABRIR FOLHA 1
// ============================


function abrirFolha1(){



document.getElementById("caso1").style.display="none";


document.getElementById("folha1").style.display="block";



}










// ============================
// DICAS DO CASO 1
// ============================


let dicas=[


"O primeiro registro encontrado possui 1 elemento.",


"Os primeiros valores encontrados foram:<br><br>1, 4, 9, 16, 25...",


"Está relacionado com uma figura geométrica.",


"Pode representar uma medida de área.",


"Os registros podem ser organizados formando quadrados.<br><img src='quadrados.jpg' class='imagemDica'>",


"Para passar de uma figura para a próxima, novos elementos são acrescentados ao redor da figura anterior.",


"A quantidade acrescentada segue uma sequência de números ímpares.",


"A quantidade acrescentada na etapa n pode ser representada por:<br><br>2n + 1",


"Cada termo pode ser escrito como uma potência.",


"A expressão geral depende apenas da posição n."


];



function abrirDica(numero){



// não deixa repetir dica

if(dicasAbertas.includes(numero)){


return;


}





dicasAbertas.push(numero);




document.getElementById("listaDicas").innerHTML +=


"<li>"+ dicas[numero] +"</li>";





dicasUsadas++;





document.getElementById("pontuacao").innerHTML =


"Pontuação: " + (11-dicasUsadas);






let botoes = document.querySelectorAll(

"#menuDicas button"

);




botoes[numero].style.background="black";


botoes[numero].style.color="white";


botoes[numero].disabled=true;


if(dicasUsadas==10){


setTimeout(()=>{


mostrarPerguntaFinal();


},800);


}

}










// ============================
// VERIFICAR RESPOSTA
// ============================


function verificarResposta(){



let resp =

document.getElementById("resposta").value;



resp = resp.replace(/\s/g,"").toLowerCase();





// ACERTOU

if(

resp=="n^2" ||

resp=="n²" ||

resp=="nxn" ||

resp=="n.n" ||

resp=="an=n^2" ||

resp=="a_n=n^2"

){



let equipe = JSON.parse(

localStorage.getItem("equipeAtual")

);



let pontosCaso = 11-dicasUsadas;



equipe.pontos += pontosCaso;



localStorage.setItem(

"equipeAtual",

JSON.stringify(equipe)

);




mostrarMensagem(

"🎉 Parabéns, investigadores!",

"Temos um padrão!<br><br>"+

"Equipe <b>"+equipe.nome+"</b><br>"+
"ganhou <b>"+pontosCaso+"</b> pontos neste caso.",

"VALIDAR PRIMEIRA EVIDÊNCIA",

"clicarMensagem()"

);


}





// ERROU MAS TEM DICAS

else if(dicasUsadas<10){



mostrarMensagem(


"🕵️ Continue investigando",

"O padrão ainda não foi encontrado.<br><br>"+
"Pegue outra evidência!",

"OK",

"this.parentElement.remove()"


);



}





// ERROU NO FINAL

else{



mostrarMensagem(


"📂 Caso encerrado",


"Não existem mais evidências disponíveis.<br><br>"+


"O padrão correto era:<br><br>"+


"<b>aₙ = n²</b><br><br>"+


"Pois cada termo representa um número multiplicado por ele mesmo:<br>"+


"1²=1, 2²=4, 3²=9, 4²=16...",



"VALIDAR PRIMEIRA EVIDÊNCIA",

"acaoMensagem()"

);



}

}

// ============================
// BOTÃO VALIDAR PRIMEIRA EVIDÊNCIA
// ABRE O CASO BASE
// ============================


function acaoMensagem(){


// remove a janela da mensagem

let caixa = document.getElementById("janelaJogo");


if(caixa){

caixa.remove();

}



// fecha folha das pistas

document.getElementById("folha1").style.display="none";



// abre validação do caso base

document.getElementById("casoBase").style.display="block";


}

function abrirCasoBase(){


document.getElementById("folha1").style.display="none";


document.getElementById("casoBase").style.display="block";


}
function responderCasoBase(resposta){


if(resposta){


let caixa = document.createElement("div");

caixa.id="janelaJogo";

caixa.innerHTML=

"<h1>🔎 Evidência confirmada!</h1>"+

"<p>"+
"Parabéns, investigadores!<br><br>"+
"O caso base foi validado.<br>"+
"A fórmula funciona para n = 1.<br><br>"+
"Agora vamos para o desafio final:<br>"+
"<b>Passo Indutivo</b>"+
"</p>"+

"<button onclick='abrirPassoIndutivo()'>"+
"CONTINUAR INVESTIGAÇÃO"+
"</button>";


document.body.appendChild(caixa);


}


else{


let caixa = document.createElement("div");

caixa.id="janelaJogo";

caixa.innerHTML=

"<h1>⚠️ Revise sua análise</h1>"+

"<p>"+
"Observe:<br><br>"+
"aₙ = n²<br>"+
"a₁ = 1²<br>"+
"a₁ = 1<br><br>"+
"Como o primeiro registro possui 1 elemento,<br>"+
"o Caso Base foi confirmado."+
"</p>"+

"<button onclick='abrirPassoIndutivo()'>"+
"ENTENDI"+
"</button>";


document.body.appendChild(caixa);


}


}function clicarMensagem(){

let caixa = document.getElementById("janelaJogo");

if(caixa){
caixa.remove();
}


document.getElementById("folha1").style.display="none";

document.getElementById("casoBase").style.display="block";


}
let dicaInducaoUsada=false;


function mostrarDicaInducao(){


if(dicaInducaoUsada){
return;
}


dicaInducaoUsada=true;


// tira 1 ponto da equipe

let equipe = JSON.parse(
localStorage.getItem("equipeAtual")
);


equipe.pontos = equipe.pontos - 1;


localStorage.setItem(
"equipeAtual",
JSON.stringify(equipe)
);



// cria janela da dica

let caixa = document.createElement("div");


caixa.id="janelaJogo";


caixa.innerHTML=

"<h1>🔍 Dica do Investigador</h1>"+

"<p>"+

"Para achar o próximo termo basta somar "+
"<b>2n + 1</b> ao termo anterior.<br><br>"+

"Ou seja:<br><br>"+

"<b>aₙ₊₁ = aₙ + 2n + 1</b><br><br>"+

"E você já sabe quem é:<br><br>"+

"<b>aₙ</b> 😉<br><br>"+

"⚠️ A equipe perdeu 1 ponto.<br>"+

"Pontuação atual: "+equipe.pontos+

"</p>"+


"<button onclick='this.parentElement.remove()'>"+
"CONTINUAR INVESTIGAÇÃO"+
"</button>";


document.body.appendChild(caixa);



document.getElementById("btnDicaInducao").innerHTML=
"🔒 Dica usada";


document.getElementById("btnDicaInducao").disabled=true;


}
// ============================
// ABRIR PASSO INDUTIVO CASO 1
// ============================


function abrirPassoIndutivo(){


let caixa = document.getElementById("janelaJogo");


if(caixa){

caixa.remove();

}


document.getElementById("casoBase").style.display="none";


document.getElementById("passoIndutivo").style.display="block";


}







// ============================
// FINALIZAR CASO 1
// ABRE PISTA SECRETA
// ============================


function finalizarCaso(){


document.getElementById("passoIndutivo").style.display="none";


abrirBonus();


}


function encerrarJogo(){


let equipe = JSON.parse(
localStorage.getItem("equipeAtual")
);


let caixa=document.createElement("div");


caixa.id="janelaJogo";


caixa.innerHTML=

"<h1>🏆 Investigação encerrada!</h1>"+

"<p>"+

"Equipe: <b>"+equipe.nome+"</b><br><br>"+

"Pontuação final:<br><br>"+

"<b>"+equipe.pontos+" pontos</b><br><br>"+

"Informe sua pontuação ao professor para o ranking."

+"</p>"+


"<button onclick='fecharJogo()'>"+
"FECHAR"+
"</button>";


document.body.appendChild(caixa);


}



function fecharJogo(){


// fecha mensagem final

let caixa = document.getElementById("janelaJogo");


if(caixa){
caixa.remove();
}


// limpa dados salvos da equipe

localStorage.removeItem("equipeAtual");


// zera variáveis do jogo

cena = 1;

dicasUsadas = 0;

dicasAbertas = [];

dicaInducaoUsada = false;


// limpa campos

document.getElementById("nomeEquipe").value="";

document.getElementById("turma").value="";

document.getElementById("resposta").value="";


// esconde todas as telas

document.getElementById("fimCaso").style.display="none";

document.getElementById("cadastro").style.display="none";

document.getElementById("historia").style.display="none";

document.getElementById("caso1").style.display="none";

document.getElementById("folha1").style.display="none";

document.getElementById("casoBase").style.display="none";

document.getElementById("passoIndutivo").style.display="none";


// volta capa inicial

document.getElementById("telaInicial").style.display="block";


}
// ============================
// DICAS DO CASO 2
// ============================


let dicasCaso2=[

"Os termos começam no número <b>3</b>.",

"A sequência crescente. O terceiro termo é 9.",

"A diferença entre um termo e o próximo é sempre igual.",

"A diferença entre dois termos consecutivos é 3;"
,

"Todos os termos encontrados são divisíveis por 3.",

"A sequência é formada pelos múltiplos de um mesmo número.",

"Os primeiros registros encontrados foram:<br><br><b>3, 6, 9, 12, 15...</b>",

"Esse tipo de sequência é uma <b>progressão aritmética</b>.",

"O termo geral é um múltiplo de 3.",

"A expressão geral envolve multiplicar a posição <b>n</b> por um número fixo."

];


let dicasUsadas2=0;
let dicasAbertas2=[];


function abrirDicaCaso2(numero){


if(dicasAbertas2.includes(numero)){
return;
}


dicasAbertas2.push(numero);


document.getElementById("listaDicas2").innerHTML +=

"<li>"+dicasCaso2[numero]+"</li>";


dicasUsadas2++;


document.getElementById("pontuacao2").innerHTML =

"Pontuação: "+(11-dicasUsadas2);



let botoes=document.querySelectorAll("#menuDicas2 button");


botoes[numero].style.background="black";
botoes[numero].style.color="white";
botoes[numero].disabled=true;


}



// ============================
// RESPOSTA CASO 2
// ============================


function verificarRespostaCaso2(){


let resp=document.getElementById("resposta2").value;


resp=resp.replace(/\s/g,"").toLowerCase();



if(
resp=="3n" ||
resp=="3*n" ||
resp=="3.n" ||
resp=="an=3n" ||
resp=="a_n=3n"
){


let equipe=JSON.parse(
localStorage.getItem("equipeAtual")
);


let pontosCaso=11-dicasUsadas2;


equipe.pontos += pontosCaso;


localStorage.setItem(
"equipeAtual",
JSON.stringify(equipe)
);



mostrarMensagem(

"🎉 Parabéns, investigadores!",

"Temos outro padrão!<br><br>"+
"Vocês descobriram:<br><br>"+
"<b>aₙ = 3n</b><br><br>"+
"Ganharam "+pontosCaso+" pontos.",

"VALIDAR PRIMEIRA EVIDÊNCIA",

"abrirCasoBase2()"

);


}


else if(dicasUsadas2 < 10){


mostrarMensagem(


"🕵️ Continue investigando",


"O padrão ainda não foi encontrado.<br><br>"+
"Pegue outra evidência!",


"OK",


"this.parentElement.remove()"


);


}


// ERROU NO FINAL

else{


mostrarMensagem(


"📂 Caso encerrado",


"Não existem mais evidências disponíveis.<br><br>"+


"O padrão correto era:<br><br>"+


"<b>aₙ = 3n</b><br><br>"+


"Cada termo corresponde ao triplo da posição:<br>"+


"1 → 3<br>"+
"2 → 6<br>"+
"3 → 9<br>"+
"4 → 12...",


"VALIDAR PRIMEIRA EVIDÊNCIA",


"abrirCasoBase2()"


);


}

}




// CASOS ANTIGOS (1,2,3)

function mostrarMensagem(titulo,texto,botao,acao){

let caixa=document.createElement("div");

caixa.id="janelaJogo";


caixa.innerHTML=

"<h1>"+titulo+"</h1>"+

"<p>"+texto+"</p>";


if(botao){

caixa.innerHTML +=

"<button onclick=\"fecharJanelaJogo(); "+acao+"\">"+
botao+
"</button>";

}

else{

caixa.innerHTML +=

"<button onclick='fecharJanelaJogo()'>OK</button>";

}


document.body.appendChild(caixa);


}



function fecharJanelaJogo(){

let janela=document.getElementById("janelaJogo");

if(janela){

janela.remove();

}

}

function abrirCasoBase2(){


let caixa=document.getElementById("janelaJogo");


if(caixa){
caixa.remove();
}


document.getElementById("folha2").style.display="none";


document.getElementById("casoBase2").style.display="block";


}

// ============================
// ABRIR FOLHA CASO 2
// ============================

function abrirFolha2(){


document.getElementById("caso2").style.display="none";


document.getElementById("folha2").style.display="block";


}


// ============================
// CASO BASE 2
// ============================


function responderCasoBase2(resposta){


let caixa=document.createElement("div");


caixa.id="janelaJogo";



if(resposta){


caixa.innerHTML=

"<h1>🔎 Evidência confirmada!</h1>"+

"<p>"+
"Para n=1:<br><br>"+
"a₁ = 3·1<br>"+
"a₁ = 3<br><br>"+
"O caso base foi confirmado!"
+"</p>"+

"<button onclick='abrirPassoIndutivo2()'>CONTINUAR</button>";



}else{


caixa.innerHTML=

"<h1>⚠️ Investigação corrigida</h1>"+

"<p>"+
"A primeira evidencia mostra 3 elementos.<br><br>"+
"Como a1 = 3 * 1 = 3,<br>"+
"o caso base era verdadeiro."
+"</p>"+

"<button onclick='abrirPassoIndutivo2()'>ENTENDI</button>";


}


document.body.appendChild(caixa);


}// ============================
// DICA PASSO INDUTIVO CASO 2
// ============================


let dicaInducao2Usada=false;


function mostrarDicaInducao2(){


if(dicaInducao2Usada){
return;
}


dicaInducao2Usada=true;


// pega equipe

let equipe = JSON.parse(
localStorage.getItem("equipeAtual")
);


// perde 1 ponto

equipe.pontos -= 1;


localStorage.setItem(
"equipeAtual",
JSON.stringify(equipe)
);


// abre janela

let caixa=document.createElement("div");


caixa.id="janelaJogo";


caixa.innerHTML=

"<h1>🔍 Dica do Investigador</h1>"+

"<p>"+

"Para achar o próximo termo é só somar <b>3</b>.<br><br>"+

"Tente colocar o <b>3</b> em evidência e veja o que acontece!<br><br>"+

"⚠️ A equipe perdeu 1 ponto.<br><br>"+

"Pontuação atual: <b>"+equipe.pontos+"</b>"

+"</p>"+


"<button onclick='this.parentElement.remove()'>"+
"CONTINUAR INVESTIGAÇÃO"+
"</button>";


document.body.appendChild(caixa);


// trava botão

document.getElementById("btnDicaInducao2").innerHTML=
"🔒 Dica usada";


document.getElementById("btnDicaInducao2").disabled=true;


}



function abrirPassoIndutivo2(){


let caixa=document.getElementById("janelaJogo");


if(caixa){
caixa.remove();
}


document.getElementById("casoBase2").style.display="none";


document.getElementById("passoIndutivo2").style.display="block";


}
// ============================
// FINALIZAR CASO 2
// ============================


function finalizarCaso2(){


document.getElementById("passoIndutivo2").style.display="none";


document.getElementById("relatorio2").style.display="block";


}
// ============================
// ABRIR CASO 3
// ============================


function abrirCaso3(){


document.getElementById("fimCaso").style.display="none";


document.getElementById("caso3").style.display="block";


}



function abrirFolha3(){


document.getElementById("caso3").style.display="none";


document.getElementById("folha3").style.display="block";


}



// ============================
// DICAS DO CASO 3
// ============================


let dicasCaso3=[

"Termos encontrados:<br><br><b>2, 4, 8, 16...</b>",

"A sequência apresenta um crescimento rápido.",

"Cada termo é o dobro do termo anterior.",

"O próximo termo não é encontrado usando soma.",

"O padrão envolve uma multiplicação repetida.",

"Esse tipo de sequência forma uma progressão geométrica.",

"A razão dessa sequência é <b>2</b>.",

"O termo pode ser escrito como uma potência.",

"A base da potência permanece fixa.",

"O expoente depende da posição <b>n</b>."

];


let dicasUsadas3=0;

let dicasAbertas3=[];



function abrirDicaCaso3(numero){


if(dicasAbertas3.includes(numero)){
return;
}


dicasAbertas3.push(numero);


document.getElementById("listaDicas3").innerHTML +=

"<li>"+dicasCaso3[numero]+"</li>";



dicasUsadas3++;


document.getElementById("pontuacao3").innerHTML=

"Pontuação: "+(11-dicasUsadas3);



let botoes=document.querySelectorAll(

"#menuDicas3 button"

);


botoes[numero].style.background="black";

botoes[numero].style.color="white";

botoes[numero].disabled=true;


}



// ============================
// VERIFICAR RESPOSTA CASO 3
// ============================


function verificarRespostaCaso3(){


let resp=document.getElementById("resposta3").value;


resp=resp.replace(/\s/g,"").toLowerCase();



if(

resp=="2^n" ||

resp=="2ⁿ" ||

resp=="2**n" ||

resp=="an=2^n" ||

resp=="a_n=2^n"

){



let equipe=JSON.parse(

localStorage.getItem("equipeAtual")

);



let pontosCaso=11-dicasUsadas3;



equipe.pontos += pontosCaso;



localStorage.setItem(

"equipeAtual",

JSON.stringify(equipe)

);



mensagemCaso3(

"🎉 Parabéns, investigadores!",

"Vocês descobriram:<br><br>"+

"<b>aₙ = 2ⁿ</b><br><br>"+

"Ganharam "+pontosCaso+" pontos.",

"VALIDAR CASO BASE"

);



}



else if(dicasUsadas3<10){


mensagemErroCaso3();


}



else{


mensagemCaso3(

"📂 Caso encerrado",

"A resposta correta era:<br><br>"+

"<b>aₙ = 2ⁿ</b><br><br>"+

"Cada termo é uma potência de base 2.",

"VALIDAR CASO BASE"

);


}


}





function mensagemErroCaso3(){


let caixa=document.createElement("div");


caixa.id="janelaJogo";


caixa.innerHTML=

"<h1>🕵️ Continue investigando</h1>"+

"<p>O padrão ainda não apareceu.<br><br>"+
"Pegue outra evidência.</p>"+


"<button onclick='this.parentElement.remove()'>OK</button>";



document.body.appendChild(caixa);


}





function mensagemCaso3(titulo,texto,botao){


let caixa=document.createElement("div");


caixa.id="janelaJogo";


caixa.innerHTML=

"<h1>"+titulo+"</h1>"+

"<p>"+texto+"</p>"+


"<button onclick='abrirCasoBase3()'>"+

botao+

"</button>";



document.body.appendChild(caixa);


}





// ============================
// CASO BASE + PASSO INDUTIVO 3
// ============================


function abrirCasoBase3(){


let caixa=document.getElementById("janelaJogo");


if(caixa){
caixa.remove();
}


document.getElementById("folha3").style.display="none";


document.getElementById("casoBase3").style.display="block";


}



// dica final


let dicaInducao3Usada=false;



function mostrarDicaInducao3(){


if(dicaInducao3Usada){
return;
}


dicaInducao3Usada=true;



let equipe=JSON.parse(

localStorage.getItem("equipeAtual")

);


equipe.pontos--;



localStorage.setItem(

"equipeAtual",

JSON.stringify(equipe)

);



let caixa=document.createElement("div");


caixa.id="janelaJogo";


caixa.innerHTML=

"<h1>🔍 Dica do investigador</h1>"+

"<p>"+

"Para achar o termo aₙ₊₁ é só pegar o termo aₙ "+
"e multiplicar por <b>2</b>.<br><br>"+

"Vocês perderam 1 ponto.<br><br>"+

"Pontuação atual: "+equipe.pontos+

"</p>"+


"<button onclick='this.parentElement.remove()'>CONTINUAR</button>";



document.body.appendChild(caixa);



document.getElementById("btnDicaInducao3").innerHTML=

"🔒 Dica usada";


document.getElementById("btnDicaInducao3").disabled=true;


}




// ============================
// FINALIZAR CASO 3
// ============================


function finalizarCaso3(){


proximoCasoAtual=4;


document.getElementById("casoBase3").style.display="none";


document.getElementById("fimCaso").style.display="flex";


}// ============================
// CONTROLE PRÓXIMO CASO
// ============================


function abrirProximoCaso(){


if(proximoCasoAtual==2){

abrirCaso2();

}


if(proximoCasoAtual==3){

abrirCaso3();

}


if(proximoCasoAtual==4){

abrirCaso4();

}


}
// ============================
// VIDEO PISTA SECRETA
// ============================


let cenaBonus = 1;


function abrirBonus(){


let bonus = document.getElementById("bonus");


// abre a tela do vídeo

bonus.style.display = "block";


// garante que os botões começam escondidos

document.getElementById("botoesBonus").style.display = "none";


// sempre começa pela primeira imagem

cenaBonus = 1;


// inicia animação

trocarCenaBonus();


}





function trocarCenaBonus(){


let bonus = document.getElementById("bonus");


// efeito de troca de imagem

bonus.classList.remove("fadeBonus");


void bonus.offsetWidth;


bonus.classList.add("fadeBonus");



// coloca a imagem atual

bonus.style.backgroundImage =

"url('bonus" + cenaBonus + ".png')";




// enquanto não chegou na última imagem

if(cenaBonus < 3){


cenaBonus++;



setTimeout(()=>{


trocarCenaBonus();


},3000);



}



// chegou no bonus3

else{



setTimeout(()=>{


// libera os botões somente agora

document.getElementById("botoesBonus").style.display = "flex";



},800);



}


}


// ============================
// BOTÃO INVESTIGAR BONUS
// ABRE DESAFIO BONUS 4
// ============================


function investigarBonus(){


// fecha tela da pista secreta

document.getElementById("bonus").style.display="none";


// esconde botões

document.getElementById("botoesBonus").style.display="none";


// abre próxima página bonus4

let bonus4=document.getElementById("bonus4");


bonus4.style.display="block";


bonus4.style.backgroundImage="url('bonus4.png')";


}





// ============================
// BOTÃO ARQUIVAR BONUS
// VAI PARA ESCOLHA FINAL
// ============================


function arquivarBonus(){


document.getElementById("bonus").style.display="none";


document.getElementById("botoesBonus").style.display="none";


let relatorio = document.getElementById("relatorio1a");


relatorio.style.display="block";


}
// ============================
// ABRIR BONUS 5
// ABRE AS PERGUNTAS SECRETAS
// ============================


function abrirBonus5(){


// fecha o documento secreto

document.getElementById("bonus4").style.display="none";


// abre a página das perguntas

let tela=document.getElementById("bonus5");


tela.style.display="block";


tela.style.backgroundImage="url('bonus5.png')";


}
// ============================
// BONUS 5 - PERGUNTAS SECRETAS
// ============================


let perguntasRespondidas=0;



function responderBonus(numero,correto){


let equipe=JSON.parse(
localStorage.getItem("equipeAtual")
);



if(correto){


equipe.pontos +=1;


localStorage.setItem(
"equipeAtual",
JSON.stringify(equipe)
);


document.getElementById("retorno"+numero).innerHTML=
"✅ Evidência confirmada! +1 ponto";


}else{


let respostas=[

"",
"A resposta correta era: Número de diagonais do polígono.",

"A resposta correta era n = 3, pois um polígono começa com 3 lados.",

"A indução mostra que se vale para n, também vale para n+1."

];


document.getElementById("retorno"+numero).innerHTML=

"❌ Investigação corrigida<br>"+respostas[numero];


}




let botoes=document.querySelectorAll(

"#questao"+numero+" button"

);


botoes.forEach(botao=>{

botao.disabled=true;

});



perguntasRespondidas++;



if(perguntasRespondidas==3){


document.getElementById("finalBonus").style.display="block";


}



}





function fecharBonus(){


document.getElementById("bonus5").style.display="none";


document.getElementById("relatorio1b").style.display="block";


}
// ============================
// RELATÓRIO CASO 1 → CASO 2
// ============================

function abrirFimCaso(){


document.getElementById("relatorio1a").style.display="none";

document.getElementById("relatorio1b").style.display="none";


// abre diretamente o caso 2

document.getElementById("caso2").style.display="block";


}
// ============================
// VIDEO FINAL
// ============================

let tentativasSenha=0;


function iniciarVideoFinal(){


document.getElementById("relatorio2").style.display="none";


let video=document.getElementById("videoHistoria");

video.style.display="block";
video.style.opacity=1;


video.style.backgroundImage="url('video1.png')";



setTimeout(()=>{


video.style.backgroundImage="url('video2.png')";


},3000);



setTimeout(()=>{


video.style.backgroundImage="url('video3.png')";


document.getElementById("areaSenhaFinal").style.display="block";


},6000);


}






function testarSenhaFinal(){


let senha=document.getElementById("senhaFinal").value;


if(senha=="370"){


document.getElementById("videoHistoria").style.display="none";


document.getElementById("poligonos").style.display="block";


}


else{


tentativasSenha++;


if(tentativasSenha<2){


document.getElementById("erroSenhaFinal").innerHTML=

"❌ Código incorreto. Última tentativa disponível.";


}


else{


document.getElementById("videoHistoria").style.display="none";


document.getElementById("falhou1").style.display="block";


}


}


}
// ============================
// RESETAR JOGO
// ============================

function resetarJogo(){


location.reload();


}
// ============================
// POLÍGONOS FINAL
// ============================


function errarPoligono(){


document.getElementById("poligonos").style.display="none";


document.getElementById("falhou2").style.display="block";


}





function acertarPoligono(){


document.getElementById("poligonos").style.display="none";


let video=document.getElementById("videoRevelacao");


video.style.backgroundImage="url('video4.png')";


video.style.display="block";


cenaFinal=4;


}




let cenaFinal=4;



function passarVideoRevelacao(){


let video=document.getElementById("videoRevelacao");



if(cenaFinal==4){


video.style.backgroundImage="url('video5.png')";

cenaFinal=5;


}


else if(cenaFinal==5){


video.style.backgroundImage="url('video6.png')";

cenaFinal=6;


}



else{


video.style.display="none";


abrirFinal();


}


}




function abrirFinal(){


document.getElementById("fimJogo").style.display="block";


let equipe=JSON.parse(localStorage.getItem("equipeAtual"));


document.getElementById("nomeFinal").innerHTML=
equipe.nome;


document.getElementById("pontosFinal").innerHTML=
equipe.pontos + " pontos";


}
// ============================
// FECHAR JOGO
// ============================

function emConstrucao(){

alert("🚧 Investigação em construção");

}


let investigacaoExtra;
let dicasExtraUsadas = 0;
let dicasExtraAbertas = [];


function abrirInvestigacao4(){


let dados = localStorage.getItem("investigacao4");


if(!dados){

alert("🔒 Nenhuma investigação criada pelo professor.");

return;

}


investigacaoExtra = JSON.parse(dados);


// fecha todas as telas principais

document.getElementById("telaInvestigacoes").style.display="none";

document.getElementById("investigacao2Intro").style.display="none";


// abre a tela do professor

let tela = document.getElementById("extra1");

tela.style.display="block";

tela.style.backgroundImage="url('extra1.png')";


// limpa dados

document.getElementById("listaExtra").innerHTML="";

document.getElementById("respostaExtra").value="";


document.getElementById("pontosExtra").innerHTML=
"Pontuação: 11";


dicasExtraUsadas=0;

dicasExtraAbertas=[];


let botoes =
document.querySelectorAll("#menuExtra button");


botoes.forEach(botao=>{

botao.disabled=false;

botao.style.opacity="1";

});


}

function modoProfessor(){

document.getElementById("janelaSenhaProfessor").style.display="flex";
document.getElementById("senhaProfessorInput").value="";
document.getElementById("erroSenhaProfessor").innerHTML="";

setTimeout(()=>{
document.getElementById("senhaProfessorInput").focus();
},100);

}

function fecharSenhaProfessor(){

document.getElementById("janelaSenhaProfessor").style.display="none";

}

function validarSenhaProfessor(){

let senha=document.getElementById("senhaProfessorInput").value;

if(senha=="1234"){

document.getElementById("janelaSenhaProfessor").style.display="none";
document.getElementById("telaInvestigacoes").style.display="none";
document.getElementById("modoCriacao").style.display="block";

}else{

document.getElementById("erroSenhaProfessor").innerHTML="Senha incorreta.";

}

}async function salvarInvestigacaoProfessor(){

let investigacao = {

criada:true,

titulo:
document.getElementById("novoTitulo").value,

pistas:[

document.getElementById("pista1").value,
document.getElementById("pista2").value,
document.getElementById("pista3").value,
document.getElementById("pista4").value,
document.getElementById("pista5").value,
document.getElementById("pista6").value,
document.getElementById("pista7").value,
document.getElementById("pista8").value,
document.getElementById("pista9").value,
document.getElementById("pista10").value

],

respostas:
document
.getElementById("novasRespostas")
.value
.split(",")
.map(r => r.trim().toLowerCase()),


respostaFinal:
document.getElementById("respostaFinal").value,


mensagemFinal:
document.getElementById("mensagemFinal").value,


dicaIndutiva:
document.getElementById("dicaIndutiva").value

};


// envia para o servidor salvar

localStorage.setItem(
"investigacao4",
JSON.stringify(investigacao)
);


alert("🕵️ Investigação criada com sucesso!");


document.getElementById("modoCriacao").style.display="none";

document.getElementById("telaInvestigacoes").style.display="block";


}
function abrirDicaExtra(numero){


// se já abriu essa pista

if(dicasExtraAbertas.includes(numero)){

return;

}


// marca usada

dicasExtraAbertas.push(numero);


// perde ponto

dicasExtraUsadas++;

let pontos = 11 - dicasExtraUsadas;

document.getElementById("pontosExtra").innerHTML =
"Pontuação: " + pontos;


// mostra a pista

let lista = document.getElementById("listaExtra");


let item = document.createElement("li");

item.innerHTML =
investigacaoExtra.pistas[numero];


lista.appendChild(item);


// bloqueia botão

let botoes =
document.querySelectorAll("#menuExtra button");


botoes[numero].disabled=true;

botoes[numero].style.opacity="0.4";




}
function verificarRespostaExtra(){


let respostaAluno =
document.getElementById("respostaExtra")
.value
.trim()
.toLowerCase();


// acertou

if(investigacaoExtra.respostas.includes(respostaAluno)){


mostrarMensagem(
"🎉 Caso solucionado!",
investigacaoExtra.mensagemFinal,
"Continuar",
"abrirExtra2()"
);


return;

}


// errou e ainda existem pistas

if(dicasExtraUsadas < 10){


mostrarMensagem(
"🔎 Continue investigando",
"O padrão ainda não foi encontrado.<br><br>Procure novas evidências e tente novamente!"
);


document.getElementById("respostaExtra").value="";


return;

}



// errou depois de usar todas as pistas

mostrarMensagem(

"📂 Mistério revelado!",

"Vocês analisaram todas as evidências disponíveis.<br><br>" +

"O padrão correto era:<br><br><b>" +

investigacaoExtra.respostaFinal +

"</b>",

"Continuar",

"abrirExtra2()"

);


}

function abrirExtra2(){


document.getElementById("extra1").style.display="none";


document.getElementById("extra2").style.display="block";


document.getElementById("mensagemExtra2").innerHTML =
investigacaoExtra.mensagemFinal;


}


let proximaTela = "";


function fecharMensagem(){

document.getElementById("mensagemJogo").style.display="none";


if(proximaTela=="extra2"){

proximaTela="";

abrirExtra2();

}


} 
let dicaIndutivaUsada = false;


function usarDicaIndutiva(){


if(dicaIndutivaUsada){

return;

}


dicaIndutivaUsada = true;


// perde 1 ponto

dicasExtraUsadas++;

let pontos = 11 - dicasExtraUsadas;


document.getElementById("pontosExtra").innerHTML =
"Pontuação: " + pontos;


// mostra dica criada pelo professor

mostrarMensagem(
"💡 Dica do investigador",
investigacaoExtra.dicaIndutiva
);


}



function finalizarExtra(){


// calcula pontos finais

let pontosFinais = 11 - dicasExtraUsadas;


// fecha investigação profunda

document.getElementById("extra2").style.display="none";


// volta para tela das pastas

document.getElementById("telaInvestigacoes").style.display="block";


// mensagem final bonita

mostrarMensagem(

"🏆 Investigação concluída!",

"Excelente trabalho, investigadores!<br><br>" +

"⭐ Pontuação final:<br><br>" +

"<b style='font-size:40px'>" +
pontosFinais +
" pontos</b>"

);


}
function ajustarTela(){


let escala = Math.min(

window.innerWidth / 1920,

window.innerHeight / 1080

);


document.getElementById("jogo").style.transform =
"scale(" + escala + ")";


}


window.addEventListener("resize", ajustarTela);

ajustarTela();

function voltarInvestigacoes(){


document.getElementById("fimJogo").style.display="none";

document.getElementById("telaInvestigacoes").style.display="block";


}
// ============================
// INVESTIGAÇÃO 2 - ABERTURA
// ============================

function abrirInvestigacao2(){

// fecha fantasmas das outras investigações
document.getElementById("fimJogo").style.display="none";
document.getElementById("janelaJogo")?.remove();

document.getElementById("caso1").style.display="none";
document.getElementById("folha1").style.display="none";
document.getElementById("bonus").style.display="none";


document.getElementById("telaInvestigacoes").style.display="none";


let tela=document.getElementById("investigacao2Intro");

tela.style.display="block";


// começa na missão 1

let etapaMissao=1;

tela.style.backgroundImage="url('missao1.png')";


// agora passa somente no clique

tela.onclick=function(){


etapaMissao++;


if(etapaMissao==2){

tela.style.backgroundImage="url('missao2.png')";

}


else if(etapaMissao==3){

tela.style.backgroundImage="url('missao3.png')";

}


else if(etapaMissao==4){

tela.style.backgroundImage="url('missao4.png')";


document.getElementById("testePrimos").style.display="block";


let botao = document.getElementById("confirmarPrimos");

botao.style.display="block";


// tira o clique da tela para não atrapalhar os inputs

tela.onclick=null;

}


}


}function verificarPrimos(){

if(
f1.value=="41" && p1.value=="SIM" &&
f2.value=="43" && p2.value=="SIM" &&
f3.value=="47" && p3.value=="SIM" &&
f4.value=="53" && p4.value=="SIM" &&
f5.value=="61" && p5.value=="SIM"
){

// tira missão 1
document.getElementById("testePrimos").style.display="none";
document.getElementById("confirmarPrimos").style.display="none";


// abre missão 2
document.getElementById("investigacao2Intro").style.backgroundImage=
"url('missao5.png')";


// mostra os quadradinhos da indução
document.getElementById("ordemInducao").style.display="flex";


// libera o botão da indução
document.getElementById("confirmarInducao").style.display="block";



}else{

alert("⚠️ Investigador, verifique novamente os dados do arquivo!");

}

}
function verificarInducao(){

if(
ord1.value=="4" &&
ord2.value=="2" &&
ord3.value=="3" &&
ord4.value=="5" &&
ord5.value=="1"
){

document.getElementById("ordemInducao").style.display="none";

document.getElementById("confirmarInducao").style.display="none";


document.getElementById("investigacao2Intro").style.backgroundImage =
"url('missao6.png')";


// espera um pouco antes de liberar o clique
setTimeout(()=>{

document.getElementById("investigacao2Intro").onclick = abrirMissao7;

},1500);
}else{

alert("⚠️ Revise a ordem do passo indutivo, investigador!");

}

}
function abrirMissao7(){

document.getElementById("investigacao2Intro").style.backgroundImage =
"url('missao7.png')";


document.getElementById("investigacao2Intro").onclick = ()=>{

document.getElementById("investigacao2Intro").style.backgroundImage =
"url('missao8.png')";


document.getElementById("desbloquearSistema").style.display="block";

iniciarTimerMissao8();


document.getElementById("investigacao2Intro").onclick=null;

}

}
function verificarSistema(){

let resposta = document.getElementById("codigoSistema").value;

resposta = resposta.replace(/\s/g,"").toLowerCase();


if(resposta=="2n+2" || resposta=="2*n+2"){

// tira apenas o campo de resposta
document.getElementById("desbloquearSistema").style.display="none";


// continua usando a mesma tela
let tela=document.getElementById("investigacao2Intro");


// abre a próxima missão
tela.style.backgroundImage="url('missao9.png')";
document.getElementById("missao9Teste").style.display="block";

// mantém cronômetro rodando
document.getElementById("timerMissao8").style.display="block";


// tira clique antigo se existir
tela.onclick=null;


}else{


alert("⚠️ Código incorreto!\n\nAnalise novamente o padrão encontrado.");

}

}
let tempoMissao8;
let intervaloMissao8;


function iniciarTimerMissao8(){

tempoMissao8 = 600;


document.getElementById("timerMissao8").style.display="block";


intervaloMissao8=setInterval(()=>{


let minutos = Math.floor(tempoMissao8/60);

let segundos = tempoMissao8%60;


document.getElementById("timerMissao8").innerHTML =
"0"+minutos+":"+(segundos<10?"0":"")+segundos;


tempoMissao8--;


if(tempoMissao8 < 0){

    abrirTempo1();

    return;

}
},1000);

}
// ============================
// TEMPO ESGOTADO MISSÃO 8
// ============================

function abrirTempo1(){

limparInvestigacao2();

resetarCamposInvestigacao2();

document.getElementById("desbloquearSistema").style.display="none";
document.getElementById("timerMissao8").style.display="none";
document.getElementById("missao9Teste").style.display="none";
document.getElementById("missao12Perguntas").style.display="none";
document.getElementById("missao14Perguntas").style.display="none";

let tela=document.getElementById("investigacao2Intro");

tela.style.display="block";
tela.style.backgroundImage="url('tempo1.png')";

tela.onclick=abrirTempo2;

}


function abrirTempo2(){

let tela=document.getElementById("investigacao2Intro");

tela.style.backgroundImage="url('tempo2.png')";

tela.onclick=voltarInvestigacoes;

}



function voltarInvestigacoes(){

resetarCamposInvestigacao2();

let tela=document.getElementById("investigacao2Intro");

tela.onclick=null;
tela.style.display="none";

document.getElementById("telaInvestigacoes").style.display="block";

}

function finalizarMissao9(){

let v10=document.getElementById("valor10").value.trim();
let v41=document.getElementById("valor41").value.trim();


if(v10=="131" && escolha10=="sim" &&
   v41=="1681" && escolha41=="nao"){


document.getElementById("missao9Teste").style.display="none";


let tela=document.getElementById("investigacao2Intro");


tela.style.backgroundImage="url('missao10.png')";


let perguntas10=document.getElementById("missao10Teste");

perguntas10.style.display="flex";

perguntas10.style.zIndex="999999999";


document.getElementById("timerMissao8").style.display="block";
}

else{

alert("⚠️ Algo ainda não foi investigado corretamente.\n\nRevise os cálculos.");

}


}
// ============================
// INVESTIGAÇÃO 3 - CARTAS
// ============================

function abrirCarta1(){

limparTelasInvestigacoes();

document.getElementById("telaInvestigacoes").style.display="none";

document.getElementById("carta1").style.display="block";

}


function abrirCarta2(){

document.getElementById("carta1").style.display="none";

document.getElementById("carta2").style.display="block";

}


function abrirCarta3(){

document.getElementById("carta2").style.display="none";

document.getElementById("carta3").style.display="block";

}


function abrirCarta4(){

document.getElementById("carta3").style.display="none";

document.getElementById("carta4").style.display="block";

}


function abrirSalaPistas(){

document.getElementById("carta4").style.display="none";

document.getElementById("salaPistas").style.display="block";

mostrarBotoesSalaPistas();
}
// ============================
// INVESTIGAÇÃO 3 - PISTAS VISUAIS
// ============================

function mostrarBotoesSalaPistas(){

document.getElementById("botoesSalaPistas").style.display="block";

}


function esconderBotoesSalaPistas(){

document.getElementById("botoesSalaPistas").style.display="none";

}


function abrirPistaVisual(imagem){

document.getElementById("salaPistas").style.display="none";

esconderBotoesSalaPistas();

let tela=document.getElementById("pistaVisual");

tela.style.backgroundImage="url('"+imagem+"')";

tela.style.display="block";

}


function voltarSalaPistas(){

[
"pistaVisual",
"pista5Tela",
"pista55Tela",
"pista7Tela",
"pista77Tela",
"pista777Tela",
"pista4Tela",
"pista44Tela",
"pista444Tela",
"fibonacci1Tela",
"fibonacci2Tela",
"fibonacci3Tela",
"final1Tela",
"final2Tela",
"final3Tela",
"final4Tela",
"final5Tela"
].forEach(function(id){

let tela=document.getElementById(id);

if(tela){
tela.style.display="none";
}

});

document.getElementById("salaPistas").style.display="block";

mostrarBotoesSalaPistas();

}// ============================
// INVESTIGAÇÃO 3 - PISTA 5
// ============================

let dicasInvestigacao3 = 0;
let dicaGavetaUsada = false;

function abrirPista5(){

voltarSalaPistas();

document.getElementById("salaPistas").style.display="none";

esconderBotoesSalaPistas();

document.getElementById("pista5Tela").style.display="block";

}


function verificarCodigoGaveta(){

let n1=document.getElementById("codigoGaveta1").value.trim();
let n2=document.getElementById("codigoGaveta2").value.trim();
let n3=document.getElementById("codigoGaveta3").value.trim();
let n4=document.getElementById("codigoGaveta4").value.trim();

if(n1=="31" && n2=="19" && n3=="13" && n4=="3"){

document.getElementById("pista5Tela").style.display="none";

limparCodigoGaveta();

document.getElementById("pista55Tela").style.display="block";

}else{

mostrarMensagem(
"🔒 Código incorreto",
"Não é o código correto.<br><br>Revise as pistas anteriores e tente novamente.",
"CONTINUAR",
"this.parentElement.remove()"
);

}

}


function mostrarDicaGaveta(){

if(dicaGavetaUsada){
return;
}

dicaGavetaUsada=true;
dicasInvestigacao3++;

mostrarMensagem(
"💡 Dica da gaveta",
"São 4 números primos que vocês descobriram nas pistas anteriores.<br><br>"+
"Eles devem estar em <b>ordem decrescente</b>.<br><br>"+
"Obs.: cada campo pode ser preenchido por um número com mais de um algarismo.",
"ENTENDI",
"this.parentElement.remove()"
);

document.getElementById("dicaGaveta").innerHTML="DICA USADA";
document.getElementById("dicaGaveta").disabled=true;

}


function limparCodigoGaveta(){

document.getElementById("codigoGaveta1").value="";
document.getElementById("codigoGaveta2").value="";
document.getElementById("codigoGaveta3").value="";
document.getElementById("codigoGaveta4").value="";

}

// ============================
// INVESTIGAÇÃO 3 - PISTA 7
// ============================

let dicaCofreUsada = false;

function abrirPista7(){

voltarSalaPistas();

document.getElementById("salaPistas").style.display="none";

esconderBotoesSalaPistas();

document.getElementById("pista7Tela").style.display="block";

}


function abrirPista77(){

document.getElementById("pista7Tela").style.display="none";

document.getElementById("pista77Tela").style.display="block";

}


function verificarCodigoCofre(){

let codigo=document.getElementById("codigoCofre").value.trim();

if(codigo=="757"){

document.getElementById("pista77Tela").style.display="none";

document.getElementById("codigoCofre").value="";

document.getElementById("pista777Tela").style.display="block";

}else{

mostrarMensagem(
"🔒 Código incorreto",
"Você ainda precisa investigar melhor as pistas.",
"CONTINUAR",
"this.parentElement.remove()"
);

}

}


function mostrarDicaCofre(){

if(dicaCofreUsada){
return;
}

dicaCofreUsada=true;
dicasInvestigacao3++;

mostrarMensagem(
"💡 Dica do cofre",
"Perceba qual é o padrão da sequência que aparece nas camisetas da foto.<br><br>"+
"Os dígitos distintos são <b>1, 3 e 9</b>.<br><br>"+
"Qual é o valor desses números na sequência?<br><br>"+
"Some os resultados e chegue ao código para abrir o cofre.",
"ENTENDI",
"this.parentElement.remove()"
);

document.getElementById("dicaCofre").innerHTML="DICA USADA";
document.getElementById("dicaCofre").disabled=true;

}

// ============================
// INVESTIGAÇÃO 3 - PISTA 4 / FINAL
// ============================

let dicaFibonacci3Usada=false;

function abrirPista4(){
voltarSalaPistas();

document.getElementById("salaPistas").style.display="none";

esconderBotoesSalaPistas();

document.getElementById("pista4Tela").style.display="block";

}


function verificarRastreador(){

let codigo=document.getElementById("codigoRastreador").value.trim().toUpperCase();

if(codigo=="CZA442"){

document.getElementById("pista4Tela").style.display="none";

document.getElementById("codigoRastreador").value="";

document.getElementById("pista44Tela").style.display="block";

}else{

mostrarMensagem(
"🔒 Código incorreto",
"O sistema de rastreamento não reconheceu esse código.",
"CONTINUAR",
"this.parentElement.remove()"
);

}

}


function abrirPista444(){

document.getElementById("pista44Tela").style.display="none";

document.getElementById("pista444Tela").style.display="block";

}


function abrirFibonacci1(){

document.getElementById("pista444Tela").style.display="none";

document.getElementById("fibonacci1Tela").style.display="block";

}


function abrirFibonacci2(){

document.getElementById("fibonacci1Tela").style.display="none";

document.getElementById("fibonacci2Tela").style.display="block";

}


function verificarFibonacci2(){

let ordem=document.getElementById("fibOrdem").value;

ordem=ordem.replace(/\s/g,"");

let tipo=document.querySelector("input[name='tipoFib']:checked");

let ordemCorreta =
ordem=="0,1,1,2,3,5" ||
ordem=="011235";

let tipoCorreto = tipo && tipo.value=="fibonacci";

if(ordemCorreta && tipoCorreto){

document.getElementById("fibonacci2Tela").style.display="none";

document.getElementById("fibonacci3Tela").style.display="block";

}else{

mostrarMensagem(
"🔎 Revise o padrão",
"Algo ainda não encaixa.<br><br>Observe os números do mapa e tente encontrar a regra da sequência.",
"CONTINUAR",
"this.parentElement.remove()"
);

}

}


function mostrarDicaFibonacci3(){

if(dicaFibonacci3Usada){
return;
}

dicaFibonacci3Usada=true;
dicasInvestigacao3++;

mostrarMensagem(
"💡 Dica do padrão",
"Observe que, para achar o quarto termo, somamos os dois anteriores.<br><br>"+
"O quinto termo é a soma do terceiro termo com o quarto termo.<br><br>"+
"Procure no mapa o número que quebra essa regra.",
"ENTENDI",
"this.parentElement.remove()"
);

document.getElementById("dicaFibonacci3").innerHTML="DICA USADA";
document.getElementById("dicaFibonacci3").disabled=true;

}


function verificarFibonacci3(){

let s1=document.getElementById("fibSoma1").value.trim();
let s2=document.getElementById("fibSoma2").value.trim();
let s3=document.getElementById("fibSoma3").value.trim();

let regra=document.querySelector("input[name='regraFib']:checked");

let fora=document.getElementById("numeroForaPadrao").value.trim();

if(
s1=="2" &&
s2=="3" &&
s3=="5" &&
regra &&
regra.value=="soma" &&
fora=="1000"
){

document.getElementById("fibonacci3Tela").style.display="none";

document.getElementById("fibSoma1").value="";
document.getElementById("fibSoma2").value="";
document.getElementById("fibSoma3").value="";
document.getElementById("numeroForaPadrao").value="";

document.querySelectorAll("input[name='regraFib']").forEach(function(radio){
radio.checked=false;
});

document.getElementById("final1Tela").style.display="block";

}else{

mostrarMensagem(
"📍 Localização não confirmada",
"Alguma informação ainda não encaixa no padrão.<br><br>Continue investigando a sequência.",
"CONTINUAR",
"this.parentElement.remove()"
);

}

}

function abrirFinal2(){

document.getElementById("final1Tela").style.display="none";

document.getElementById("final2Tela").style.display="block";

}


function abrirFinal3(){

document.getElementById("final2Tela").style.display="none";

document.getElementById("final3Tela").style.display="block";

}


function abrirFinal4(){

document.getElementById("final3Tela").style.display="none";

document.getElementById("final4Tela").style.display="block";

}


function abrirFinal5(){

document.getElementById("final4Tela").style.display="none";

let estrelas=5-dicasInvestigacao3;

if(estrelas<1){
estrelas=1;
}

let nomeEquipe="";

let equipe=JSON.parse(localStorage.getItem("equipeAtual"));

if(equipe && equipe.nome){
nomeEquipe=equipe.nome;
}else{
nomeEquipe="Equipe";
}

let estrelasTexto="";

for(let i=0;i<estrelas;i++){
estrelasTexto+="⭐";
}

document.getElementById("resultadoEstrelas").innerHTML=

"Equipe: "+nomeEquipe+"<br>"+
"Desempenho: "+estrelasTexto+"<br>"+
estrelas+" estrela(s)<br>"+
"Dicas usadas: "+dicasInvestigacao3;

document.getElementById("final5Tela").style.display="block";

}


function encerrarInvestigacao3(){

limparInvestigacao3();

document.getElementById("final5Tela").style.display="none";

document.getElementById("telaInvestigacoes").style.display="block";

}


function limparInvestigacao3(){

[
"carta1",
"carta2",
"carta3",
"carta4",
"salaPistas",
"pistaVisual",
"pista5Tela",
"pista55Tela",
"pista7Tela",
"pista77Tela",
"pista777Tela",
"pista4Tela",
"pista44Tela",
"pista444Tela",
"fibonacci1Tela",
"fibonacci2Tela",
"fibonacci3Tela",
"final1Tela",
"final2Tela",
"final3Tela",
"final4Tela",
"final5Tela"
].forEach(function(id){

let obj=document.getElementById(id);

if(obj){
obj.style.display="none";
}

});

esconderBotoesSalaPistas();

if(document.getElementById("codigoRastreador")){
document.getElementById("codigoRastreador").value="";
}

if(document.getElementById("fibOrdem")){
document.getElementById("fibOrdem").value="";
}

if(document.getElementById("numeroForaPadrao")){
document.getElementById("numeroForaPadrao").value="";
}

document.querySelectorAll("input[name='tipoFib']").forEach(function(radio){
radio.checked=false;
});

}

// =========================
// MISSÃO 9 - TESTE DOS PRIMOS
// =========================

let escolha10="";
let escolha41="";


function responderPrimo(numero,resposta){


if(numero==10){

escolha10=resposta;


// limpa os dois

document.getElementById("sim10").classList.remove("selecionado");
document.getElementById("nao10").classList.remove("selecionado");


// marca escolhido

if(resposta=="sim"){

document.getElementById("sim10").classList.add("selecionado");

}else{

document.getElementById("nao10").classList.add("selecionado");

}

}



if(numero==41){

escolha41=resposta;


document.getElementById("sim41").classList.remove("selecionado");
document.getElementById("nao41").classList.remove("selecionado");


if(resposta=="sim"){

document.getElementById("sim41").classList.add("selecionado");

}else{

document.getElementById("nao41").classList.add("selecionado");

}

}


}
function limparInvestigacao2(){


/* esconde telas de interação */

document.getElementById("desbloquearSistema").style.display="none";

document.getElementById("missao9Teste").style.display="none";

document.getElementById("missao10Teste").style.display="none";



/* limpa campos */

document.getElementById("codigoSistema").value="";

document.getElementById("valor10").value="";

document.getElementById("valor41").value="";



/* limpa escolhas */

escolha10="";
escolha41="";



/* tira marca verde dos botões */

document.querySelectorAll(".selecionado")
.forEach(botao=>{

botao.classList.remove("selecionado");

});



}
function verificarMissao10(){


let q1=document.querySelector('input[name="q1"]:checked');
let q2=document.querySelector('input[name="q2"]:checked');
let q3=document.querySelector('input[name="q3"]:checked');


if(!q1 || !q2 || !q3){

alert("🕵️ Responda todas as análises antes de encerrar.");

return;

}


if(q1.value=="B" &&
   q2.value=="A" &&
   q3.value=="A"){


document.getElementById("missao10Teste").style.display="none";


let tela=document.getElementById("investigacao2Intro");


tela.style.backgroundImage="url('missao11.png')";


// mantém timer

document.getElementById("timerMissao8").style.display="block";


// clique para próxima tela

tela.onclick=abrirMissao12;


}

else{


alert("⚠️ O relatório possui erros.\n\nReveja as conclusões dos investigadores.");


}


}
function abrirMissao12(){

let tela=document.getElementById("investigacao2Intro");

tela.style.backgroundImage="url('missao12.png')";

document.getElementById("timerMissao8").style.display="block";

document.getElementById("missao12Perguntas").style.display="grid";

tela.onclick=null;

}
function verificarMissao12(){

let q1=document.querySelector('input[name="m12q1"]:checked');
let q2=document.querySelector('input[name="m12q2"]:checked');
let q3=document.querySelector('input[name="m12q3"]:checked');
let q4=document.querySelector('input[name="m12q4"]:checked');

if(!q1 || !q2 || !q3 || !q4){

mostrarMensagem(
"🕵️ Relatório incompleto",
"Responda todas as perguntas antes de concluir a investigação.",
"CONTINUAR",
"this.parentElement.remove()"
);

return;

}

if(
q1.value=="A" &&
q2.value=="B" &&
q3.value=="B" &&
q4.value=="C"
){


document.getElementById("missao12Perguntas").style.display="none";

let tela=document.getElementById("investigacao2Intro");

tela.style.backgroundImage="url('missao13.png')";

tela.onclick=function(){

abrirMissao14();

};

}

else{

mostrarMensagem(
"⚠️ Investigação inconclusiva",
"O relatório ainda apresenta inconsistências.<br><br>Revise cuidadosamente a demonstração antes de arquivar o caso.",
"CONTINUAR INVESTIGANDO",
"this.parentElement.remove()"
);

}

}
function abrirMissao14(){

let tela=document.getElementById("investigacao2Intro");

tela.style.backgroundImage="url('missao14.png')";

tela.onclick=null;

document.getElementById("missao14Perguntas").style.display="grid";

}

function verificarMissao14(){

let q1=document.querySelector('input[name="m14q1"]:checked');
let q2=document.querySelector('input[name="m14q2"]:checked');
let q3=document.querySelector('input[name="m14q3"]:checked');
let q4=document.querySelector('input[name="m14q4"]:checked');
let q5=document.querySelector('input[name="m14q5"]:checked');
let q6=document.querySelector('input[name="m14q6"]:checked');

if(!q1 || !q2 || !q3 || !q4 || !q5 || !q6){

mostrarMensagem(
"🕵️ Demonstração incompleta",
"Responda todas as etapas antes de validar a demonstração.",
"CONTINUAR",
"this.parentElement.remove()"
);

return;

}

if(
q1.value=="B" &&
q2.value=="B" &&
q3.value=="A" &&
q4.value=="B" &&
q5.value=="A" &&
q6.value=="B"
){

document.getElementById("missao14Perguntas").style.display="none";

let tela=document.getElementById("investigacao2Intro");

finalizarMissao14();
}

else{

mostrarMensagem(
"⚠️ Demonstração incompleta",
"O sistema encontrou inconsistências na demonstração apresentada.<br><br>Revise as etapas da indução matemática antes de tentar novamente.",
"CONTINUAR INVESTIGANDO",
"this.parentElement.remove()"
);

}

}
function finalizarMissao14(){

// para o cronômetro
clearInterval(intervaloMissao8);

// guarda o tempo restante
let tempoFinalMissao2 = tempoMissao8;

localStorage.setItem("tempoFinalMissao2", tempoFinalMissao2);

// esconde perguntas
document.getElementById("missao14Perguntas").style.display="none";

// vai para missão 15
let tela=document.getElementById("investigacao2Intro");

tela.style.backgroundImage="url('missao15.png')";

tela.onclick=function(){

abrirMissao16();

};

}
function abrirMissao16(){

let tela=document.getElementById("investigacao2Intro");

tela.style.backgroundImage="url('missao16.png')";

tela.onclick=function(){

abrirMissao17();

};

}
function abrirMissao17(){

let tela=document.getElementById("investigacao2Intro");

tela.style.backgroundImage="url('missao17.png')";

tela.onclick=null;

// esconde cronômetro antigo
document.getElementById("timerMissao8").style.display="none";

// mostra dados finais
mostrarResultadoInvestigacao2();

}

function mostrarResultadoInvestigacao2(){

let equipe=JSON.parse(localStorage.getItem("equipeAtual"));

let tempo=Number(localStorage.getItem("tempoFinalMissao2"));

let minutos=Math.floor(tempo/60);
let segundos=tempo%60;

let tempoFormatado=
(minutos<10?"0":"")+minutos+
":"+
(segundos<10?"0":"")+segundos;

let resultado=document.getElementById("resultadoMissao17");

resultado.innerHTML=

"<h1>"+equipe.nome+"</h1>"+
"<h2>Tempo restante: "+tempoFormatado+"</h2>"+
"<h3>Pontuação: "+tempo+" pontos</h3>"+
"<button onclick='encerrarInvestigacao2Final()'>CONTINUAR</button>";

resultado.style.display="block";

}
function encerrarInvestigacao2Final(){

// esconde resultado final
document.getElementById("resultadoMissao17").style.display="none";

resetarCamposInvestigacao2();

// limpa telas da investigação 2
limparInvestigacao2();

// volta para a tela das investigações
document.getElementById("investigacao2Intro").style.display="none";
document.getElementById("telaInvestigacoes").style.display="block";

}

function resetarCamposInvestigacao2(){

// limpa todos os inputs
document.querySelectorAll("#investigacao2Intro input").forEach(function(input){

if(input.type=="radio" || input.type=="checkbox"){

input.checked=false;

}else{

input.value="";

}

});

// limpa selects
document.querySelectorAll("#investigacao2Intro select").forEach(function(select){

select.selectedIndex=0;

});

// esconde telas das missões
[
"desbloquearSistema",
"missao9Teste",
"missao10Teste",
"missao12Perguntas",
"missao14Perguntas",
"resultadoMissao17"

].forEach(function(id){

let obj=document.getElementById(id);

if(obj){

obj.style.display="none";

}

});

// limpa o conteúdo do resultado final
let resultado=document.getElementById("resultadoMissao17");

if(resultado){

resultado.innerHTML="";

}

// remove qualquer radio marcado novamente (garantia)
document.querySelectorAll("#investigacao2Intro input[type=radio]").forEach(function(r){

r.checked=false;

});

}

function sairDoJogo(){

if(confirm("Deseja realmente sair do jogo?")){

// fecha a aba (quando permitido)
window.close();

// caso o navegador impeça, volta para a tela inicial
location.reload();

}

}

function abrirJanelaSair(){

document.getElementById("janelaSair").style.display="flex";

}

function fecharJanelaSair(){

document.getElementById("janelaSair").style.display="none";

}

function confirmarSaida(){

window.close();

}

const { app, BrowserWindow } = require("electron");

function criarJanela() {
  const janela = new BrowserWindow({
    width: 1920,
    height: 1080,
    fullscreen: true,
    autoHideMenuBar: true
  });

  janela.loadFile("index.html");
}

app.whenReady().then(criarJanela);

app.on("window-all-closed", () => {
  app.quit();
});

function limparTelasInvestigacoes(){

[
"fimCaso",
"relatorio1a",
"relatorio1b",
"fimJogo",
"falhou1",
"falhou2",
"caso1",
"folha1",
"casoBase",
"passoIndutivo",
"caso2",
"folha2",
"casoBase2",
"passoIndutivo2",
"caso3",
"folha3",
"casoBase3",
"bonus",
"bonus4",
"bonus5",

"investigacao2Intro",
"testePrimos",
"ordemInducao",
"desbloquearSistema",
"missao9Teste",
"missao10Teste",
"missao12Perguntas",
"missao14Perguntas",
"resultadoMissao17",

"carta1",
"carta2",
"carta3",
"carta4",
"salaPistas",
"pistaVisual",
"pista5Tela",
"pista55Tela",
"pista7Tela",
"pista77Tela",
"pista777Tela",
"pista4Tela",
"pista44Tela",
"pista444Tela",
"fibonacci1Tela",
"fibonacci2Tela",
"fibonacci3Tela",
"final1Tela",
"final2Tela",
"final3Tela",
"final4Tela",
"final5Tela"
].forEach(function(id){

let tela=document.getElementById(id);

if(tela){
tela.style.display="none";
}

});

if(document.getElementById("botoesSalaPistas")){
document.getElementById("botoesSalaPistas").style.display="none";
}

}