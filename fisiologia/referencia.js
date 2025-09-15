"use strict"
const referencia = {
    retornarLinhaEcoluna(inputTarget) {
        const linhaOutput = document.querySelector(".reference__output--indicador");
        const colOutput = document.querySelector(".reference__output--idade");
        const inputTargetAndSiblings = inputTarget.parentElement.children;
        let inputTargetIndex;
        for (let i = 0; i < inputTargetAndSiblings.length; i++) {
            if(inputTargetAndSiblings[i] === inputTarget) inputTargetIndex = i-1;
        }
        let indicadorLinear = inputTargetAndSiblings[0].textContent;
        let colunas = ["0 - 4","5 - 14","≥ 15","Total","Grávidas","Lactantes"];
        function theInputIsFromSection1(input) {return input.parentElement.parentElement.matches(".ficha__seccao--1");}
        if(theInputIsFromSection1(inputTarget)) {
            let bmOuUSIndex= (inputTargetIndex < 20) ? 1 : 21; // 0 = Dentro da US; 21 = Brigada Móvel
            indicadorLinear = `${inputTargetAndSiblings[0].textContent} (${inputTargetAndSiblings[bmOuUSIndex].textContent})`;
            colunas = ["PVHIV 0 - 4","PVHIV 5 - 14","PVHIV ≥ 15", "Contactos de TB 0 - 4","Contactos de TB 5 - 14","Contactos de TB ≥ 15", "Diabetes 0 - 4","Diabetes 5 - 14","Diabetes ≥ 15", "Mineiros ≥ 15", "Prisioneiros ≥ 15", "Trabalhador de Saúde ≥ 15", "Outros 0 - 4","Outros 5 - 14","Outros ≥ 15"];
            inputTargetIndex--;
            (inputTargetIndex > 19) && (inputTargetIndex -= 20);
        }
        let indicadorColunar = colunas[inputTargetIndex];
        linhaOutput.textContent = indicadorLinear;
        colOutput.textContent = indicadorColunar;
    },
    retornarVazio() {
        const outputs = document.querySelectorAll(".reference__output");
        for (const o of outputs) o.value = "";
    }
}
function events() {
    const inputsCelulares = document.querySelectorAll(".ficha__seccao input");
    inputsCelulares.forEach( inputCelular => {
        inputCelular.addEventListener("focus", () => {
            if(!inputCelular.matches("[readonly]")) {
                referencia.retornarLinhaEcoluna(inputCelular);
            }
        });
    });
    inputsCelulares.forEach( inputCelular => inputCelular.addEventListener("focusout", referencia.retornarVazio));
}
window.onload = events;