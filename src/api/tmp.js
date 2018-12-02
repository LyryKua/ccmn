import {HTTPLOCATE, HTTPPRESENCE} from './http';

export function axiosTest(uri) {
    return HTTPLOCATE.get(uri)
        .then(response => {
            console.log('locate', response);
            response.status === 200 && console.log(response.data);
        })
}
export function axiosTest2(uri) {
    return HTTPPRESENCE.get(uri)
        .then(response => {
            console.log('presence', response);
            response.status === 200 && console.log(response.data);
        })
}
