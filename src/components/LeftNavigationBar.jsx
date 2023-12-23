import React from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown'
import './styles.css'

const LeftNavigationBar = () => {
  return (
    <div className='LeftNavigationBar'>
      <ul>
        <img src='src/imagenes/img.svg' />
        <NavDropdown title='🛒 Pedidos Online' id='basic-nav-dropdown'>
          <li href='#action/3.2'> ⏪ Resumen</li>
          <li href='#action/3.3'> ⏪ Control Pedido</li>
          <li href='#action/3.4'> ⏪ Reportes</li>
        </NavDropdown>
      </ul>
      <ul>
        <NavDropdown title='💲 Pagos de Pedidos' id='basic-nav-dropdown'>
          <li href='#action/3.2'> ⏪ Por Deposito/Transf/Sucursal</li>
          <li href='#action/3.3'> ⏪ Por Tarjeta Credito/Debito</li>
        </NavDropdown>
      </ul>
      <ul>
        <NavDropdown title=' ⬇️ Compras' id='basic-nav-dropdown'>
          <li href='#action/3.2'> ⏪ Registro Producto</li>
          <li href='#action/3.3'> ⏪ Registrar Compra</li>
          <li href='#action/3.4'> ⏪ Crear Plantilla</li>
          <li href='#action/3.5'> ⏪ Plantilla de Productos</li>
          <li href='#action/3.6'> ⏪ Buscar Variante</li>
          <li href='#action/3.7'> ⏪ Carga de imagenes</li>
          <li href='#action/3.8'> ⏪ Reporte de Stock</li>
        </NavDropdown>
      </ul>
      <ul>
        <NavDropdown title=' ⬆️Ventas' id='basic-nav-dropdown'>
          <li> ⏪ Registrar Venta</li>
          <li> ⏪ Lista Venta</li>
        </NavDropdown>
      </ul>
      <h2>🗣️ Promociones</h2>
      <ul></ul>
      <h2> 🎹 Categoria</h2>
      <ul></ul>
      <h2> 🎹 Cotizaciones</h2>
      <ul></ul>
      <h2> 🎹 Cupones</h2>
      <ul></ul>
      <h2> 🎹 Clientes</h2>
      <ul></ul>
      <h2> 📶 Estadisticas</h2>
      <ul></ul>
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
