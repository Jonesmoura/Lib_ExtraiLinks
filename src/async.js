// importamos o modulo fs, que é uma lib nativa do node para leitura de arquivos do sistema

import fs from 'fs';
import chalk from 'chalk';
// na linha acima foi importada a lib chalk, que foi instalada via npm

function extrairLinks(texto){

    // criando uma Regex atraves de uma nova variavel, entre barras.

    const regex = /\[([^\[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm
    const capturas = [...texto.matchAll(regex)]

    // a variavel abaixo roda o método map, criando um objeto(através da arrow function) utilizando a posição 1 como chave e a posição 2 como valor, obtidos no metodo matchAll, e espalhados com ...

    const resultados = capturas.map(captura => ({[captura[1]]:captura[2]})
    )
    return resultados.length !== 0 ? resultados : 'Não há links no arquivo.'

}

// async/await

async function pegaArquivo(caminhoArquivo){

    try{

        const encoding ='utf-8'
        const texto = await fs.promises.readFile(caminhoArquivo, encoding)
        return extrairLinks(texto)

    } catch (erro){

        trataErro(erro)

    } finally {

        console.log(chalk.green('Programa finalizado!'))

    }

}

function trataErro(erro){

    // objeto do erro:
    console.log(erro)

    throw new Error(chalk.red(erro.code, 'não há arquivo no diretório'))

}
// trabalhando de forma assincrona utilizando o then

// pegaArquivo('./arquivos/texto.md')

export default pegaArquivo;
