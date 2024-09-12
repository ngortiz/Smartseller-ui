import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import DateRangePicker from '../../components/DateRangePicker';
import './style.css';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
);

const PlatformAnalyticsPage = () => {
	const { t } = useTranslation();
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	// Example data for the chart
	const chartData = {
		labels: [
			'2024-08-11',
			'2024-08-12',
			'2024-08-13',
			'2024-08-14',
			'2024-08-15',
			'2024-08-16',
		],
		datasets: [
			{
				label: 'dashboard:index:requested',
				data: [60, 149, 234, 203, 169, 107],
				borderColor: 'rgba(75, 192, 192, 1)',
				backgroundColor: 'rgba(75, 192, 192, 0.2)',
				fill: false,
			},
			{
				label: 'showroom:products:requested',
				data: [41, 99, 131, 132, 97, 68],
				borderColor: 'rgba(54, 162, 235, 1)',
				backgroundColor: 'rgba(54, 162, 235, 0.2)',
				fill: false,
			},
		],
	};

	const chartOptions = {
		responsive: true,
		plugins: {
			legend: {
				labels: {
					font: {
						size: 14,
					},
				},
			},
			title: {
				display: true,
				text: t('platformAnalytcs.chart'),
				font: {
					size: 20,
				},
			},
		},
		scales: {
			x: {
				title: {
					display: true,
					text: t('platformAnalytcs.date'),
					font: {
						size: 16,
					},
				},
			},
			y: {
				title: {
					display: true,
					text: t('platformAnalytcs.numberOfVisits'),
					font: {
						size: 16,
					},
				},
			},
		},
	};

	const handleSearch = () => {
		console.log(`Fecha de inicio: ${startDate}, Fecha de fin: ${endDate}`);
	};
	return (
		<>
			<h2 className='platform-title'>
				{t('platformAnalytcs.platformAnalytcs')}
			</h2>

			<Container className='container-platform'>
				<DateRangePicker
					startDate={startDate}
					endDate={endDate}
					handleStartDateChange={setStartDate}
					handleEndDateChange={setEndDate}
					handleSearch={handleSearch}
				/>

				<Line data={chartData} options={chartOptions} />
			</Container>
		</>
	);
};

export default PlatformAnalyticsPage;
