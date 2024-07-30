import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import {
	Container,
	Row,
	Col,
	Form,
	Button,
	Table,
	Spinner,
	Alert,
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

const CREATE_TEMPLATE_MUTATION = gql`
	mutation CreateTemplate($template: TemplateInput!) {
		createTemplate(template: $template) {
			id
			name
			format
		}
	}
`;

const CreateTemplatesPage = () => {
	const { loading, error, data } = useQuery(GET_TEMPLATES_QUERY);
	const [createTemplate] = useMutation(CREATE_TEMPLATE_MUTATION);
	const [templateName, setTemplateName] = useState('');
	const [attributeName, setAttributeName] = useState('');
	const [attributes, setAttributes] = useState([]);
	const [templateNameValid, setTemplateNameValid] = useState(null);
	const [attributeNameValid, setAttributeNameValid] = useState(null);
	const { t } = useTranslation();
	const [templates, setTemplates] = useState([]);

	useEffect(() => {
		if (data && data.getTemplates) {
			setTemplates(data.getTemplates);
		}
	}, [data]);

	const handleAddAttribute = () => {
		if (
			attributeName.trim().length >= 4 &&
			attributeName.trim().length <= 255
		) {
			setAttributes([...attributes, attributeName]);
			setAttributeName('');
			setAttributeNameValid(true);
		} else {
			setAttributeNameValid(false);
		}
	};

	const handleSubmit = async event => {
		event.preventDefault();
		if (
			templateName.trim().length >= 4 &&
			templateName.trim().length <= 15 &&
			attributes.length > 0
		) {
			try {
				const { data } = await createTemplate({
					variables: {
						template: {
							name: templateName,
							format: attributes.join(', '),
						},
					},
				});

				setTemplates([...templates, data.createTemplate]);
				setTemplateName('');
				setAttributes([]);
				setTemplateNameValid(true);
			} catch (error) {
				console.error('Error creating template:', error);
				setTemplateNameValid(false);
			}
		} else {
			setTemplateNameValid(false);
		}
	};

	const handleTemplateNameChange = e => {
		setTemplateName(e.target.value);
		if (
			e.target.value.trim().length >= 4 &&
			e.target.value.trim().length <= 15
		) {
			setTemplateNameValid(true);
		} else {
			setTemplateNameValid(false);
		}
	};

	const handleAttributeNameChange = e => {
		setAttributeName(e.target.value);
		if (
			e.target.value.trim().length >= 4 &&
			e.target.value.trim().length <= 255
		) {
			setAttributeNameValid(true);
		} else {
			setAttributeNameValid(false);
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
				<Form onSubmit={handleSubmit}>
					<Form.Group controlId='formTemplateName'>
						<Form.Label className='create-templates-form-label'>
							{t('createTemplates.templateName')}
						</Form.Label>
						<Form.Control
							type='text'
							placeholder={t('createTemplates.enterTemplateName')}
							value={templateName}
							onChange={handleTemplateNameChange}
							isInvalid={templateNameValid === false}
							isValid={templateNameValid === true}
							className='createTemplates-input'
						/>
						{templateNameValid === false && (
							<Form.Control.Feedback type='invalid'>
								{t('createTemplates.invalidTemplateName')}
							</Form.Control.Feedback>
						)}
					</Form.Group>
					<Form.Group controlId='formAttributeName' className='mt-3'>
						<Form.Label className='create-templates-form-label'>
							{t('createTemplates.attributesName')}
						</Form.Label>
						<Form.Control
							type='text'
							placeholder={t('createTemplates.enterAttributesName')}
							value={attributeName}
							onChange={handleAttributeNameChange}
							isInvalid={attributeNameValid === false}
							isValid={attributeNameValid === true}
							className='createTemplates-input'
						/>
						{attributeNameValid === false && (
							<Form.Control.Feedback type='invalid'>
								{t('createTemplates.invalidAttributeName')}
							</Form.Control.Feedback>
						)}
					</Form.Group>
					<Button
						className='create-templates-button'
						type='submit'
						onClick={handleAddAttribute}
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
