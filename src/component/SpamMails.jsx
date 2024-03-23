import React, { useEffect } from "react";
import SentMailList from "./SentMailList";
import { useDispatch, useSelector } from "react-redux";
import { mailAction } from "../store/mails-slice";
import { useParams } from "react-router-dom";
import { useMailFetching } from "../hooks/useMailFetching";
import SpamMailList from "./SpamMailList";

const SpamMails = () => {
  const dispatch = useDispatch();
  const userMail = useParams();
  const spamMails = useSelector((state) => state.mails.spamMails);
  const decodedMail = userMail.id.replace("@", "%40").replace(".", "%25");

  dispatch(mailAction.fetchSpamMails(decodedMail));

  return (
    <div className="mt-[-100vh] ml-36 w-full h-[100vh]  text-black p-11">
      <ul>
        {spamMails.map((mail) => (
          <li key={mail.id}>
            <SpamMailList
              sendername={mail.sendername}
              sentBy={mail.senderMail}
              starred={mail.starred}
              read={mail.read}
              subject={mail.subject}
              body={mail.body.replace(/(<([^>]+)>)/gi, "")}
              timestamp={mail.timestamp}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpamMails;
