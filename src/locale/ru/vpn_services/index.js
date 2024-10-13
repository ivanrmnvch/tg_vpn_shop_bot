module.exports = {
	title: 'Выберите тарифный план',
	// buttons: {
	// 	trial: '🎁 10 дней бесплатно',
	// 	month: '📆 Месяц - 200₽',
	// 	six_months: '📅 6 месяцев - 1000₽ (166₽/мес)',
	// 	year: '📅 Год - 2000₽ (166₽/мес)',
	// },
	buttons: {
		trial: '🎁 10 дней бесплатно',
		month: '📆 Месяц - #{price}₽',
		six_months: '📅 6 месяцев - #{price}₽ (#{priceMonth}₽/мес)',
		year: '📅 Год - #{price}₽ (#{priceMonth}₽/мес)',
	},
	headers: {
		trial: 'Пробный период на 10 дней',
		month: 'Подписка на месяц',
		six_months: 'Подписка на 6 месяцев',
		year: 'Подписка на года',
	},
	description:
		'- Неограниченное количество устройств - iOS, Android, Windows, Linux, MacOS',
	labels: {
		trial: 'VPN TEST 10 дней',
		month: 'VPN на месяц',
		six_months: 'VPN на 6 месяцев',
		year: 'VPN на год',
	},
	qrCodeDescription:
		'Отсканируйте ваш QR-код в приложении для подключения к VPN серверу',
	trialIsBlock:
		'Вы уже оформили платную подписку, доступ к пробному периоду закрыт',
	trialUpdateError:
		'Во время оформления пробного периода произошла ошибка, попробуйте повторить попытку позже',
	trialSuccess: 'Пробный период успешно оформлен',
	os: {
		title: 'Выберите операционную систему',
		android: 'Android',
		ios: 'iOS',
	},
};
