import db from "../../src/models";
const bcrypt = require('bcrypt')
import { verifiDBNull } from '../../functions/env'
import usuarioService from "../services/usuarioService";


    const  loginUsuario =(req,res) =>{     
        
        usuarioService.login(req.body)
        .then((user)=>{
            res.status(200).send({result: {user:user}})            
        })
        .catch((reason)=>{
            res.status(400).send({message: reason})
        })
        
    }

    const  dataUsuarios =(req, res)=>{        
        usuarioService.data(req.params.page,req.params.num,req.params.prop,req.params.value)
        .then((rows)=>{            
            res.status(200).send({message: "lista usuarios", result: rows})
        })
        .catch((reason)=>{
            console.log(reason)
            res.status(400).send({message: reason})
        })
    }

    const  searchUsuario =(req,res)=>{
        const {prop, value } = req.body
        let newValue = verifiDBNull(value)
        usuarioService.search(prop,newValue)
        .then((rows)=>{
            res.status(200).send({message: rows})
        })
        .catch((reason)=>{            
            res.status(400).send({message: reason})
        })
    }

    const  saveUsuario=(req, res)=>{
        const {username} = req.body        
        usuarioService.single(username)
        .then((user)=>{
            if(!user){
                usuarioService.create(req.body)
                .then((row)=>{
                    res.status(200).send({message: "usuario registrado",result:row})
                })  
                .catch((reason) => {
                    console.log(reason)
                    res.status(400).send({ message: reason });
                });               
            }else{
                    res.status(400).send({message: "usuario existe"})
            }
        })
        .catch((reason) => {
            console.log(reason)
            res.status(400).send({ message: reason });
        });
    }

    const  setUpdate=(req, res)=>{     
        if(req.params.tipo === 'unit')
        {
            usuarioService.update(req.body,req.params.id)
            .then((row)=>{            
               usuarioService.item(req.params.id)
                .then((xrow) => { 
                    res.status(200).send({message: "usuario actualizado",result:xrow})               
              })
                .catch((reason) => {
                res.status(400).send({ message: reason });
              });                        
            })
            .catch((reason)=>{            
                res.status(400).send({message: reason})
            })    
        }else{
            const { password } = req.body            
            let user={
                password : bcrypt.hashSync(password,bcrypt.genSaltSync(10),null)
            }
            usuarioService.update(user,req.params.id)
            .then((row)=>{            
               usuarioService.item(req.params.id)
                .then((xrow) => { 
                    res.status(200).send({message: "usuario actualizado",result:xrow})               
              })
                .catch((reason) => {
                res.status(400).send({ message: reason });
              });                        
            })
            .catch((reason)=>{            
                res.status(400).send({message: reason})
            })
        }      
    }

    const  getItem=(req, res)=>{                        
        usuarioService.item(req.params.id)
        .then((xrow) => { 
            res.status(200).send({message: "usuario actualizado",result:xrow})               
        })
        .catch((reason) => {            
            res.status(400).send({ message: reason });
        });                                
    }

    const  getItems =(req,res)=>{
        usuarioService.items()
        .then((rows)=>{
            res.status(200).send({result: rows})
        })
        .catch((reason)=>{        
            res.status(400).send({message: reason})
        })    
    }
module.exports={
    loginUsuario,
    dataUsuarios,
    searchUsuario,
    saveUsuario,
    setUpdate,
    getItem,
    getItems
}