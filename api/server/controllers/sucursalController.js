import db from "../../src/models";
const bcrypt = require('bcrypt')
import { verifiDBNull, verOpen } from '../../functions/env'
import sucursalService from "../services/sucursalService";
import sorarioService from "../services/sorarioService"

    const  dataSucursales =(req, res)=>{       
        var dias =["domingo","lunes","martes","miércoles","jueves","viernes","sábado"]
        var dayName = dias[new Date().getDay()];          
        sucursalService.data(req.params.page,req.params.num,req.params.prop,dayName)
        .then((rows)=>{                  
            let newItems = rows.data.map((it)=>{
                let r = it.sorario.tipo !== 'horario' ? it.sorario.tipo: verOpen(it.sorario.hinicio,it.sorario.hfin) 
                let iok={
                    id: it.id,
                    nombre: it.nombre,
                    direccion: it.direccion,      
                    telefono: it.telefono,
                    celular: it.celular,
                    hinicio : it.sorario.hinicio,              
                    hfin : it.sorario.hfin,
                    dia: it.sorario.dia,
                    clienteId: it.clienteId,
                    latitude: it.latitude,
                   longitude: it.longitude,
                    estado : r
                }                
                return iok
            })                   
            res.status(200).send({message: "lista sucursals", result: {total:rows.total,pagina:rows.pagina,paginas:rows.paginas,data:newItems} })
        })
        .catch((reason)=>{
            console.log(reason)
            res.status(400).send({message: reason})
        })
    }

    const  searchSucursal =(req,res)=>{
        const {prop, value } = req.body
        let newValue = verifiDBNull(value)
        sucursalService.search(prop,newValue)
        .then((rows)=>{
            res.status(200).send({message: rows})
        })
        .catch((reason)=>{            
            res.status(400).send({message: reason})
        })
    }
    

    const saveSucursal=(req, res)=>{
        var ddias =["domingo","lunes","martes","miércoles","jueves","viernes","sábado"]
        var dayName = ddias[new Date().getDay()];
        let dias = [
            {dia:"lunes",hinicio:"08:00",hfin:"18:00",sucursalId:0,tipo:'horario'},
            {dia:"martes",hinicio:"08:00",hfin:"18:00",sucursalId:0,tipo:'horario'},
            {dia:"miércoles",hinicio:"08:00",hfin:"18:00",sucursalId:0,tipo:'horario'},
            {dia:"jueves",hinicio:"08:00",hfin:"18:00",sucursalId:0,tipo:'horario'},
            {dia:"viernes",hinicio:"08:00",hfin:"18:00",sucursalId:0,tipo:'horario'},
            {dia:"sábado",hinicio:"08:00",hfin:"18:00",sucursalId:0,tipo:'horario'},
            {dia:"domingo",hinicio:"08:00",hfin:"18:00",sucursalId:0,tipo:'horario'}
        ]
        const { clienteId } = req.body
        sucursalService.create(req.body)
          .then((row)=>{            
            dias.map((itt)=>{
                itt.sucursalId = row.id
            })
            
            sorarioService.create(dias)
            .then((ing)=>{
              sucursalService.data(1,12,clienteId,dayName)
                .then((rows)=>{
                    let newItems = rows.data.map((it)=>{
                        let r = it.sorario.tipo !== 'horario' ? it.sorario.tipo: verOpen(it.sorario.hinicio,it.sorario.hfin) 
                        let iok={
                            id: it.id,
                            nombre: it.nombre,
                            direccion: it.direccion,      
                            telefono: it.telefono,
                            celular: it.celular,
                            hinicio : it.sorario.hinicio,              
                            hfin : it.sorario.hfin,
                            dia: it.sorario.dia,
                            clienteId: it.clienteId,
                            latitude: it.latitude,
                                longitude: it.longitude,
                            estado : r
                        }                
                        return iok
                    })
                    res.status(200).send({message: "lista sucursals", result: {total:rows.total,pagina:rows.pagina,paginas:rows.paginas,data:newItems} })
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
                      
          })  
          .catch((reason) => {
            console.log(reason)
            res.status(400).send({ message: reason });
          });                       
    }

    const setDelete = (req,res) =>{     
        var dias =["domingo","lunes","martes","miércoles","jueves","viernes","sábado"]
        var dayName = dias[new Date().getDay()];     
        sucursalService.item(req.params.id)
        .then((xrow)=>{ 
            sorarioService._delete(req.params.id)
            .then((xdel)=>{ 
                sucursalService._delete(req.params.id)
                    .then((drow)=>{
                        sucursalService.data(1,12,xrow.clienteId,dayName)
                        .then((rows)=>{
                            let newItems = rows.data.map((it)=>{
                                let r = it.sorario.tipo !== 'horario' ? it.sorario.tipo: verOpen(it.sorario.hinicio,it.sorario.hfin) 
                                let iok={
                                    id: it.id,
                                    nombre: it.nombre,
                                    direccion: it.direccion,      
                                    telefono: it.telefono,
                                    celular: it.celular,
                                    hinicio : it.sorario.hinicio,              
                                    hfin : it.sorario.hfin,
                                    dia: it.sorario.dia,
                                    clienteId: it.clienteId,
                                    latitude: it.latitude,
                                longitude: it.longitude,
                                    estado : r
                                }                
                                return iok
                            })
                            res.status(200).send({message: "lista sucursals", result: {total:rows.total,pagina:rows.pagina,paginas:rows.paginas,data:newItems} })
                        })
                        .catch((reason) => {   
                            console.log(reason)            
                            res.status(400).send({ message: reason });
                        });
                    })
                    .catch((reason) => {
                        res.status(400).send({ message: reason });
                    });

            })
            .catch((reason)=>{
                res.status(400).send({message: reason})
            })                          
        })            
}

const setUpdate = (req,res) =>{     
    var dias =["domingo","lunes","martes","miércoles","jueves","viernes","sábado"]
    var dayName = dias[new Date().getDay()];      
    const { clienteId } = req.body
    console.log(clienteId)
     sucursalService.update(req.body,req.params.id)
        .then((xdel)=>{             
            sucursalService.data(1,12,clienteId,dayName)            
                .then((rows)=>{
                        let newItems = rows.data.map((it)=>{
                            let r = it.sorario.tipo !== 'horario' ? it.sorario.tipo: verOpen(it.sorario.hinicio,it.sorario.hfin) 
                            let iok={
                                id: it.id,
                                nombre: it.nombre,
                                direccion: it.direccion,      
                                telefono: it.telefono,
                                celular: it.celular,
                                hinicio : it.sorario.hinicio,              
                                hfin : it.sorario.hfin,
                                dia: it.sorario.dia,
                                clienteId: it.clienteId,
                                latitude: it.latitude,
                                longitude: it.longitude,
                                estado : r
                            }                
                            return iok
                        })
                        res.status(200).send({message: "lista sucursals", result: {total:rows.total,pagina:rows.pagina,paginas:rows.paginas,data:newItems} })
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
    const  getItem=(req, res)=>{                        
        sucursalService.item(req.params.id)
        .then((xrow) => { 
            res.status(200).send({message: "sucursal actualizado",result:xrow})               
        })
        .catch((reason) => {            
            res.status(400).send({ message: reason });
        });                                
    }

    const  getItems =(req,res)=>{
        sucursalService.items()
        .then((rows)=>{
            res.status(200).send({result: rows})
        })
        .catch((reason)=>{        
            res.status(400).send({message: reason})
        })    
    }
module.exports={    
    dataSucursales,
    searchSucursal,
    saveSucursal,
    setUpdate,
    setDelete,
    getItem,
    getItems
}