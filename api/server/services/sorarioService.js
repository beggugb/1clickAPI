import db from "../../src/models"
import jwt from "jsonwebtoken"
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
import { isNUll, isNUllArray } from "../../functions/env"
const { Sorario } = db;

const create = (value) =>{
    return new Promise((resolve, reject) => {
        Sorario.bulkCreate(value, { returning: false })
            .then((sorarios) => resolve(sorarios))
            .catch((reason) => reject(reason));
    });
}

const data = (prop) =>{  
    return new Promise((resolve,reject)=>{                
        Sorario.findAll({
            raw:true,
            nest: true,            
            order:[['id','ASC']],
            where:{ sucursalId: prop },
            /*attributes:['id','nombre','estado','icon']*/
        })
        .then((rows)=>resolve(rows))
        .catch((reason)=>reject({message: reason.message}))
    })
}

const update = (value,id) =>{
    return new Promise((resolve, reject)=>{
        Sorario.update(value,{
            where: { id: Number(id)}
        })
        .then((row)=>resolve(row))
        .catch((reason)=>reject({message: reason}))
    })
}

 
const item = (pky) =>{
    return new Promise((resolve, reject)=>{
        Sorario.findByPk(pky,{
            raw:true,
            res:true,                    
            
        })
        .then((row)=>resolve(row))
        .catch((reason)=>reject({message: reason}))
    })
}

const single = (username) =>{
    return new Promise((resolve, reject)=>{
        Sorario.findOne({
            where:{ username: username },
            attributes:['id','nombre']            
        })
        .then((row)=>resolve(row))
        .catch((reason)=>reject({message: reason}))
    })
}


const list = () =>{
    return Promise((resolve, reject)=>{
        Sorario.findAll({
            raw:true,
            nest:true,
            order:[['nombre','ASC']],
            attributes: [['nombre','label'],['id','value']]
        })
        .then((rows)=>resolve(rows))
        .catch((reason)=>reject(reason))
    })
}

const search = (prop,value) =>{
    return new Promise((resolve,reject) =>{        
        Sorario.findAll({
            raw:true,
            nest: true,
            offset: 0,
            limit:15,
            order:[[prop,'ASC']],
            attributes:['id','nombre','estado','icon'],            
            where: {[Op.and]: [
                { [prop]:{ [Op.iLike]: value }},             
                { id: { [Op.gt]: 1 }},     
              ]},
        })
        .then((rows)=>resolve({
            paginas: isNUllArray(Math.ceil(rows.count/15)),
            pagina: 1,
            total: isNUll(rows.count),
            data:isNUll(rows.rows)
        }))
        .catch((reason)=>reject({message: reason.message})) 
    })
}

const _delete = (datoId) =>{
    return new Promise((resolve,reject)=>{
        Sorario.destroy({
            where : { sucursalId: Number(datoId)}
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const getSorarios = (sucursalId,day) => {        
    return new Promise((resolve, reject) => {            
      Sorario.findOne({     
        raw: true,
        nest: true,                       
        where: {[Op.and]: [
            { sucursalId: sucursalId },             
            { dia: day},     
          ]},
          
        })
        .then((sorarios) => resolve(sorarios))
        .catch((reason) => reject(reason));
    });
  }


module.exports = {
    getSorarios,
    item,    
    create,
    single,
    list,
    update,    
    data,
    search,
    _delete

}

