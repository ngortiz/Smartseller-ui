import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

const OrderDetails = ({
  orderItems,
  shippingCost,
  subtotal,
  discountCoupon,
  totalAmount,
  liquidationIVA5,
  liquidationIVA10,
  totalIVA
}) => {
  return (
    <div className='comprobante'>
      <table className='order-table'>
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
          {orderItems.map((item, index) => (
            <tr key={index}>
              <td>{item.quantity}</td>
              <td>{item.internalCode}</td>
              <td>{item.productName}</td>
              <td>${item.unitPrice}</td>
              <td>${item.offerPrice}</td>
              <td>${item.exempt}</td>
              <td>${item.iva10}</td>
              <td>${item.iva5}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className='summary-table'>
        <tbody>
          <tr>
            <td className='summary-cell' colSpan='4'>
              Costo de Envío
            </td>
            <td className='summary-value'>${shippingCost}</td>
          </tr>
          <tr>
            <td className='summary-cell' colSpan='4'>
              Subtotal
            </td>
            <td className='summary-value'>${subtotal}</td>
          </tr>
          <tr>
            <td className='summary-cell' colSpan='4'>
              Cupón de Descuento
            </td>
            <td className='summary-value'>{discountCoupon}</td>
          </tr>
          <tr>
            <td className='summary-cell' colSpan='4'>
              Total a Pagar
            </td>
            <td className='summary-value'>${totalAmount}</td>
          </tr>
        </tbody>
      </table>

      <div className='additional-details'>
        <table>
          <thead>
            <tr>
              <th>Liquidación Del IVA (5%): US$ {liquidationIVA5}</th>
              <th>Liquidación Del IVA (10%): US$ {liquidationIVA10}</th>
              <th>Total Del IVA: US$ {totalIVA}</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  )
}

OrderDetails.propTypes = {
  orderItems: PropTypes.array.isRequired,
  shippingCost: PropTypes.number.isRequired,
  subtotal: PropTypes.number.isRequired,
  discountCoupon: PropTypes.string.isRequired,
  totalAmount: PropTypes.number.isRequired,
  liquidationIVA5: PropTypes.number.isRequired,
  liquidationIVA10: PropTypes.number.isRequired,
  totalIVA: PropTypes.number.isRequired
}

export default OrderDetails
