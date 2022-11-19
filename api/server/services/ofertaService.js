import db from "../../src/models"
import jwt from "jsonwebtoken"
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
import { isNUll, isNUllArray } from "../../functions/env"
const { Ofertas, Cliente } = db;


const oferts = (pag,num,prop,value) =>{ 
    return new Promise((resolve,reject)=>{     
        let d     = new Date()
        let fcaja = (new Date(d + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]            
        let page = parseInt(pag)
        let der = num * page - num
        Ofertas.findAndCountAll({
            raw:true,
            nest: true,
            offset: der,
            limit:num,
            order:[['id','DESC']],   
            where: { vfin: { [Op.gt]: fcaja }},         
            include:[
                {model:Cliente,as:"cliente",attributes:["id","nombres","direccion","telefono","web","facebook","instagram"]},                                              
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

const data = (pag,num,prop,value) =>{  
    return new Promise((resolve,reject)=>{        
        let page = parseInt(pag)
        let der = num * page - num
        Ofertas.findAndCountAll({
            raw:true,
            nest: true,
            offset: der,
            limit:num,
            order:[['id','ASC']],
            where:{ clienteId: prop }
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
        Ofertas.create(value)
        .then((row)=> resolve(row))
        .catch((reason)=>reject({message: reason}))
    })
}

const update = (value,id) =>{
    return new Promise((resolve, reject)=>{        
        Ofertas.update(value,{
            where: { id: Number(id)}
        })
        .then((row)=>resolve(row))
        .catch((reason)=>reject({message: reason}))
    })
}

 
const item = (pky) =>{
    return new Promise((resolve, reject)=>{
        Ofertas.findByPk(pky,{
            raw:true,
            res:true,                    
            
        })
        .then((row)=>resolve(row))
        .catch((reason)=>reject({message: reason}))
    })
}

const single = (username) =>{
    return new Promise((resolve, reject)=>{
        Ofertas.findOne({
            where:{ username: username },
            attributes:['id','nombre']            
        })
        .then((row)=>resolve(row))
        .catch((reason)=>reject({message: reason}))
    })
}


const list = () =>{
    return Promise((resolve, reject)=>{
        Ofertas.findAll({
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
        Ofertas.findAll({
            raw:true,
            nest: true,
            offset: 0,
            limit:15,
            order:[[prop,'ASC']],              
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
        Ofertas.destroy({
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
    update,    
    data,
    search,
    _delete,
    oferts

}

