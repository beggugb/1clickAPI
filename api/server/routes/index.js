import usuarios from './usuarioRoute'
import clientes from './clienteRoute'
import categorias from './categoriaRoute'
import files from './fileRouter'
import sucursales from './sucursalRoute'
import horario from './horarioRoute'
import sorario from './sorarioRoute'
import cajero from './cajeroRoute'
import consultas from './consultasRoute'
import ofertas from './ofertaRoute'
import oferts from './ofertasRoute'

export default(app) =>{
  app.use('/api/usuarios',usuarios)  
  app.use('/api/clientes',clientes)
  app.use('/api/categorias',categorias)
  app.use('/api/files',files)
  app.use('/api/sucursales',sucursales)
  app.use('/api/sorarios',sorario)
  app.use('/api/horarios',horario)
  app.use('/api/cajeros',cajero)
  app.use('/api/consultas',consultas)
  app.use('/api/ofertas',ofertas)
  app.use('/api/oferts',oferts)
}