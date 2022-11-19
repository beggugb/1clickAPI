import db from "../../src/models"
import jwt from "jsonwebtoken"
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
import { isNUll, isNUllArray } from "../../functions/env"
const { Cajero, Cliente } = db;

const data = (pag,num,prop,value) =>{  
    return new Promise((resolve,reject)=>{        
        let page = parseInt(pag)
        let der = num * page - num
        Cajero.findAndCountAll({
            raw:true,
            nest: true,
            offset: der,
            limit:num,
            order:[['id','ASC']],
            where:{ clienteId: prop },
            attributes:['id','icon','latitude','longitude','direccion','clienteId','nombre'],
            include:[
                {model:Cliente,as:"cliente",attributes:["id","nombres","filename"]},                                              
            ]
        })
        .then((rows)=>resolve({
            paginas: isNUllArray(Math.ceil(rows.count/num)),
            pagina: page,
            total: isNUll(rows.count),
            data:isNUll(rows.rows)
        }))
        .catch((reason)=>reject({message: reason.message}))
    })
}

const create = (value) =>{
    return new Promise((resolve, reject)=>{
        Cajero.create(value)
        .then((row)=> resolve(row))
        .catch((reason)=>reject({message: reason}))
    })
}

const update = (value,id) =>{
    return new Promise((resolve, reject)=>{
        Cajero.update(value,{
            where: { id: Number(id)}
        })
        .then((row)=>resolve(row))
        .catch((reason)=>reject({message: reason}))
    })
}

 
const item = (pky) =>{
    return new Promise((resolve, reject)=>{
        Cajero.findByPk(pky,{
            raw:true,
            res:true,                    
            
        })
        .then((row)=>resolve(row))
        .catch((reason)=>reject({message: reason}))
    })
}

const items = (pky) =>{
    return new Promise((resolve, reject)=>{
        Cajero.findByPk(pky,{
            raw:true,
            res:true,                    
            
        })
        .then((row)=>resolve(row))
        .catch((reason)=>reject({message: reason}))
    })
}

const single = (username) =>{
    return new Promise((resolve, reject)=>{
        Cajero.findOne({
            where:{ username: username },
            attributes:['id','nombre']            
        })
        .then((row)=>resolve(row))
        .catch((reason)=>reject({message: reason}))
    })
}


const list = () =>{
    return Promise((resolve, reject)=>{
        Cajero.findAll({
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
        Cajero.findAll({
            raw:true,
            nest: true,
            offset: 0,
            limit:15,
            order:[[prop,'ASC']],
            attributes:['id','nombre','estado','icon','nombre'],            
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
        Cajero.destroy({
            where : { id: Number(datoId)}
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const dataLista = (value) =>{  
    console.log(value)
    return new Promise((resolve,reject)=>{                
        Cajero.findAll({
            raw:true,
            nest: true,            
            order:[['id','ASC']],
            where:{ clienteId: value },
            attributes:['id','icon','latitude','longitude','direccion','clienteId','nombre'],
            include:[
                {model:Cliente,as:"cliente",attributes:["id","nombres","filename"]},                                              
            ]
        })
        .then((rows)=>resolve(rows))
        .catch((reason)=>reject({message: reason.message}))
    })
}


module.exports = {
    item,    
    create,
    single,
    list,
    update,    
    data,
    search,
    _delete,
    dataLista

}

