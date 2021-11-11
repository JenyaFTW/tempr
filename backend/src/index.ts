import dotenv from 'dotenv';
import SMTP from './lib/smtp';

dotenv.config({ path: __dirname + '../../../.env' });
const smtp = new SMTP;

require('./lib/mongoose');
require('./app')

smtp.startServer();
