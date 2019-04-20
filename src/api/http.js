import axios from 'axios';

export const CISCO_PRESENCE = axios.create({
  baseURL: 'https://cisco-presence.unit.ua',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Authorization': `Basic ${new Buffer('RO:Passw0rd').toString('base64')}`,
  },
  crossdomain: true,
});
