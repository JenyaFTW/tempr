import React, { useContext } from "react";
import { Context } from "../context";
import './Emails.scss'

const timeSince = (date) => {
    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + "y ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + "mo ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + "d ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + "h ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + "m ago";
    }
    return Math.floor(seconds) + "s ago";
  }

const Emails = () => {
    const { emails } = useContext(Context);

    return (
        <div className="emails">
            {
                emails && emails.map(email => {
                    return (
                        <Email
                            messageId={email.messageId}
                            subject={email.subject}
                            htmlContent={email.htmlContent}
                            fromAddr={email.fromAddr}
                            toAddr={email.toAddr}
                            fromName={email.fromName}
                            toName={email.toName}
                            received={email.received}
                        />
                    );
                })
            }
        </div>
    );
};

const Email = (props) => {
    const {
        messageId,
        subject,
        htmlContent,
        fromAddr,
        toAddr,
        fromName,
        toName,
        received
    } = props;

    return (
        <div className="email">
            <div className="email__subject">{ subject }</div>
            <div className="email__timestamp">{ timeSince(received * 1000) }</div>
        </div>
    )
}

export default Emails;