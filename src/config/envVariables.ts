import {config} from 'dotenv'

config()

const envVariables = {
    DB_NAME : process.env.DB_NAME,
    DB_HOST : process.env.DB_HOST,
    DB_PORT : process.env.DB_PORT,
    DB_USERNAME : process.env.DB_USERNAME,
    DB_PASSWORD : process.env.DB_PASSWORD,
    JWT_SECRET : process.env.JWT_SECRET,
    JWT_EXP_IN : process.env.JWT_EXP_IN,
    EMAIL_HOST : process.env.EMAIL_HOST,
    EMAIL_PORT : process.env.EMAIL_PORT,
    EMAIL_USER : process.env.EMAIL_USER,
    EMAIL_PASS : process.env.EMAIL_PASS,
    PORT : process.env.PORT,
    FRONTED_URL : process.env.FRONTED_URL,
    GOOGLE_CLIENT_ID : process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET : process.env.GOOGLE_CLIENT_SECRET,
    FACEBOOK_CLIENT_ID : process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET : process.env.FACEBOOK_CLIENT_SECRET
}

export default envVariables