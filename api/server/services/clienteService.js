import db from "../../src/models"
import jwt from "jsonwebtoken"
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
import { isNUll, isNUllArray } from "../../functions/env"
const { Cliente, Categoria, Horario } = db;

    const getSearch = (pag,num,categoria,nombres,value) =>{       
    return new Promise((resolve, reject) => {           
      const dia = new Date()  
      const dd = dia.getDay()
      let page = parseInt(pag)
      let icategoria = parseInt(categoria);
      let fcategoria = parseInt(categoria);	    
      let der = (num * page) - num;      
      if (categoria === 0 || categoria === null || categoria === '0' || categoria === 1 || categoria === '1') 
	    { fcategoria = 100	}	        
      let iName = '%' + nombres + '%'
      if (nombres === 0 || nombres === null || nombres === '0') { iName = '%' }
      
      Cliente.findAndCountAll({
        raw: true,
        nest: true,
	    offset: der,
        limit: num,    
        order: [["nombres", "ASC"]],  
        where: {
          [Op.and]: [                        
            { habilitado: { [Op.eq]: true } },                       
            { categoriaId: {[Op.between]: [icategoria, fcategoria ]}},
            { tags: { [Op.iLike]: iName } }
          ]
        },                
        include: [
            { 
                model: Horario,
                as:"horario",                             
                where : { dia: value }
            },
            { model:Categoria,as:"categoria",attributes:['id','nombre','icon']}
        ]     

      })
        .then((rows) =>
          resolve({
            paginas: isNUllArray(Math.ceil(rows.count/num)),
            pagina: page,
            total: isNUll(rows.count),
            data:isNUll(rows.rows)
          })
        )
        .catch((reason) => reject(reason));
    });
  }

const consulta = (pag,num,pciudad,categoria,value) =>{      
    let icategoria = parseInt(categoria);
      let fcategoria = parseInt(categoria);	
    if (categoria === 0 || categoria === null || categoria === '0' || categoria === 1 || categoria === '1') 
	{ fcategoria = 100	}	
    return new Promise((resolve,reject)=>{        
        let page = parseInt(pag)
        let der = num * page - num
        Cliente.findAndCountAll({
            raw:true,
            nest: true,
            offset: der,
            limit:num,
            order:[['nombres','ASC']],   
            where: {
                [Op.and]: [            
                  /*{ rolId: { [Op.eq]: 1 } },    */
	              { ciudad: { [Op.eq]: pciudad } },		
                  { habilitado: { [Op.eq]: true } },                       
                  { categoriaId: {[Op.between]: [icategoria, fcategoria ]}}
                ]
            },                    
            include:[ 
                { model:Horario,as:"horario",where:{ dia: value }},
                { model:Categoria,as:"categoria",attributes:['id','nombre','icon']}                                              
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
        Cliente.create(value)
        .then((row)=> resolve(row))
        .catch((reason)=>reject({message: reason}))
    })
}

const update = (value,id) =>{
    return new Promise((resolve, reject)=>{
        Cliente.update(value,{
            where: { id: Number(id)}
        })
        .then((row)=>resolve(row))
        .catch((reason)=>reject({message: reason}))
    })
}

const cajeros = () =>{  
    return new Promise((resolve,reject)=>{                
        Cliente.findAll({
            raw:true,
            nest: true,            
            order:[['nombres','asc']],
            attributes:['id','nombres','filename'],                        
            where: { tipo: "banco"}
        })
        .then((rows)=>resolve(rows))
        .catch((reason)=>reject({message: reason.message}))
    })
} 

const data = (pag,num,prop,value) =>{  
    return new Promise((resolve,reject)=>{        
        let page = parseInt(pag)
        let der = num * page - num
        Cliente.findAndCountAll({
            raw:true,
            nest: true,
            offset: der,
            limit:num,
            order:[[prop,value]],
            attributes:['id','nombres','direccion','filename','tipo','telefono','nit','portada'],            
            include:[
                {model:Categoria,as:"categoria",attributes:["id","nombre"]},                                              
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
const itemDetalle = (pky,day) =>{
    return new Promise((resolve, reject)=>{
        Cliente.findByPk(pky,{
            raw:true,
            nest:true,                    
            include:[
                {model:Categoria,as:"categoria",attributes:["id","nombre"]}, 
                { model:Horario,as:"horario",
                    where:{ dia: day },
                },                                                                                          
            ]
        })
        .then((row)=>resolve(row))
        .catch((reason)=>reject({message: reason}))
    })
}
const item = (pky) =>{
    return new Promise((resolve, reject)=>{
        Cliente.findByPk(pky,{
            raw:true,
            nest:true,                    
            include:[
                { model:Categoria,as:"categoria",attributes:["id","nombre"]},                                                                                                           
            ],            
        })
        .then((row)=>resolve(row))
        .catch((reason)=>reject({message: reason}))
    })
}

const single = (username) =>{
    return new Promise((resolve, reject)=>{
        Cliente.findOne({
            where:{ username: username },
            attributes:['id','nombres','username']            
        })
        .then((row)=>resolve(row))
        .catch((reason)=>reject({message: reason}))
    })
}


const list = () =>{
    return Promise((resolve, reject)=>{
        Cliente.findAll({
            raw:true,
            nest:true,
            order:[['nombres','ASC']],
            attributes: [['nombres','label'],['id','value']]
        })
        .then((rows)=>resolve(rows))
        .catch((reason)=>reject(reason))
    })
}


const login = (dato) =>{
    const { username, password } = dato
    return new Promise((resolve,reject)=>{
        Cliente.findOne({
            where: { username : { [Op.eq]: username}},
            attributes:['id','nombres','username','password'],                  
        })
        .then((user)=>{            
            if(!user){                
                resolve({
                    auth: false,
                    message: "Usuario no existe",
                    usuario: null
              })
            }else{                
                user.comparePassword(password,(err, isMatch)=>{
                    if(isMatch && !err){
                        let payload = { user_id: user.id, username:user.username }
                        let token   = jwt.sign(payload,"unity2022",{
                            expiresIn: "2629746000"
                        });
                        resolve({
                            auth: true,                            
                            message: "Acceso correcto",
                            usuario: user,
                            token: token
                        }) 
                    }else{
                        resolve({
                            auth: false,
                            message: "Contraseña incorrecta",
                            usuario: null
                        })
                    }
                })
            }
        })
        .catch((reason)=>({message: reason}))        
    })
}

const search = (prop,value) =>{
    return new Promise((resolve,reject) =>{                
        Cliente.findAndCountAll({
            raw:true,
            nest: true,
            offset: 0,
            limit:15,
            order:[[prop,'ASC']],
            attributes:['id','nombres','direccion','filename','tipo','telefono','nit','portada'],            
            include:[
                {model:Categoria,as:"categoria",attributes:["id","nombre"]},                                              
            ],          
            where: { [prop]:{ [Op.iLike]: value }}
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


module.exports = {
    item,    
    create,
    single,
    list,
    login,
    update,    
    data,
    search,
    consulta,
    getSearch,
    itemDetalle,
    cajeros
}

