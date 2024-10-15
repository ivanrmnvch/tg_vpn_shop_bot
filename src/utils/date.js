const formatDate = (dateString) => {
	const date = new Date(dateString);

	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = String(date.getFullYear()).slice(-2);

	return `${day}.${month}.${year}`;
};

const getDiff = (startDate, endDate = new Date()) => {
	const diffInMs = Math.abs(new Date(startDate) - endDate);

	const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
	const hours = Math.floor(
		(diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
	);
	const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);
	return { days, hours, minutes, seconds };
};

module.exports = {
	formatDate,
	getDiff,
};
