import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
	lng: 'es', // Idioma por defecto
	fallbackLng: 'es',
	resources: {
		es: {
			translation: {
				orderData: {
					title: 'Pedido',
					number: 'Número de Pedido',
					voucher: 'Comprobante',
					state: 'Estado del Pedido',
					date: 'Fecha del Pedido',
				},
				orderClientInformation: {
					client: 'Cliente',
					address: 'Dirección',
					cellPhone: 'Teléfono',
					rucOrCI: 'RUC/CI',
				},
				orderStatus: {
					Processing: 'Procesando',
					color: 'color',
					Pendiente: 'Pendiente',
					amount: 'cantidad',
					status: 'estado',
					startDate: 'Fecha de inicio',
					endDate: 'Fecha de finalizacion',

					// Otros textos de prueba...
				},
			},
		},
	},
	interpolation: { escapeValue: false },
});

export default i18n;
