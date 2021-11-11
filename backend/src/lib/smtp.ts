import { SMTPServer, SMTPServerDataStream, SMTPServerSession } from 'smtp-server';
import { AddressObject, ParsedMail, simpleParser } from 'mailparser';
import { Email } from '../models/Email.model';
import { pubsub } from "./pubsub";

class SMTP {
    server: SMTPServer;

    constructor() {
        this.server = new SMTPServer({
            authOptional: true,
            onData(stream: SMTPServerDataStream, session: SMTPServerSession, cb: (err ?: Error | null | undefined) => void) {
                simpleParser(stream).then(async (email: ParsedMail) => {
                    const emailObj = new Email({
                        subject: email.subject,
                        messageId: email.messageId,
                        htmlContent: email.html,
                        fromName: email.from?.value[0].name,
                        fromAddr: email.from?.value[0].address,
                        toName: (email.to as AddressObject).value[0].name,
                        toAddr: (email.to as AddressObject).value[0].address,
                        received: Math.round(Date.now() / 1000)
                    });

                    await emailObj.save();

                    pubsub.publish(`EMAIL_ADDED_${(email.to as AddressObject).value[0].address}`, { emailAdded: emailObj });
                    
                    cb();
                }, cb);
            }
        });
    }

    startServer() {
        const SMTP_PORT = process.env.SMTP_PORT || 25;
        this.server.listen(SMTP_PORT);

        console.log(`Started SMTP server on port ${SMTP_PORT}`);
    }
}

export default SMTP;