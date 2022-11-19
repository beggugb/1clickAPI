const sortArray = require('sort-array')
import { verifiDBNull, verOpen } from '../../functions/env'
class formatear {
    static unificar(data1,latitude,longitude) {          
      const newData = []        
       data1.map((item) =>{      
         let r = item.horario.tipo !== 'horario' ? item.horario.tipo: verOpen(item.horario.hinicio,item.horario.hfin)      
         let tem = {
            id : item.id,
            nombres : item.nombres,
            filename : item.filename,
            direccion : item.direccion,
            descripcion : item.descripcion,		
            paqueteId  : item.paqueteId,
            celular : item.celular,
	        portada: item.portada,	 
            telefono : item.telefono,	            
            kilometros : parseFloat(getDistanceBetweenPoints(item.latitude,item.longitude,latitude,longitude) * 0.001).toFixed(2),
            latitude : parseFloat(item.latitude),
            longitude : parseFloat(item.longitude),	
            hinicio : item.horario.hinicio,
            hfin : item.horario.hfin,
            views : item.views,
            likes : item.likes,
            categoriaId: item.categoriaId,
            categoria: item.categoria.nombre,
            icon: item.categoria.icon,
            estado : r	                 
         }     
            newData.push(tem)                        
            })   
            return sortArray(newData, { by: 'kilometros',order: 'asc' })
    }   
     
}
function getDistanceBetweenPoints(lat1, lng1, lat2, lng2){
    // El radio del planeta tierra en metros.
    let R = 6378137;
    let dLat = degreesToRadians(lat2 - lat1);
    let dLong = degreesToRadians(lng2 - lng1);
    let a = Math.sin(dLat / 2)
            *
            Math.sin(dLat / 2) 
            +
            Math.cos(degreesToRadians(lat1)) 
            * 
            Math.cos(degreesToRadians(lat1)) 
            *
            Math.sin(dLong / 2) 
            * 
            Math.sin(dLong / 2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c;

    return distance;
}
function degreesToRadians(degrees){
    return degrees * Math.PI / 180;
}
export default formatear;
