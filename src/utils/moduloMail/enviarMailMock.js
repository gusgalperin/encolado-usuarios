class MailerMock {
    enviar  = (to, subjectAndBodyProvider) => {
        console.log('sending fake email')
    }
}

export default MailerMock