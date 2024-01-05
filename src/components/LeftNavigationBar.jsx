import React from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown'
import './LeftNavigationBar.css'
import icon from '../images/icon.png'
import icon from '../images/icon.png'

const LeftNavigationBar = () => {
  return (
    <div className='LeftNavigationBar'>
      <img src={icon} alt='Nidia Ortiz' />
      <ul>
        <NavDropdown
          title={
            <span>
              <i className='bi bi-cart3'></i> Pedidos Online
            </span>
          }
          id='basic-nav-dropdown'
        >
          <NavDropdown.Item href='orders/orders-summary'>
            {' '}
            Resumen{' '}
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href='/'> Control Pedido </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item to='/'> Reportes </NavDropdown.Item>
        </NavDropdown>
      </ul>
      <ul>
        <NavDropdown
          title={
            <span>
              <i className='bi bi-currency-dollar'></i> Pagos de Pedido
            </span>
          }
          id='basic-nav-dropdown'
        >
          <NavDropdown.Item href='#action/3.2'>
            Por Deposito/Transf/Sucursal
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href='#action/3.3'>
            Por Tarjeta Credito/Debito
          </NavDropdown.Item>
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
          <NavDropdown.Item href='#action/3.2'>
            Registro Producto
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href='#action/3.3'>
            Registrar Compra
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href='#action/3.4'>
            Crear Plantilla
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href='#action/3.5'>
            Plantilla de Productos
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href='#action/3.6'>
            Buscar Variante
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href='#action/3.7'>
            Carga de imagenes
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href='#action/3.8'>
            Reporte de Stock
          </NavDropdown.Item>
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
          <NavDropdown.Item>Registrar Venta</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item>Lista Ventas</NavDropdown.Item>
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
          <NavDropdown.Item>Clientes</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item>Suscriptores</NavDropdown.Item>
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
          <NavDropdown.Item>Analitica de Plataforma</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item>Ventas Online</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item>Productos Vendidos Online</NavDropdown.Item>
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
            <i className='bi bi-grid-fill'></i> Pagina de Productos
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
          <NavDropdown.Item> Cambiar Contraseña </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item> Salir </NavDropdown.Item>
        </NavDropdown>
      </ul>
    </div>
  )
}
export default LeftNavigationBar
