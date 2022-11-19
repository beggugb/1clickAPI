import db from "../../src/models";
const bcrypt = require('bcrypt')
import { verifiDBNull } from '../../functions/env'
import sorarioService from "../services/sorarioService";

    const  dataSorarios =(req, res)=>{        
        sorarioService.data(req.params.prop)
        .then((rows)=>{            
            res.status(200).send({message: "lista sorarios", result: rows})
        })
        .catch((reason)=>{
            console.log(reason)
            res.status(400).send({message: reason})
        })
    }

  
    const  setUpdate=(req, res)=>{     
        const { items, sucursalId } = req.body                     
            items.map((it,index)=>{
                sorarioService.update(it,it.id)
                .then((tt) =>{
                    return 0
                })
            })           
            
            sorarioService.data(sucursalId)
             .then((rows)=>{
                  res.status(200).send({message: "lista sorarios", result: rows})
                })
                .catch((reason) => {
                  res.status(400).send({ message: reason });
                });                                                                   
    }

    
module.exports={    
    dataSorarios,    
    setUpdate
}