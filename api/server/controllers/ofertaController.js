import { verifiDBNull } from '../../functions/env'
import ofertaService from "../services/ofertaService";

    const  dataOfertas =(req, res)=>{        
        ofertaService.data(req.params.page,req.params.num,req.params.prop,req.params.value)
        .then((rows)=>{            
            res.status(200).send({message: "lista ofertas", result: rows})
        })
        .catch((reason)=>{
            console.log(reason)
            res.status(400).send({message: reason})
        })
    }

    const  searchOferta =(req,res)=>{
        const {prop, value } = req.body
        let newValue = verifiDBNull(value)
        ofertaService.search(prop,newValue)
        .then((rows)=>{
            res.status(200).send({message: rows})
        })
        .catch((reason)=>{            
            res.status(400).send({message: reason})
        })
    }
    

    const saveOferta=(req, res)=>{
        const { clienteId } = req.body
        ofertaService.create(req.body)
          .then((row)=>{
            ofertaService.data(1,12,clienteId,clienteId)
              .then((rows)=>{
                res.status(200).send({message: "lista ofertas", result: rows})
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
        const { clienteId } = req.body  
        ofertaService.item(req.params.id)
        .then((xitem)=>{        
            ofertaService._delete(req.params.id)
            .then((xrow)=>{
                ofertaService.data(1,12,xitem.clienteId,xitem.clienteId)
                .then((rows)=>{
                    res.status(200).send({message: "lista ofertas", result: rows})
                })
                .catch((reason) => {
                    res.status(400).send({ message: reason });
                });
            })
            .catch((reason)=>{
                res.status(400).send({message: reason})
            })    
        })
    .catch((reason)=>{
        res.status(400).send({message: reason})
    })    
}

    const  setUpdate=(req, res)=>{ 
        const { clienteId } = req.body  
        ofertaService.item
        .then((xitem)=>{         
            ofertaService.update(req.body,req.params.id)
            .then((row)=>{            
                ofertaService.data(1,12,xitem.clienteId,xitem.clienteId)
                .then((rows)=>{
                  res.status(200).send({message: "lista ofertas", result: rows})
                })
                .catch((reason) => {
                  res.status(400).send({ message: reason });
                });                         
            })
            .catch((reason)=>{            
                res.status(400).send({message: reason})
            }) 
        })
        .catch((reason)=>{
            res.status(400).send({message: reason})
        })                  
    }

    const  getItem=(req, res)=>{                        
        ofertaService.item(req.params.id)
        .then((xrow) => { 
            res.status(200).send({message: "oferta actualizado",result:xrow})               
        })
        .catch((reason) => {            
            res.status(400).send({ message: reason });
        });                                
    }

    const  getItems =(req,res)=>{
        ofertaService.items()
        .then((rows)=>{
            res.status(200).send({result: rows})
        })
        .catch((reason)=>{        
            res.status(400).send({message: reason})
        })    
    }
    const  oferts =(req, res)=>{        
        ofertaService.oferts(req.params.page,req.params.num,req.params.prop,req.params.value)
        .then((rows)=>{            
            res.status(200).send({message: "lista ofertas", result: rows})
        })
        .catch((reason)=>{
            console.log(reason)
            res.status(400).send({message: reason})
        })
    }
    const  seti =(req, res)=>{                
        const { pagina, tipo, id } = req.body        
        ofertaService.item(id)
        .then((xitem)=>{            
            let iok ={
                id: id,
                likes : tipo === 'like' ? parseInt(xitem.likes) + 1 : xitem.likes,
                views : tipo === 'dislike' ? parseInt(xitem.views) + 1 : xitem.views
            }
            ofertaService.update(iok,id)
            .then((xx)=>{
                ofertaService.oferts(pagina,3,req.params.prop,req.params.value)
                .then((rows)=>{            
                    res.status(200).send({message: "lista ofertas", result: rows})
                })
                .catch((reason)=>{
                    console.log(reason)
                    res.status(400).send({message: reason})
                })
            })
            .catch((reason)=>{
                console.log(reason)
                res.status(400).send({message: reason})
            })            
        })       
        .catch((reason)=>{
            console.log(reason)
            res.status(400).send({message: reason})
        })                
      }
module.exports={    
    dataOfertas,
    searchOferta,
    saveOferta,
    setUpdate,
    setDelete,
    getItem,
    getItems,
    oferts,
    seti
}