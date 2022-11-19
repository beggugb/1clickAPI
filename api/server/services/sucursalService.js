import db from "../../src/models"
import jwt from "jsonwebtoken"
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
import { isNUll, isNUllArray } from "../../functions/env"
const { Sucursal, Sorario } = db;

const lista = (prop,value) =>{  
    return new Promise((resolve,reject)=>{                
        Sucursal.findAll({
            raw:true,
            nest: true,            
            order:[['nombre','ASC']],
            where:{ clienteId: prop },
            attributes:['id','nombre','estado','icon','direccion','hinicio','hfin','telefono','celular','tipo','latitude','longitude','clienteId'],           
            include:[
                { model:Sorario,
                  as:"sorario",
                  where:{ dia: value },
                },                                              
            ]
        })
        .then((rows)=>resolve(rows))
        .catch((reason)=>reject({message: reason.message}))
    })
}


const data = (pag,num,prop,value) =>{  
    return new Promise((resolve,reject)=>{        
        let page = parseInt(pag)
        let der = num * page - num
        Sucursal.findAndCountAll({
            raw:true,
            nest: true,
            offset: der,
            limit:num,
            order:[['nombre','ASC']],
            where:{ clienteId: prop },
            attributes:['id','nombre','estado','icon','direccion','hinicio','hfin','telefono','celular','tipo','latitude','longitude','clienteId'],           
            include:[
                { model:Sorario,
                  as:"sorario",
                  where:{ dia: value },
                },                                              
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
        Sucursal.create(value)
        .then((row)=> resolve(row))
        .catch((reason)=>reject({message: reason}))
    })
}

const update = (value,id) =>{
    return new Promise((resolve, reject)=>{
        Sucursal.update(value,{
            where: { id: Number(id)}
        })
        .then((row)=>resolve(row))
        .catch((reason)=>reject({message: reason}))
    })
}

 
const item = (pky) =>{
    return new Promise((resolve, reject)=>{
        Sucursal.findByPk(pky,{
            raw:true,
            res:true,                    
            
        })
        .then((row)=>resolve(row))
        .catch((reason)=>reject({message: reason}))
    })
}

const single = (username) =>{
    return new Promise((resolve, reject)=>{
        Sucursal.findOne({
            where:{ username: username },
            attributes:['id','nombre']            
        })
        .then((row)=>resolve(row))
        .catch((reason)=>reject({message: reason}))
    })
}


const list = () =>{
    return Promise((resolve, reject)=>{
        Sucursal.findAll({
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
        Sucursal.findAll({
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
        Sucursal.destroy({
            where : { id: Number(datoId)}
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}


module.exports = {
    item,    
    create,
    single,
    list,
    lista,
    update,    
    data,
    search,
    _delete

}

