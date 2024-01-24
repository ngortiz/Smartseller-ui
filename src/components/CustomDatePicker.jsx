import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './CustomDatePicker.css'
import { BiCalendar } from 'react-icons/bi'

const CustomDatePicker = ({ selectedDate, handleChange }) => {
  console.log(selectedDate)
  return (
    <div className='custom-date-picker'>
      <BiCalendar className='bi bi-calendar-icon' />
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        dateFormat='dd/MM/yyyy'
        className='date-picker-input'
      />
    </div>
  )
}
CustomDatePicker.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  handleChange: PropTypes.func.isRequired
}
export default CustomDatePicker
