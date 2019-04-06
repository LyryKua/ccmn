import {HTTPLOCATE, HTTPPRESENCE} from './http';

export function axiosTest(uri) {
    return HTTPLOCATE.get(uri)
        .then(response => {
        })
}
export function axiosTest2(uri) {
    return HTTPPRESENCE.get(uri)
        .then(response => {
        })
}
