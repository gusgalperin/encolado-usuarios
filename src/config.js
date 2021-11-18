const PORT = 8010
const SECRET = 'auth-poc-secret-key'
const DB_PATH = './db'
const MONGO_URI = 'mongodb://mongodb:mongodb@localhost:27017'
const MONGO_DB_NAME = 'encoladoUsuarios'
const USE_MONGO = true
const FAKE_MAIL = true

//-------------------------------------------------------------

//correo creado para prueba
// const USER = 'alexnunez_2187@outlook.com'
// const PASS = 'Asdfgh_123'
const USER = 'eventosOrt@outlook.com'
const PASS = 'qwerty123456'




export { 
    PORT, 
    SECRET,
    DB_PATH,
    MONGO_URI,
    MONGO_DB_NAME,
    USE_MONGO,
    PASS,
    USER,
    FAKE_MAIL
}