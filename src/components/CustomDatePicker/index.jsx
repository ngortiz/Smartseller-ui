import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './style.css'
import { BiCalendar } from 'react-icons/bi'
import { subMonths } from 'date-fns'

const CustomDatePicker = ({ selectedDate, handleChange }) => {
  const defaultDate = subMonths(new Date(), 1)
  return (
    <div className='custom-date-picker'>
      <BiCalendar className='bi bi-calendar-icon' />
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        dateFormat='dd/MM/yyyy'
        className='date-picker-input'
        startDate={defaultDate}
      />
    </div>
  )
}
CustomDatePicker.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  handleChange: PropTypes.func.isRequired
}
export default CustomDatePicker
