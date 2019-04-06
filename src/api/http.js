import axios from 'axios';
import {credentials} from "./credentials";


export const HTTPLOCATE = axios.create({
    baseURL: credentials.ciscoCMXLocate.url,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': `Basic ${new Buffer(credentials.ciscoCMXLocate.username + ":" + credentials.ciscoCMXLocate.password).toString('base64')}`,
    },
    crossdomain: true
});

export const HTTPPRESENCE = axios.create({
    baseURL: credentials.ciscoCMXPresence.url,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': `Basic ${new Buffer(credentials.ciscoCMXPresence.username + ":" + credentials.ciscoCMXPresence.password).toString('base64')}`,
    },
    crossdomain: true
});