import { useEffect, useState } from "react";

export const useMailFetching = (apiEndpoint, decodedMail, type) => {
  const [mails, setMails] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchMails = async (url) => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          const mailsArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setMails(mailsArray);
          if (type === "received") {
            const totalUnread = mailsArray.reduce(
              (count, email) => (!email.read ? count + 1 : count),
              0
            );
            setUnreadCount(totalUnread);
          }
        }
      } catch (error) {
        console.error("Error fetching mails:", error);
      }
    };

    if (type === "received") {
      fetchMails(`${apiEndpoint}/receivedEmails/${decodedMail}.json`);
    } else if (type === "sent") {
      fetchMails(`${apiEndpoint}/sentEmails/${decodedMail}.json`);
    }

    // const intervalId = setInterval(() => {
    //   if (type === "received") {
    //     fetchMails(`${apiEndpoint}/receivedEmails/${decodedMail}.json`);
    //   } else if (type === "sent") {
    //     fetchMails(`${apiEndpoint}/sentEmails/${decodedMail}.json`);
    //   }
    // }, 5000);

    // return () => clearInterval(intervalId);
  }, [apiEndpoint, decodedMail, type]);

  return { mails, unreadCount };
};
