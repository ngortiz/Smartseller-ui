import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './style.css';
import { useTranslation } from 'react-i18next';

const GeneralDiscountPage = () => {
	const { t } = useTranslation();
	const [discount, setDiscount] = useState('');
	const [isChecked, setIsChecked] = useState(false);

	const handleUpdate = () => {
		// Aquí puedes agregar la lógica para actualizar el descuento
		console.log('Descuento:', discount);
		console.log('Activado:', isChecked);
	};

	return (
		<Container className='general-discount-container'>
			<Row className='general-discount-header'>
				<Col>
					<h1>{t('generalDiscount.generalDiscount')}</h1>
				</Col>
			</Row>
			<Row className='general-discount-subheader'>
				<Col>
					<h2>{t('generalDiscount.discountRate')}</h2>
				</Col>
			</Row>
			<Row className='general-discount-form'>
				<Col md={6}>
					<Form.Group controlId='formDiscount'>
						<Form.Label>{t('generalDiscount.discount')}</Form.Label>
						<Form.Control
							type='number'
							value={discount}
							onChange={e => setDiscount(e.target.value)}
						/>
					</Form.Group>
				</Col>
				<Col md={2} className='align-self-end'>
					<Form.Group controlId='formIsChecked'>
						<Form.Check
							type='checkbox'
							label={t('generalDiscount.enable')}
							checked={isChecked}
							onChange={e => setIsChecked(e.target.checked)}
						/>
					</Form.Group>
				</Col>
				<Col md={4} className='align-self-end'>
					<Button onClick={handleUpdate}>{t('generalDiscount.update')}</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default GeneralDiscountPage;
