import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import CustomDatePicker from '../CustomDatePicker';
import './style.css';
import PropTypes from 'prop-types';

const DateRangePicker = ({
	startDate,
	endDate,
	handleStartDateChange,
	handleEndDateChange,
	handleSearch,
}) => {
	return (
		<div className='date-range-picker-container'>
			<Row className='justify-content-center align-items-center'>
				<Col xs='auto' className='date-picker-container'>
					<h1 className='custom-label'>Desde: </h1>
					<CustomDatePicker
						selectedDate={startDate}
						handleChange={handleStartDateChange}
					/>
				</Col>
				<Col xs='auto' className='date-picker-container'>
					<h1 className='custom-label'>Hasta: </h1>
					<CustomDatePicker
						selectedDate={endDate}
						handleChange={handleEndDateChange}
					/>
				</Col>
				<Col xs='auto' className='date-picker-container'>
					<Button className='date-button' onClick={handleSearch}>
						Buscar
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
