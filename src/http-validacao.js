import chalk from "chalk"

function extraiLinks(arrLinks){

    // utilizamos o metodo map de arrays para iterar cada item e com o metodo object.values capturamos o valor de cada chave, com o metodo join criamos um unico array com todos os valores capturados.

    return arrLinks.map((objetoLink)=>Object.values(objetoLink).join())

}

async function checaStatus(listaURL){

    const arrStatus = await Promise
    .all(
        listaURL.map(async (URL)=>{

        try{

            const response = await fetch(URL)
            return `${response.status} - ${response.statusText}`

        } catch(erro){

            return manejaErros(erro)

        }
    })
    )
    return arrStatus
}

function manejaErros(erro){

    if(erro.cause.code === 'ENOTFOUND'){

        return 'Link não encontrado'

    }else{

        return 'Ocorreu algum erro'

    }

}

export default async function listaValidada (listaDelinks){

    const links = extraiLinks(listaDelinks)
    const status = await checaStatus(links)
    
    return listaDelinks.map((objeto,i)=>({

        ...objeto,
        status: status[i]

    }))
    
}

