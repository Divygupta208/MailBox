import React, { useEffect } from "react";
import ReceivedMailList from "./ReceivedMailList";
import { useDispatch, useSelector } from "react-redux";
import { mailAction } from "../store/mails-slice";
import { useParams } from "react-router-dom";

const ReceivedMails = () => {
  const dispatch = useDispatch();
  const userMail = useParams();
  const receivedMails = useSelector((state) => state.mails.receivedMails);
  const decodedMail = userMail.id.replace("@", "%40").replace(".", "%25");

  useEffect(() => {
    const fetchReceivedMails = async () => {
      const response = await fetch(
        `https://mailbox-e16e0-default-rtdb.firebaseio.com/receivedEmails/${decodedMail}.json`
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        const receivedMailArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        console.log(receivedMailArray);

        dispatch(mailAction.setReceivedMails(receivedMailArray));
      }
    };

    // fetchReceivedMails();
  }, []);

  //   console.log(sentMails);

  return (
    <div className="mt-[-100vh] ml-36 w-full h-[100vh]  text-black p-11">
      {receivedMails.map((mail) => (
        <ReceivedMailList
          key={mail.id}
          id={mail.id}
          sentBy={mail.senderMail}
          subject={mail.subject}
          body={mail.body.replace(/(<([^>]+)>)/gi, "")}
          timestamp={mail.timestamp}
        />
      ))}
    </div>
  );
};

export default ReceivedMails;
