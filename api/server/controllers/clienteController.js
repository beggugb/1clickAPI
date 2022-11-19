import db from "../../src/models";
const bcrypt = require('bcrypt')
import formatear from "../utils/formatear"
import { verifiDBNull, verOpen } from '../../functions/env'
import clienteService from "../services/clienteService";
import horarioService from "../services/horarioService"
import sucursalService from "../services/sucursalService"




    const  dataClientes =(req, res)=>{        
        clienteService.data(req.params.page,req.params.num,req.params.prop,req.params.value)
        .then((rows)=>{            
            res.status(200).send({message: "lista clientes", result: rows})
        })
        .catch((reason)=>{
           
            res.status(400).send({message: reason})
        })
    }

    const  searchCliente =(req,res)=>{
        const {prop, value } = req.body                
        let newValue = verifiDBNull(value)
        clienteService.search(prop,newValue)
        .then((rows)=>{
          
            res.status(200).send({result: rows})
        })
        .catch((reason)=>{            
            res.status(400).send({message: reason})
        })
    }

    const  saveCliente=(req, res)=>{  
        let dias = [
            {dia:"lunes",hinicio:"08:00",hfin:"18:00",clienteId:0,tipo:'horario'},
            {dia:"martes",hinicio:"08:00",hfin:"18:00",clienteId:0,tipo:'horario'},
            {dia:"miércoles",hinicio:"08:00",hfin:"18:00",clienteId:0,tipo:'horario'},
            {dia:"jueves",hinicio:"08:00",hfin:"18:00",clienteId:0,tipo:'horario'},
            {dia:"viernes",hinicio:"08:00",hfin:"18:00",clienteId:0,tipo:'horario'},
            {dia:"sábado",hinicio:"08:00",hfin:"18:00",clienteId:0,tipo:'horario'},
            {dia:"domingo",hinicio:"08:00",hfin:"18:00",clienteId:0,tipo:'horario'}
        ]
         clienteService.create(req.body)
         .then((row)=>{
            dias.map((itt)=>{
                itt.clienteId = row.id
            })
            horarioService.create(dias)
                .then((ing)=>{
                    
                    res.status(200).send({message: "cliente registrado",result:row})
                })            

           })  
          .catch((reason) => {
               
                res.status(400).send({ message: reason });
           });                       
    }

    const  setUpdate=(req, res)=>{     
        if(req.params.tipo === 'unit')
        {
            clienteService.update(req.body,req.params.id)
            .then((row)=>{            
               clienteService.item(req.params.id)
                .then((xrow) => { 
                    res.status(200).send({message: "cliente actualizado",result:xrow})               
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
            clienteService.update(user,req.params.id)
            .then((row)=>{            
               clienteService.item(req.params.id)
                .then((xrow) => { 
                    res.status(200).send({message: "cliente actualizado",result:xrow})               
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
        let dayName = new Date().toLocaleDateString('es-AR', { weekday:"long"})                      
        clienteService.item(req.params.id)
        .then((xrow) => { 
            horarioService.getHorarios(req.params.id,dayName)
            .then((item)=>{          
                if(item) {
                    let r = item.tipo !== 'horario' ? item.tipo: verOpen(item.hinicio,item.hfin) 
                    xrow.hinicio  = item.hinicio
                    xrow.hfin     = item.hfin
                    xrow.dia      = item.dia
                    xrow.estado   = r                
                }                
                res.status(200).send({message: "cliente actualizado",result: xrow})               
            })            
        })
        .catch((reason) => {  
                
            res.status(400).send({ message: reason });
        });                                
    }

    

    const  getItems =(req,res)=>{
        clienteService.items()
        .then((rows)=>{
            res.status(200).send({result: rows})
        })
        .catch((reason)=>{        
            res.status(400).send({message: reason})
        })    
    }
    /** Consultas */
    const consulta =(req, res) =>{                 
        var dias =["domingo","lunes","martes","miércoles","jueves","viernes","sábado"]
        var dayName = dias[new Date().getDay()];                
        clienteService.consulta(req.params.page,req.params.num,req.params.ciudad,req.params.prop,dayName)             
          .then((clientes) => {                         
            let latitude  = req.params.latitude
            let longitude = req.params.longitude
            const dato = formatear.unificar(clientes.data,latitude,longitude)
            res.status(200).send({ result: {paginas: clientes.paginas,pagina:clientes.pagina,total:clientes.total,data:dato }});
            })                     
          .catch((reason) => {
  
            res.status(400).send({ reason });
          });   
    }
    const getSearch = (req, res) =>{ 
        var dias =["domingo","lunes","martes","miércoles","jueves","viernes","sábado"]
        var dayName = dias[new Date().getDay()];         
        const { page,num,categoria,nombre,latitude, longitude } = req.body    
        clienteService.getSearch(page,num,categoria,nombre,dayName)                
          .then((clientes) => {
            const dato = formatear.unificar(clientes.data,latitude,longitude) 
            res.status(200).send({ result: {paginas: clientes.paginas,pagina:clientes.pagina,total:clientes.total,data:dato }});
               
            })                     
          .catch((reason) => {
           
            res.status(400).send({ reason });
          });
    }  
    
    const  getDetalle=(req, res)=>{  
        var dias =["domingo","lunes","martes","miércoles","jueves","viernes","sábado"]
        var dayName = dias[new Date().getDay()];          
        
        clienteService.itemDetalle(req.params.id,dayName)
        .then((xitem) => {  
            let newItem = xitem.horario
            let r = xitem.horario.tipo !== 'horario' ? xitem.horario.tipo: verOpen(xitem.hinicio,xitem.hfin)                        
            newItem.estado = r
            
            let nView = {
                views : parseInt(xitem.views) + 1
            }
            clienteService.update(nView,req.params.id)
            .then((tt)=>{
                res.status(200).send({message: "cliente actualizado",result: { item:xitem }})                           
            })
            .catch((reason) => {  
                        
                res.status(400).send({ message: reason });
            });
            
        })
        .catch((reason) => {  
                  
            res.status(400).send({ message: reason });
        });                                
    }

    const  cajeros =(req,res)=>{
        clienteService.cajeros()
        .then((rows)=>{
            res.status(200).send({result: rows})
        })
        .catch((reason)=>{   
              
            res.status(400).send({message: reason})
        })    
    }

    /*
    const  getDetalle=(req, res)=>{  
        var dias =["domingo","lunes","martes","miércoles","jueves","viernes","sábado"]
        var dayName = dias[new Date().getDay()];          
        Promise.all([
            clienteService.itemDetalle(req.params.id,dayName),            
            sucursalService.lista(req.params.id,dayName)
        ])       
        .then(([xitem,xsucursales]) => {  
            let newItem = xitem.horario
            let r = xitem.horario.tipo !== 'horario' ? xitem.horario.tipo: verOpen(xitem.hinicio,xitem.hfin)                        
            newItem.estado = r
            
            let nView = {
                views : parseInt(xitem.views) + 1
            }
            clienteService.update(nView,req.params.id)
            .then((tt)=>{
                res.status(200).send({message: "cliente actualizado",result: { item:xitem, sucursales:xsucursales }})                           
            })
            .catch((reason) => {  
                console.log(reason)          
                res.status(400).send({ message: reason });
            });
            
        })
        .catch((reason) => {  
            console.log(reason)          
            res.status(400).send({ message: reason });
        });                                
    }
     */


module.exports={    
    dataClientes,
    searchCliente,
    saveCliente,
    setUpdate,
    getItem,
    getDetalle,
    getItems,
    consulta,
    getSearch,
    cajeros
}
