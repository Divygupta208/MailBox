import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { mailAction } from "../store/mails-slice";

function useMailUpdater() {
  const dispatch = useDispatch();

  const updateMail = async (id, apiEndpoint, decodedMail, updatedMail) => {
    try {
      const response = await fetch(
        `${apiEndpoint}/receivedEmails/${decodedMail}/${id}.json`,
        {
          method: "PATCH",
          body: JSON.stringify(updatedMail),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating mail:", error);
    }
  };

  const markAsRead = async (id, apiEndpoint, decodedMail) => {
    const updatedMail = { read: true };
    await updateMail(id, apiEndpoint, decodedMail, updatedMail);
  };

  const toggleStarred = async (
    id,
    apiEndpoint,
    decodedMail,
    newStarredStatus
  ) => {
    const updatedMail = { starred: newStarredStatus };
    await updateMail(id, apiEndpoint, decodedMail, updatedMail);
  };

  const toggleSpam = async (id, apiEndpoint, decodedMail, spamStatus) => {
    const updatedMail = { spam: spamStatus };
    await updateMail(id, apiEndpoint, decodedMail, updatedMail);
  };

  return {
    markAsRead,
    toggleStarred,
    toggleSpam,
  };
}

export default useMailUpdater;
