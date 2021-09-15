const { DAYS_IN_MONTHS } = require('../constants');

const isDateValid = ({
    year,
    month,
    day,
    hour = 0,
}) => {
    if(hour < 0 || hour > 23) return false;
    if(year < 0) return false;
    if(month < 1  || month > 12) return false;
    let daysInMonths = [ ...DAYS_IN_MONTHS ];
    if( ( year % 4 === 0 && year % 100 !== 0 ) || year % 400 === 0 ) daysInMonths[1]++;
    return !(day < 0 || day > daysInMonths[month - 1]);
};

module.exports = {
    isDateValid,
}