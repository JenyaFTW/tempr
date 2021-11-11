import dotenv from 'dotenv';
import SMTP from './lib/smtp';

dotenv.config();
const smtp = new SMTP;

require('./lib/mongoose');
require('./app')

smtp.startServer();
