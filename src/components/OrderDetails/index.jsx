import React from 'react'

const OrderDetails = () => {
  return (
    <div className='comprobante'>
      <table>
        <thead>
          <tr>
            <th>Cantidad</th>
            <th>Cod. Interno</th>
            <th>Producto</th>
            <th>Precio Unitario</th>
            <th>Precio Oferta</th>
            <th>Exenta</th>
            <th>IVA 10%</th>
            <th>IVA 5%</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>001</td>
            <td>Producto</td>
            <td>$10.00</td>
            <td>$8.00</td>
            <td>$0.00</td>
            <td>$1.00</td>
            <td>$0.50</td>
          </tr>
        </tbody>
      </table>

      <table className='table'>
        <tbody>
          <tr>
            <td className='colspan-4'>Costo de Envio</td>
            <td className='td-2'>$8.00</td>
          </tr>
          <tr>
            <td className='colspan-4'>Subtotales</td>
            <td className='td-2'>$8.00</td>
          </tr>
          <tr>
            <td className='colspan-4'>Cupon de Descuento</td>
            <td className='td-2'>Ninguno</td>
          </tr>
          <tr>
            <td className='colspan-4'>Total a Pagar</td>
            <td className='td-2'>$8.00</td>
          </tr>
        </tbody>
      </table>

      <div className='additional-details'>
        <table>
          <thead>
            <tr>
              <th>Liquidacion Del IVA(5%): US$ 0.00</th>
              <th>Liquidacion Del IVA(10%): US$ 0.00</th>
              <th>Total Del IVA: US$ 0.00</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  )
}

export default OrderDetails
