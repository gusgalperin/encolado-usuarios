import { Buffer } from 'buffer';

/*
* Autor: Galperin Gustavo
*/

function generateApiKey(str){
    const buf = Buffer.from(str, 'utf8');
    return buf.toString('base64');
}

export { generateApiKey }