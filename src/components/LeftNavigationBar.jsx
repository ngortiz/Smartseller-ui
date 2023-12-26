import React from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown'
import './styles.css'

const LeftNavigationBar = () => {
  return (
    <div className='LeftNavigationBar'>
      <img src='src/imagenes/avatar.png' alt='Nidia Ortiz' />
      <ul>
        <NavDropdown
          title={
            <span>
              <i className='bi bi-cart3'></i> Pedidos Onlines
            </span>
          }
          id='basic-nav-dropdown'
        >
          <li href='#action/3.2'>
            {' '}
            <i className='bi bi-chevron-double-right'></i>Resumen
          </li>
          <li href='#action/3.3'>
            {' '}
            <i className='bi bi-chevron-double-right'></i>Control Pedido
          </li>
          <li href='#action/3.4'>
            {' '}
            <i className='bi bi-chevron-double-right'></i>Reportes
          </li>
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
          <li href='#action/3.2'>
            {' '}
            <i className='bi bi-chevron-double-right'></i> Por
            Deposito/Transf/Sucursal
          </li>
          <li href='#action/3.3'>
            {' '}
            <i className='bi bi-chevron-double-right'></i> Por Tarjeta
            Credito/Debito
          </li>
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
          <li href='#action/3.2'>
            {' '}
            <i className='bi bi-chevron-double-right'></i> Registro Producto
          </li>
          <li href='#action/3.3'>
            {' '}
            <i className='bi bi-chevron-double-right'></i> Registrar Compra
          </li>
          <li href='#action/3.4'>
            {' '}
            <i className='bi bi-chevron-double-right'></i> Crear Plantilla
          </li>
          <li href='#action/3.5'>
            {' '}
            <i className='bi bi-chevron-double-right'></i> Plantilla de
            Productos
          </li>
          <li href='#action/3.6'>
            {' '}
            <i className='bi bi-chevron-double-right'></i> Buscar Variante
          </li>
          <li href='#action/3.7'>
            {' '}
            <i className='bi bi-chevron-double-right'></i> Carga de imagenes
          </li>
          <li href='#action/3.8'>
            {' '}
            <i className='bi bi-chevron-double-right'></i> Reporte de Stock
          </li>
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
          <li>
            {' '}
            <i className='bi bi-chevron-double-right'></i> Registrar Venta
          </li>
          <li>
            {' '}
            <i className='bi bi-chevron-double-right'></i> Lista Venta
          </li>
        </NavDropdown>
      </ul>
      <h2>
        {' '}
        <i className='bi bi-megaphone-fill'></i> Promociones
      </h2>
      <ul></ul>
      <h2>
        {' '}
        <i className='bi bi-list-ul'></i> Categoria
      </h2>
      <ul></ul>
      <h2>
        {' '}
        <i className='bi bi-list-ul'></i> Cotizaciones
      </h2>
      <ul></ul>
      <h2>
        {' '}
        <i className='bi bi-list-ul'></i> Cupones
      </h2>
      <ul></ul>
      <ul>
        <NavDropdown
          title={
            <span>
              <i className='bi bi-people-fill'></i> Clientes
            </span>
          }
          id='basic-nav-dropdown'
        >
          <li href='#action/3.2'>
            {' '}
            <i className='bi bi-chevron-double-right'></i> Clientes
          </li>
          <li href='#action/3.3'>
            {' '}
            <i className='bi bi-chevron-double-right'></i> Suscriptores
          </li>
        </NavDropdown>
      </ul>
      <ul>
        <ul></ul>
        <NavDropdown
          title={
            <span>
              <i className='bi bi-arrow-down-circle-fill'></i> Estadisticas
            </span>
          }
          id='basic-nav-dropdown'
        >
          <li>
            {' '}
            <i className='bi bi-chevron-double-right'>
              Analitica de Plataforma
            </i>
          </li>
          <li>
            {' '}
            <i className='bi bi-chevron-double-right'></i>Ventas Online
          </li>
          <li>
            {' '}
            <i className='bi bi-chevron-double-right'></i>Productos Vendidos
            Online
          </li>
        </NavDropdown>
      </ul>
      <h2>Tareas internas</h2>
      <ul></ul>
      <h2>Pagina Inicio</h2>
      <ul></ul>
      <h2>Pagina Productos</h2>
      <ul></ul>
    </div>
  )
}
export default LeftNavigationBar
