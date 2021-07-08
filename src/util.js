export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const generateId = () => {
  let i, random;
  let uuid = '';

  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-';
    }
    uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16); 
  }
  return uuid;
}

export const generateTimestamp = (timestamp) => {
  const calendar = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const year = new Date(timestamp * 1000).getFullYear().toString()
  const month = new Date(timestamp * 1000).getMonth()
  const day = new Date(timestamp * 1000).getDate().toString()
  return calendar[month] + ' ' + day + ', ' + year
}