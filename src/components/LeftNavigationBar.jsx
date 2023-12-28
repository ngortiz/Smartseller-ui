import React from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown'
import './LeftNavigationBar.css'

const LeftNavigationBar = () => {
  return (
    <div className='LeftNavigationBar'>
      <img src='src/imagenes/icono.png' alt='Nidia Ortiz' />
      <ul>
        <NavDropdown
          title={
            <span>
              <i className='bi bi-cart3'></i> Pedidos Onlines
            </span>
          }
          id='basic-nav-dropdown'
        >
          <li href='#action/3.2'> Resumen</li>
          <li href='#action/3.3'> Control Pedido</li>
          <li href='#action/3.4'> Reportes</li>
        </NavDropdown>
      </ul>
      <ul>
        <NavDropdown
          title={
            <span>
              <i className='"bi bi-currency-dollar'></i> Pagos de Pedido
            </span>
          }
          id='basic-nav-dropdown'
        >
          <li href='#action/3.2'>Por Deposito/Transf/Sucursal</li>
          <li href='#action/3.3'>Por Tarjeta Credito/Debito</li>
        </NavDropdown>
      </ul>
      <ul>
        <NavDropdown
          title={
            <span>
              <i className='bi bi-arrow-up-circle-fill'></i> Compras
            </span>
          }
          id='basic-nav-dropdown'
        >
          <li href='#action/3.2'>Registro Producto</li>
          <li href='#action/3.3'>Registrar Compra</li>
          <li href='#action/3.4'>Crear Plantilla</li>
          <li href='#action/3.5'>Plantilla de Productos</li>
          <li href='#action/3.6'>Buscar Variante</li>
          <li href='#action/3.7'>Carga de imagenes</li>
          <li href='#action/3.8'>Reporte de Stock</li>
        </NavDropdown>
      </ul>
      <ul>
        <NavDropdown
          title={
            <span>
              <i className='bi bi-arrow-down-circle-fill'></i> Ventas
            </span>
          }
          id='basic-nav-dropdown'
        >
          <li>Registrar Venta</li>
          <li>Lista Venta</li>
        </NavDropdown>
      </ul>
      <ul>
        <h2>
          <span>
            <i className='bi bi-megaphone-fill'></i> Promociones
          </span>
        </h2>
      </ul>
      <ul>
        <h2>
          <span>
            <i className='bi bi-list-columns'></i> Categorias
          </span>
        </h2>
      </ul>
      <ul>
        <h2>
          <span>
            <i className='bi bi-database-fill'></i> Cotizaciones
          </span>
        </h2>
      </ul>
      <ul>
        <h2>
          <span>
            <i className='bi bi-aspect-ratio'></i> Cupones
          </span>
        </h2>
      </ul>
      <ul>
        <NavDropdown
          title={
            <span>
              <i className='bi bi-people-fill'></i> Clientes
            </span>
          }
          id='basic-nav-dropdown'
        >
          <li>Clientes</li>
          <li>Suscriptores</li>
        </NavDropdown>
      </ul>
      <ul>
        <NavDropdown
          title={
            <span>
              <i className='bi bi-graph-up-arrow'></i> Estadisticas
            </span>
          }
          id='basic-nav-dropdown'
        >
          <li>Analitica de Plataforma</li>
          <li>Ventas Online</li>
          <li>Productos Vendidos Online</li>
        </NavDropdown>
      </ul>
      <ul>
        <h2>
          <span>
            <i className='bi bi-file-spreadsheet'></i> Tareas internas
          </span>
        </h2>
      </ul>
      <ul>
        <h2>
          <span>
            <i className='bi bi-grid-fill'></i> Paginas de Productos
          </span>
        </h2>
      </ul>
      <ul>
        <h2>
          <span>
            <i className='bi bi-house'></i> Pagina de Inicio
          </span>
        </h2>
      </ul>
      <ul>
        <NavDropdown
          title={
            <span>
              <i className='bi bi-person-fill'></i> Nidia Ortiz
            </span>
          }
          id='basic-nav-dropdown'
        >
          <li>Cambiar Contraseña</li>
          <li>salir</li>
        </NavDropdown>
      </ul>
    </div>
  )
}
export default LeftNavigationBar
