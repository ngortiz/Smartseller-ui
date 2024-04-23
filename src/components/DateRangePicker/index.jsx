import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import CustomDatePicker from '../CustomDatePicker';
import './style.css';
import { useTranslation } from 'react-i18next';

import PropTypes from 'prop-types';

const DateRangePicker = ({
	startDate,
	endDate,
	handleStartDateChange,
	handleEndDateChange,
	handleSearch,
}) => {
	const { t } = useTranslation();

	return (
		<div className='date-range-picker-container'>
			<Row className='justify-content-center'>
				<Col xs={12} sm={8} md={6} lg={4} className='date-picker-container '>
					<h1 className='custom-label'>{t('dateRangePicker.from')}: </h1>
					<CustomDatePicker
						selectedDate={startDate || defaultDate}
						handleChange={handleStartDateChange}
					/>

					<h1 className='custom-label'>{t('dateRangePicker.to')}: </h1>
					<CustomDatePicker
						selectedDate={endDate}
						handleChange={handleEndDateChange}
					/>
					<Button
						variant='primary'
						className='date-button'
						onClick={handleSearch}
					>
						{t('dateRangePicker.search')}
					</Button>
				</Col>
			</Row>
		</div>
	);
};

DateRangePicker.propTypes = {
	startDate: PropTypes.instanceOf(Date),
	endDate: PropTypes.instanceOf(Date),
	handleStartDateChange: PropTypes.func.isRequired,
	handleEndDateChange: PropTypes.func.isRequired,
	handleSearch: PropTypes.func.isRequired,
};

export default DateRangePicker;
