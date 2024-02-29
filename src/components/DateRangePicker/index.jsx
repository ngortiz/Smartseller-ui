import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import CustomDatePicker from '../CustomDatePicker'
const DateRangePicker = ({
  startDate,
  endDate,
  handleStartDateChange,
  handleEndDateChange,
  handleSearch
}) => {
  return (
    <div className='date-range-picker-container'>
      <Row>
        <Col className='date-picker-container'>
          <h1 className='custom-label'>Desde: </h1>
          <CustomDatePicker
            selectedDate={startDate}
            handleChange={handleStartDateChange}
          />
        </Col>
        <Col className='date-picker-container'>
          <h1 className='custom-label'>Hasta: </h1>
          <CustomDatePicker
            selectedDate={endDate}
            handleChange={handleEndDateChange}
          />
        </Col>
        <Col className='search-button-container'>
          <Button
            variant='primary'
            className='date-button'
            onClick={handleSearch}
          >
            Buscar
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default DateRangePicker
