import db from "../../src/models";
const bcrypt = require('bcrypt')
import { verifiDBNull } from '../../functions/env'
import cajeroService from "../services/cajeroService";

    const  dataCajeros =(req, res)=>{        
        cajeroService.data(req.params.page,req.params.num,req.params.prop,req.params.value)
        .then((rows)=>{            
            res.status(200).send({message: "lista cajeros", result: rows})
        })
        .catch((reason)=>{
        
            res.status(400).send({message: reason})
        })
    }

    const  searchCajero =(req,res)=>{
        const {prop, value } = req.body
        let newValue = verifiDBNull(value)
        cajeroService.search(prop,newValue)
        .then((rows)=>{
            res.status(200).send({message: rows})
        })
        .catch((reason)=>{            
            res.status(400).send({message: reason})
        })
    }
    

    const saveCajero=(req, res)=>{
        const { clienteId } = req.body
        cajeroService.create(req.body)
          .then((row)=>{
            cajeroService.data(1,12,clienteId,clienteId)
              .then((rows)=>{
                res.status(200).send({message: "lista cajeros", result: rows})
              })
              .catch((reason) => {
                res.status(400).send({ message: reason });
              });            
          })  
          .catch((reason) => {
            res.status(400).send({ message: reason });
          });                       
    }

    const setDelete = (req,res) =>{  
        const { clienteId } = req.body  
        cajeroService._delete(req.params.id)
        .then((xrow)=>{
            cajeroService.data(1,12,clienteId,clienteId)
              .then((rows)=>{
                res.status(200).send({message: "lista cajeros", result: rows})
              })
              .catch((reason) => {
                res.status(400).send({ message: reason });
              });
        })
        .catch((reason)=>{
            res.status(400).send({message: reason})
        })    
}

    const  setUpdate=(req, res)=>{ 
        const { clienteId } = req.body         
            cajeroService.update(req.body,req.params.id)
            .then((row)=>{            
                cajeroService.data(1,12,clienteId,clienteId)
                .then((rows)=>{
                  res.status(200).send({message: "lista cajeros", result: rows})
                })
                .catch((reason) => {
                  res.status(400).send({ message: reason });
                });                         
            })
            .catch((reason)=>{            
                res.status(400).send({message: reason})
            })               
    }

    const  getItem=(req, res)=>{                        
        cajeroService.item(req.params.id)
        .then((xrow) => { 
            res.status(200).send({message: "cajero actualizado",result:xrow})               
        })
        .catch((reason) => {            
            res.status(400).send({ message: reason });
        });                                
    }

    const  getItems =(req,res)=>{
        cajeroService.items()
        .then((rows)=>{
            res.status(200).send({result: rows})
        })
        .catch((reason)=>{        
            res.status(400).send({message: reason})
        })    
    }

    const  listaCajeros =(req,res)=>{
        cajeroService.dataLista(req.params.id)
        .then((rows)=>{
            res.status(200).send({result: rows})
        })
        .catch((reason)=>{        
            res.status(400).send({message: reason})
        })    
    }
    
module.exports={    
    dataCajeros,
    searchCajero,
    saveCajero,
    setUpdate,
    setDelete,
    getItem,
    getItems,
    listaCajeros
 
}