import fileService from '../services/fileService'
import clienteService from '../services/clienteService'
import sucursalService from '../services/sucursalService'
import ofertaService from '../services/ofertaService'

    const  cliente=(req,res)=>{
        fileService.cliente(req,res)
        .then((file)=>{
            const art = {
                filename: file.filename
            }
            clienteService.update(art,req.params.id)
            .then((result)=>{
                res.status(200).send({result})
            })
            .catch(reason =>{
                res.status(400).send({message: reason})
            })
        })
    }
    const  sucursal=(req,res)=>{
        fileService.sucursal(req,res)
        .then((file)=>{
            const art = {
                portada: file.filename
            }
            sucursalService.update(art,req.params.id)
            .then((result)=>{
                res.status(200).send({result})
            })
            .catch(reason =>{
                res.status(400).send({message: reason})
            })
        })
    }
    const  portada=(req,res)=>{
        fileService.portada(req,res)
        .then((file)=>{
            const art = {
                portada: file.filename
            }
            clienteService.update(art,req.params.id)
            .then((result)=>{
                res.status(200).send({result})
            })
            .catch(reason =>{
                res.status(400).send({message: reason})
            })
        })
    }

    const  oferta=(req,res)=>{
        fileService.oferta(req,res)
        .then((file)=>{
            const art = {
                filename: file.filename
            }
            ofertaService.update(art,req.params.id)
            .then((result)=>{
                res.status(200).send({result})
            })
            .catch(reason =>{
                res.status(400).send({message: reason})
            })
        })
    }


module.exports={
    cliente, 
    sucursal,
    portada,
    oferta    
}