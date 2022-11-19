import db from "../../src/models"
import jwt from "jsonwebtoken"
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
import { isNUll, isNUllArray } from "../../functions/env"
const { Horario } = db;

const create = (value) =>{
    return new Promise((resolve, reject) => {
        Horario.bulkCreate(value, { returning: false })
            .then((horarios) => resolve(horarios))
            .catch((reason) => reject(reason));
    });
}

const data = (prop) =>{  
    return new Promise((resolve,reject)=>{                
        Horario.findAll({
            raw:true,
            nest: true,            
            order:[['dia','ASC']],
            where:{ clienteId: prop },
            /*attributes:['id','nombre','estado','icon']*/
        })
        .then((rows)=>resolve(rows))
        .catch((reason)=>reject({message: reason.message}))
    })
}



const update = (value,id) =>{
    return new Promise((resolve, reject)=>{
        Horario.update(value,{
            where: { id: Number(id)}
        })
        .then((row)=>resolve(row))
        .catch((reason)=>reject({message: reason}))
    })
}

 
const item = (pky) =>{
    return new Promise((resolve, reject)=>{
        Horario.findByPk(pky,{
            raw:true,
            res:true,                    
            
        })
        .then((row)=>resolve(row))
        .catch((reason)=>reject({message: reason}))
    })
}

const single = (username) =>{
    return new Promise((resolve, reject)=>{
        Horario.findOne({
            where:{ username: username },
            attributes:['id','nombre']            
        })
        .then((row)=>resolve(row))
        .catch((reason)=>reject({message: reason}))
    })
}


const list = () =>{
    return Promise((resolve, reject)=>{
        Horario.findAll({
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
        Horario.findAll({
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
        Horario.destroy({
            where : { id: Number(datoId)}
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const getHorarios = (clienteId,day) => {        
    return new Promise((resolve, reject) => {            
      Horario.findOne({     
        raw: true,
        nest: true,               
        /*where: { clienteId: clienteId }*/
        where: {[Op.and]: [
            { clienteId: clienteId },             
            { dia: day},     
          ]},
        })
        .then((horarios) => resolve(horarios))
        .catch((reason) => reject(reason));
    });
  }


module.exports = {
    getHorarios,
    item,    
    create,
    single,
    list,
    update,    
    data,
    search,
    _delete

}

