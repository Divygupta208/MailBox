import React, { useEffect } from "react";
import SentMailList from "./SentMailList";
import { useDispatch, useSelector } from "react-redux";
import { mailAction } from "../store/mails-slice";
import { useParams } from "react-router-dom";

const SentMails = () => {
  const dispatch = useDispatch();
  const userMail = useParams();
  const sentMails = useSelector((state) => state.mails.sentMails);
  const decodedMail = userMail.id.replace("@", "%40").replace(".", "%25");

  useEffect(() => {
    const fetchSentMails = async () => {
      const response = await fetch(
        `https://mailbox-e16e0-default-rtdb.firebaseio.com/sentEmails/${decodedMail}.json`
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        const sentMailsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        dispatch(mailAction.setSentMails(sentMailsArray));
      }
    };

    // fetchSentMails();
  }, []);

  //   console.log(sentMails);

  return (
    <div className="mt-[-100vh] ml-36 w-full h-[100vh]  text-black p-11">
      <ul>
        {sentMails.map((mail) => (
          <li key={mail.id}>
            <SentMailList
              id={mail.id}
              sentTo={mail.receiverMail}
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

export default SentMails;
