import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import 'react-datepicker/dist/react-datepicker.css'
import './CustomDatePicker.css'

const CustomDatePicker = props => {
  const { selectedDate, handleChange } = props
  return (
    <>
      <div className='custom-datepicker-container'>
        <FontAwesomeIcon icon={faCalendarAlt} className='calendar-icon' />
        <DatePicker
          selected={selectedDate}
          onChange={handleChange}
          className='custom-datepicker'
        />
      </div>
    </>
  )
}
CustomDatePicker.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  handleChange: PropTypes.func.isRequired
}
export default CustomDatePicker
