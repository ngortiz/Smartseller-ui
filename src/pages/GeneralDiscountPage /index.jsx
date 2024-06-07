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
		<>
			<Row className='general-discount-header'>
				<header className='general-discount-header'>
					{t('generalDiscount.generalDiscount')}
				</header>
			</Row>
			<Container className='general-discount-container'>
				<Row className='general-discount-subheader'>
					<Col>
						<header>{t('generalDiscount.discountRate')}</header>
					</Col>
				</Row>
				<Row className='general-discount-form'>
					<Col md={3}>
						<Form.Group controlId='formDiscount'>
							<Form.Label>{t('generalDiscount.discount')}</Form.Label>
							<Form.Control
								type='number'
								value={discount}
								onChange={e => setDiscount(e.target.value)}
							/>
						</Form.Group>
					</Col>
					<Col md={2} className='align-self-center'>
						<Form.Group controlId='formIsChecked' className='form-check-group'>
							<Form.Label className='form-check-label'>
								{t('generalDiscount.enable')}
							</Form.Label>
							<Form.Check
								type='checkbox'
								checked={isChecked}
								onChange={e => setIsChecked(e.target.checked)}
								className='discount-check-input'
							/>
						</Form.Group>
					</Col>
					<Col md={7} className='align-self-end'>
						<Button onClick={handleUpdate} className='update-button'>
							{t('generalDiscount.update')}
						</Button>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default GeneralDiscountPage;
