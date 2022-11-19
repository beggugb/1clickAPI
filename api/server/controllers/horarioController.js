import db from "../../src/models";
const bcrypt = require('bcrypt')
import { verifiDBNull } from '../../functions/env'
import horarioService from "../services/horarioService";

    const  dataHorarios =(req, res)=>{        
        horarioService.data(req.params.prop)
        .then((rows)=>{            
            res.status(200).send({message: "lista horarios", result: rows})
        })
        .catch((reason)=>{
            console.log(reason)
            res.status(400).send({message: reason})
        })
    }
    const  setUpdate=(req, res)=>{     
        const { items, clienteId } = req.body                     
            items.map((it,index)=>{
                horarioService.update(it,it.id)
                .then((tt) =>{
                    return 0
                })
            })                       
            horarioService.data(clienteId)
             .then((rows)=>{
                  res.status(200).send({message: "lista sorarios", result: rows})
                })
                .catch((reason) => {
                  res.status(400).send({ message: reason });
                });                                                                   
    }

    
module.exports={    
    dataHorarios,    
    setUpdate
}