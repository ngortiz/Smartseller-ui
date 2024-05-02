import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
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
			<header className='unique-h2'>
				{t('bulkUploadProductImages.enterZIPOfImages')}
			</header>
			<Form className='unique-form'>
				<Form.Group controlId='formZipFile' className='mb-3'>
					<Form.Label>{t('bulkUploadProductImages.selectZIPFile')}:</Form.Label>
					<Form.Control type='file' accept='.zip' />
				</Form.Group>
				<Form.Group controlId='formForceOverwrite' className='mb-3'>
					<Form.Check
						type='checkbox'
						label={t('bulkUploadProductImages.forceOverWriteImage')}
						checked={forceOverwrite}
						onChange={handleToggle}
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
