import React, { useRef } from "react";
import { easeInOut, motion, useScroll } from "framer-motion";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/user-slice";

const ComposeMailForm = () => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.ui.showCompose);
  const senderMail = useRef();
  const receiverMail = useRef();
  const subjectRef = useRef();
  const BodyRef = useRef();
  const token = useSelector((state) => state.user.token);
  const userMail = useSelector((state) => state.user.email);
  const receiverId = useSelector((state) => state.user.receiverId);
  const userId = useSelector((state) => state.user.userUId);

  const handleSendMail = async (event) => {
    event.preventDefault();

    const subject = subjectRef.current.value;
    const body = BodyRef.current.value;

    //part-1 fetching users unique Ids;
    const fetchUserId = async (userMail) => {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=
        AIzaSyDpOjJsAurA_2hvvb5UoPxME3muFlO0YZQ`,
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const dataId = await response.json();

      console.log(dataId);

      const user = dataId.users.find((user) => user.email === userMail);

      if (user) {
        const userId = user.localId;
        dispatch(userActions.setUserUid(userId));
        console.log(`User ID for${userId}`);
      } else {
        console.log(`User with email ${userEmailToFind} not found.`);
      }
    };

    fetchUserId(userMail);

    //part-2  storing in sent mails as sending mails

    sendEmail(
      userMail.replace("@", "%40").replace(".", "%25"),
      receiverMail.current.value,
      subject,
      body
    );

    //part3- storing in received mails as receivedEmails
    receiveEmail(
      receiverMail.current.value.replace("@", "%40").replace(".", "%25"),
      userMail,
      subject,
      body
    );
  };

  const sendEmail = async (senderMail, receiverMail, subject, body) => {
    try {
      const response = await fetch(
        `https://mailbox-e16e0-default-rtdb.firebaseio.com/sentEmails/${senderMail}.json`,
        {
          method: "POST",
          body: JSON.stringify({
            receiverMail: receiverMail,
            subject: subject,
            body: body,
            starred: false,
            read: false,
            timestamp: new Date().toISOString(),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log("Email sent successfully:", data.name);
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const receiveEmail = async (receiverMail, senderMail, subject, body) => {
    try {
      const response = await fetch(
        `https://mailbox-e16e0-default-rtdb.firebaseio.com/receivedEmails/${receiverMail}.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderMail: senderMail,
            subject: subject,
            body: body,
            starred: false,
            read: false,
            timestamp: new Date().toISOString(),
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Email received successfully:", data.name);
      } else {
        throw new Error("Failed to receive email");
      }
    } catch (error) {
      console.error("Error receiving email:", error);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className="  inset-0 flex items-center justify-center bg-black bg-opacity-50 mt-[-10vh]"
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto mt-[-90vh] bg-[#d8d8d8] p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4">Compose Email</h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="sender"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sender's Email:
                </label>
                <input
                  type="email"
                  ref={senderMail}
                  value={userMail}
                  id="sender"
                  name="sender"
                  className="input-field w-full rounded-lg"
                  placeholder="Enter sender's email"
                />
              </div>

              <div>
                <label
                  htmlFor="receiver"
                  className="block text-sm font-medium text-gray-700"
                >
                  Receiver's Email:
                </label>
                <input
                  type="email"
                  ref={receiverMail}
                  id="receiver"
                  name="receiver"
                  className="input-field w-full rounded-lg"
                  placeholder="Enter receiver's email"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subject:
                </label>
                <input
                  type="text"
                  ref={subjectRef}
                  id="subject"
                  name="subject"
                  className="input-field w-full rounded-lg"
                  placeholder="Enter subject"
                />
              </div>

              <div>
                <label
                  htmlFor="body"
                  className="block text-sm font-medium text-gray-700"
                >
                  Body:
                </label>
                <ReactQuill
                  className="bg-white rounded-lg border-none"
                  theme="snow"
                  ref={BodyRef}
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, false] }],
                      ["bold", "italic", "underline", "strike", "blockquote"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["link", "image"],
                      ["clean"],
                    ],
                  }}
                  placeholder="Compose your message..."
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                onClick={handleSendMail}
              >
                Send
              </button>
              <button type="button" className="btn-primary">
                Close
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ComposeMailForm;
