const db = require('../../src/models');
const sequelize = require('sequelize');

const sharp = require('sharp')
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null,'api/public/images/trash')
    },
    filename: function (req,file,cb){
        cb(null,Date.now()+ '-'+ file.originalname)
    }
})

var upload = multer({storage: storage}).single('file')


const oferta = (req, res) =>{
    return new Promise((resolve,reject)=>{
        upload(req,res,function(err){
            if(err instanceof multer.MulterError){
                resolve(err)
            }else if(err){
                resolve(err)
            }
            sharp(req.file.path).resize({height: 450}).toFile('./api/public/images/ofertas/lg/'+req.file.filename);
            sharp(req.file.path).resize({height: 250}).toFile('./api/public/images/ofertas/md/'+req.file.filename);
            sharp(req.file.path).resize({height: 120}).toFile('./api/public/images/ofertas/sm/'+req.file.filename);
            resolve(req.file)
        })
    })
}

const cliente = (req, res) =>{
    return new Promise((resolve,reject)=>{
        upload(req,res,function(err){
            if(err instanceof multer.MulterError){
                resolve(err)
            }else if(err){
                resolve(err)
            }
            sharp(req.file.path).resize({height: 350}).toFile('./api/public/images/clientes/lg/'+req.file.filename);
            sharp(req.file.path).resize({height: 150}).toFile('./api/public/images/clientes/md/'+req.file.filename);
            sharp(req.file.path).resize({height: 80}).toFile('./api/public/images/clientes/sm/'+req.file.filename);
            resolve(req.file)
        })
    })
}

const sucursal = (req, res) =>{
    return new Promise((resolve,reject)=>{
        upload(req,res,function(err){
            if(err instanceof multer.MulterError){
                resolve(err)
            }else if(err){
                resolve(err)
            }
            sharp(req.file.path).resize({height: 450}).toFile('./api/public/images/sucursales/lg/'+req.file.filename);
            sharp(req.file.path).resize({height: 250}).toFile('./api/public/images/sucursales/md/'+req.file.filename);
            sharp(req.file.path).resize({height: 120}).toFile('./api/public/images/sucursales/sm/'+req.file.filename);
            resolve(req.file)
        })
    })
}

const portada = (req, res) =>{
    return new Promise((resolve,reject)=>{
        upload(req,res,function(err){
            if(err instanceof multer.MulterError){
                resolve(err)
            }else if(err){
                resolve(err)
            }
            sharp(req.file.path).resize({height: 550}).toFile('./api/public/images/portadas/lg/'+req.file.filename);
            sharp(req.file.path).resize({height: 350}).toFile('./api/public/images/portadas/md/'+req.file.filename);
            sharp(req.file.path).resize({height: 220}).toFile('./api/public/images/portadas/sm/'+req.file.filename);
            resolve(req.file)
        })
    })
}


module.exports={    
    cliente,
    sucursal,
    portada,
    oferta    
}
