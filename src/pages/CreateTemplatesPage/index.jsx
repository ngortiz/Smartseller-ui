import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import {
	Container,
	Row,
	Col,
	Form,
	Button,
	Table,
	Spinner,
} from 'react-bootstrap';
import './style.css';

const GET_TEMPLATES_QUERY = gql`
	query GetTemplates {
		getTemplates {
			format
			id
			name
		}
	}
`;

const CreateTemplatesPage = () => {
	const { loading, error, data } = useQuery(GET_TEMPLATES_QUERY);
	const [templateName, setTemplateName] = useState('');
	const [attributeName, setAttributeName] = useState('');
	const [attributes, setAttributes] = useState([]);
	const { t } = useTranslation();
	const [templates, setTemplates] = useState([]);

	useEffect(() => {
		if (data && data.getTemplates) {
			setTemplates(data.getTemplates);
		}
	}, [data]);

	const handleAddAttribute = () => {
		if (attributeName.trim()) {
			setAttributes([...attributes, attributeName]);
			setAttributeName('');
		}
	};

	const handleCreateTemplate = () => {
		if (templateName.trim() && attributes.length > 0) {
			const newTemplate = {
				name: templateName,
				format: attributes.join(', '),
			};
			setTemplates([...templates, newTemplate]);
			setTemplateName('');
			setAttributes([]);
		}
	};

	const handleDeleteTemplate = index => {
		const newTemplates = templates.filter((_, i) => i !== index);
		setTemplates(newTemplates);
	};

	return (
		<>
			<Row className='mt-4'>
				<Col>
					<header className='create-templates-header'>
						{t('createTemplates.createTemplate')}
					</header>
				</Col>
			</Row>
			<Container className='create-templates-container'>
				<Form>
					<Form.Group controlId='formTemplateName'>
						<Form.Label className='create-templates-form-label'>
							{t('createTemplates.templateName')}
						</Form.Label>
						<Form.Control
							type='text'
							placeholder={t('createTemplates.enterTemplateName')}
							value={templateName}
							onChange={e => setTemplateName(e.target.value)}
							className='createTemplates-input'
						/>
					</Form.Group>
					<Form.Group controlId='formAttributeName' className='mt-3'>
						<Form.Label className='create-templates-form-label'>
							{t('createTemplates.attributesName')}
						</Form.Label>
						<Form.Control
							type='text'
							placeholder={t('createTemplates.enterAttributesName')}
							value={attributeName}
							onChange={e => setAttributeName(e.target.value)}
							className='createTemplates-input'
						/>
					</Form.Group>
					<div className='mt-3'>
						<ul className='create-templates-attributes-list'>
							{attributes.map((attr, index) => (
								<li key={index}>{attr}</li>
							))}
						</ul>
					</div>
					<Button
						className='create-templates-button'
						onClick={handleCreateTemplate}
					>
						{t('createTemplates.add')}
					</Button>
				</Form>

				<Row className='mt-5'>
					<Col>
						<Table bordered hover className='create-templates-table'>
							<thead>
								<tr>
									<th>{t('createTemplates.template')}</th>
									<th>{t('createTemplates.attributes')}</th>
									<th>{t('createTemplates.delete')}</th>
								</tr>
							</thead>
							<tbody>
								{loading ? (
									<tr>
										<td colSpan='3' className='text-center'>
											<Spinner
												animation='border'
												role='status'
												variant='primary'
											>
												<span className='visually-hidden'>Loading...</span>
											</Spinner>
										</td>
									</tr>
								) : error ? (
									<tr>
										<td colSpan='3' className='text-center text-danger'>
											{t('createTemplates.error')}: {error.message}
										</td>
									</tr>
								) : (
									templates.map((template, index) => (
										<tr key={template.id || index}>
											<td>{template.name}</td>
											<td>{template.format}</td>
											<td>
												<Button
													className='create-templates-delete-button'
													onClick={() => handleDeleteTemplate(index)}
												>
													<i className='bi bi-trash3'></i>
												</Button>
											</td>
										</tr>
									))
								)}
							</tbody>
						</Table>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default CreateTemplatesPage;
