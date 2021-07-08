import { v4 as uuidv4 } from 'uuid'

export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const generateId = () => {
  return uuidv4();
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