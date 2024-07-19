import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
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
			<Container className='bulk-container '>
				<Form className='bulk-form'>
					<Form.Group controlId='formZipFile' className='mb-3'>
						<Form.Label className='bulk-form-label'>
							{t('bulkUploadProductImages.selectZIPFile')}:
						</Form.Label>
						<Form.Control type='file' accept='.zip' />
					</Form.Group>
					<Form.Group
						controlId='formForceOverwrite'
						className='mb-3 bulk-from-check'
					>
						<Form.Check
							type='checkbox'
							checked={forceOverwrite}
							onChange={handleToggle}
							label=''
							className='bulk-from-check'
						/>
						<Form.Label className='bulk-label-check'>
							{t('bulkUploadProductImages.forceOverWriteImage')}:
						</Form.Label>
					</Form.Group>
				</Form>
				<Button
					variant='primary'
					onClick={handleUpload}
					className='bulk-button'
				>
					{t('bulkUploadProductImages.charge')}
				</Button>
			</Container>
		</div>
	);
};

export default BulkUploadProductImages;
