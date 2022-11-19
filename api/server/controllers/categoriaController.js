import db from "../../src/models";
const bcrypt = require('bcrypt')
import { verifiDBNull,getDistanceBetweenPoints } from '../../functions/env'
import categoriaService from "../services/categoriaService";

    const  dataCategorias =(req, res)=>{        
        categoriaService.data(req.params.page,req.params.num,req.params.prop,req.params.value)
        .then((rows)=>{            
            res.status(200).send({message: "lista categorias", result: rows})
        })
        .catch((reason)=>{
  
            res.status(400).send({message: reason})
        })
    }

    const  searchCategoria =(req,res)=>{
        const {prop, value } = req.body
        let newValue = verifiDBNull(value)
        categoriaService.search(prop,newValue)
        .then((rows)=>{
            res.status(200).send({message: rows})
        })
        .catch((reason)=>{            
            res.status(400).send({message: reason})
        })
    }
    

    const saveCategoria=(req, res)=>{
        categoriaService.create(req.body)
          .then((row)=>{
            categoriaService.data(1,12,'nombre','ASC')
              .then((rows)=>{
                res.status(200).send({message: "lista categorias", result: rows})
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
        categoriaService._delete(req.params.id)
        .then((xrow)=>{
            categoriaService.data(1,12,'nombre','ASC')
              .then((rows)=>{
                res.status(200).send({message: "lista categorias", result: rows})
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
            categoriaService.update(req.body,req.params.id)
            .then((row)=>{            
                categoriaService.data(1,12,'nombre','ASC')
                .then((rows)=>{
                  res.status(200).send({message: "lista categorias", result: rows})
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

        categoriaService.item(req.params.id)
        .then((xrow) => { 
            res.status(200).send({message: "categoria actualizado",result:xrow})               
        })
        .catch((reason) => {            
            res.status(400).send({ message: reason });
        });                                
    }

    const  getItems =(req,res)=>{        
        categoriaService.list()
        .then((rows)=>{
            res.status(200).send({result: rows})
        })
        .catch((reason)=>{        
            res.status(400).send({message: reason})
        })    
    }

    const  getLista =(req,res)=>{
        categoriaService.lista()
        .then((rows)=>{
            res.status(200).send({result: rows})
        })
        .catch((reason)=>{        
            res.status(400).send({message: reason})
        })    
    }
module.exports={    
    dataCategorias,
    searchCategoria,
    saveCategoria,
    setUpdate,
    setDelete,
    getItem,
    getItems,
    getLista
}