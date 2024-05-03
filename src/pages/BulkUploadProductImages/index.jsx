import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './style.css';

const BulkUploadProductImages = () => {
	const { t } = useTranslation();
	const [forceOverwrite, setForceOverwrite] = useState(false);

	const handleToggle = () => {
		setForceOverwrite(!forceOverwrite);
	};

	const handleUpload = () => {};

	return (
		<div className='unique-bulk-upload-product-images'>
			<header className='bulk-page-header'>
				{t('bulkUploadProductImages.massIngressiveProductImages')}
			</header>

			<Form className='unique-form'>
				<Form.Group controlId='formZipFile' className='mb-3'>
					<Form.Label>{t('bulkUploadProductImages.selectZIPFile')}:</Form.Label>
					<Form.Control type='file' accept='.zip' />
				</Form.Group>
				<Form.Group controlId='formForceOverwrite' className='mb-3'>
					<Form.Check
						type='checkbox'
						checked={forceOverwrite}
						onChange={handleToggle}
						label={t('bulkUploadProductImages.forceOverWriteImage')}
					/>
				</Form.Group>
			</Form>
			<Button
				variant='primary'
				onClick={handleUpload}
				className='unique-button'
			>
				{t('bulkUploadProductImages.charge')}
			</Button>
		</div>
	);
};

export default BulkUploadProductImages;
