import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import './style.css';
import { useTranslation } from 'react-i18next';

const CreateTemplatesPage = () => {
	const [templateName, setTemplateName] = useState('');
	const [attributeName, setAttributeName] = useState('');
	const [attributes, setAttributes] = useState([]);
	const { t } = useTranslation();
	const [templates, setTemplates] = useState([
		{
			name: 'Ropa',
			attributes: ['Color', 'Talla', 'Material'],
		},
		{
			name: 'Electrónicos',
			attributes: ['Marca', 'Modelo', 'Garantía'],
		},
		{
			name: 'Bazar',
			attributes: ['Marca', 'Modelo', 'Garantía'],
		},
	]);

	const handleAddAttribute = () => {
		if (attributeName.trim()) {
			setAttributes([...attributes, attributeName]);
			setAttributeName('');
		}
	};

	const handleDeleteTemplate = index => {
		const newTemplates = templates.filter((_, i) => i !== index);
		setTemplates(newTemplates);
	};

	return (
		<Container className='create-templates-container'>
			<Row className='mt-4'>
				<Col>
					<header className='create-templates-header'>
						{t('createTemplates.createTemplate')}
					</header>
					<Form>
						<Form.Group controlId='formTemplateName'>
							<Form.Label className='create-templates-form-label'>
								{t('createTemplates.templateName')}
							</Form.Label>
							<Form.Control
								type='text'
								placeholder='Ingrese el nombre de la plantilla'
								value={templateName}
								onChange={e => setTemplateName(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId='formAttributeName' className='mt-3'>
							<Form.Label className='create-templates-form-label'>
								{t('createTemplates.attributesName')}
							</Form.Label>
							<Form.Control
								type='text'
								placeholder='Ingrese el nombre del atributo'
								value={attributeName}
								onChange={e => setAttributeName(e.target.value)}
							/>
							<Button
								variant='primary'
								className='mt-2 create-templates-button'
								onClick={handleAddAttribute}
							>
								{t('createTemplates.add')}
							</Button>
						</Form.Group>
						<div className='mt-3'>
							<ul className='create-templates-attributes-list'>
								{attributes.map((attr, index) => (
									<li key={index}>{attr}</li>
								))}
							</ul>
						</div>
					</Form>
				</Col>
			</Row>
			<Row className='mt-5'>
				<Col>
					<Table striped bordered hover className='create-templates-table'>
						<thead>
							<tr>
								<th>{t('createTemplates.template')}</th>
								<th>{t('createTemplates.attributes')}</th>
								<th>{t('createTemplates.delete')}</th>
							</tr>
						</thead>
						<tbody>
							{templates.map((template, index) => (
								<tr key={index}>
									<td>{template.name}</td>
									<td>{template.attributes.join(', ')}</td>
									<td>
										<Button
											className='create-templates-delete-button'
											variant='danger'
											onClick={() => handleDeleteTemplate(index)}
										>
											<i className='bi bi-trash3'></i>
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Col>
			</Row>
		</Container>
	);
};

export default CreateTemplatesPage;
