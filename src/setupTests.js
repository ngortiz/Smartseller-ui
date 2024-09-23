import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
	lng: 'en',
	fallbackLng: 'en',
	resources: {
		en: {
			translation: {
				'orderPayment.title': 'Order Payment',
				'orderPayment.paymentState': 'Estado de Pago',
				'orderPayment.total': 'Total',
				'orderPayment.totalPaid': 'Total Pagado',
				'orderPayment.totalDebt': 'Deuda Total',
				'paymentStatus.paid': 'Paid', // Traducción para el estado de pago
			},
		},
	},
	interpolation: {
		escapeValue: false, // React ya se encarga del escape
	},
});

export default i18n;
