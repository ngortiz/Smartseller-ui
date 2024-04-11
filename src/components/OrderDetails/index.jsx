import React from 'react';
import PropTypes from 'prop-types';
import {Spinner } from 'react-bootstrap';
import './style.css';

const OrderDetails = ({
  order
  
}) => {
  if (order=== null){
    return <Spinner animation="border" role="status" variant="primary" style={{ width: '3rem', height: '3rem' }}>
    <span className="sr-only"></span>
  </Spinner>
  }
  const{orderDetails, deliverCost, total } = order

  
  return (
    <div className='comprobante'>
      <table className='order-table'>
        <thead>
          <tr>
            <th>Cantidad</th>
            <th>Cod. Interno</th>
            <th>Producto</th>
            <th>Precio Unitario</th>
            <th>Descuento</th> 
            <th>Precio Venta</th>
            <th>Exenta</th>
            <th>IVA 10%</th>
            <th>IVA 5%</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.map((item, index) => (
            <tr key={index}>
              <td>{item.amount}</td>
              <td>{item.productVariant.internalCode}</td>
              <td>{item.productVariant.name}</td>
              <td>US${item.price}</td>
              <td>Ninguno</td>
              <td>US${item.sellPrice}</td>
              <td>US${item.exenta}</td>
              <td>US${item.iva10}</td>
              <td>US${item.iva5 || 0}</td>
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
            <td className='summary-value'>US${deliverCost}</td>
          </tr>
          <tr>
            <td className='summary-cell' colSpan='4'>
              Subtotal
            </td>
            <td className='summary-value'>US${total}</td>
          </tr>
          <tr>
            <td className='summary-cell' colSpan='4'>
              Cupón de Descuento
            </td>
            <td className='summary-value'>Ninguno</td>
          </tr>
          <tr>
            <td className='summary-cell' colSpan='4'>
              Total a Pagar
            </td>
            <td className='summary-value'>US${total}</td>
          </tr>
        </tbody>
      </table>

      <div className='additional-details'>
        <table>
          <thead>
            <tr>
              <th>Liquidación Del IVA (5%): US$ 0</th>
              <th>Liquidación Del IVA (10%): US$ 0</th>
              <th>Total Del IVA: US$ 0 </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

OrderDetails.propTypes = {
  order: PropTypes.object.isRequired,
 /*** orderDetails: PropTypes.array.isRequired,
  deliverCost: PropTypes.number.isRequired,
  subtotal: PropTypes.number.isRequired,
  discountCoupon: PropTypes.string.isRequired,
  totalAmount: PropTypes.number.isRequired,
  iva5: PropTypes.number.isRequired,
  iva10: PropTypes.number.isRequired,
  totalIVA: PropTypes.number.isRequired,?***/

};

export default OrderDetails;

