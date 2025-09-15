"use strict"
const referencia = {
    retornarLinhaEcoluna(inputTarget) {
        const linhaOutput = document.querySelector(".reference__output--indicador");
        const colOutput = document.querySelector(".reference__output--idade");
        const celulaComFocoEirmas = inputTarget.parentElement.children;
        let CelulaComFocoIndex = 0;
        for (let i = 0; i < celulaComFocoEirmas.length; i++) {
            if(celulaComFocoEirmas[i] === inputTarget) CelulaComFocoIndex = i-1;
        }
        let tituloDaSeccao = inputTarget.parentElement.parentElement.getElementsByTagName("h2")[0];
        let indicadorLinear = inputTarget.parentElement.querySelector("span");
        let indicadoresColunares = document.querySelectorAll(".seccao-1__header__linha-de-indicadores-colunares span");
        if(inputTarget.parentElement.matches(".seccao-2__body__tipo-de-resistencia")) {
            indicadorLinear = document.querySelector(".seccao-1__header__col-variaveis"); // Aponta para um elemento vazio
        }
        linhaOutput.textContent = `${tituloDaSeccao.textContent}: ${indicadorLinear.textContent}`;
        // Seccoes
        let isSection2 = inputTarget.parentElement.parentElement.matches(".ficha__seccao--2");
        let isSection3 = inputTarget.parentElement.parentElement.matches(".ficha__seccao--3");
        let isSection4 = inputTarget.parentElement.parentElement.matches(".ficha__seccao--4");
        if(isSection2) {
            indicadoresColunares = document.querySelectorAll(".seccao-2__header__col2-da-linha-inferior span");
            CelulaComFocoIndex++;
            if(inputTarget.parentElement.matches(".ficha__seccao-2__grid-template-cols-4")) {
                indicadoresColunares = "";
            }
            else if(inputTarget.parentElement.matches(".seccao-2__body__tipo-de-resistencia")) {
                indicadoresColunares = document.querySelectorAll(".seccao-2__pseudoheader__tipo-de-resistencia span");
            }
        } else if(isSection3) {
            indicadoresColunares = document.querySelectorAll(".ficha__seccao-3__indicador-colunar");
        } else if(isSection4) {
            indicadoresColunares = document.querySelectorAll(".seccao-4__header__linha-de-indicadores-colunares span");
        }
        let indicadorColunar = indicadoresColunares[CelulaComFocoIndex];
        colOutput.textContent = indicadorColunar.textContent;
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