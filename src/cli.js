// CLI = command line interface
//o objeto process.argv passa o que foi digitado no terminal como parametro, podendo assim ser utilizado como variavel 
import chalk from "chalk"
import pegaArquivo from "./async.js"
import fs from 'fs'
import listaValidada from "./http-validacao.js"

const caminho = process.argv

async function imprimeLista(valida, resultado, nomeArquivo = ''){

    if(valida){

        console.log(chalk.cyan('Arquivo[Validado]:'),chalk.gray(nomeArquivo), await listaValidada(resultado))

    }else {

        console.log(chalk.cyan('Arquivo:'),chalk.gray(nomeArquivo), resultado)
    
    }

}

async function processaTexto(argumentos){

    const caminho = argumentos[2]
    const valida = argumentos[3] ==='--valida'

    try{

        fs.lstatSync(caminho)

    } catch(error){

        if (error.code === 'ENOENT'){

            console.log( 'Arquivo ou diretório inválido')
            return

        }

    }

    if(fs.lstatSync(caminho).isFile()){

        const resultado = await pegaArquivo(caminho)
        imprimeLista(valida, resultado, caminho)

    } else if(fs.lstatSync(caminho).isDirectory()){

        const arquivos = await fs.promises.readdir(caminho)
        arquivos.forEach(async (nomeArquivo)=>{
            
            const lista = await pegaArquivo(`${caminho}/${nomeArquivo}`)
            imprimeLista(valida, lista,nomeArquivo)
            
        })

    }

}

processaTexto(caminho)

// colocamos no arquivo package.json um script para quando rodarmos o código no terminal ele ja inserir os dois primeiros comandos (node ./src/arquivos/), assim quando rodarmos ele digitaremos apenas o diretório ou arquivo, ficará assim => npm run cli ./arquivos/

//Comando para o CLI => npm run cli ./arquivos/ -- --valida

