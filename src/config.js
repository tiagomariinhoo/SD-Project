global.SALT_KEY = 'f5b99242-6504-4ca3-90f2-05e78e5761ef';
global.EMAIL_TMPL = 'Olá, <strong>{0}</strong>, seja bem vindo ao Node Store!';

module.exports = {
    connectionString: "mongodb://tiago:tiago123@ds025419.mlab.com:25419/sd-project",
    sendgridKey: process.env.SendGridKey,
    containerConnectionString: 'TBD'
}
