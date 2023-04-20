import { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  serverTimestamp,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";

const Search = () => {
  const [searchUserName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { dispatch } = useContext(ChatContext);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", searchUserName)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setErr(true);
    }
  };

  const handleKeyDown = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    const handleSelect = (u) => {
      dispatch({ type: "CHANGE_USER", payload: u });
    };

    // check whether the chat exists, if not create new chat in firestore
    const combineId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combineId));
      console.log(res.exists());
      if (!res.exists()) {
        // create a chat in chats collection
        try {
          await setDoc(doc(db, "chats", combineId), {
            messages: [],
          });
        } catch (error) {
          console.log("error in creating chats collection", error);
        }

        // create user chats
        try {
          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [combineId + ".userInfo"]: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            [combineId + ".date"]: serverTimestamp(),
          });
        } catch (error) {
          console.log("error in updating doc", error);
        }

        await updateDoc(doc(db, "userChats", user.uid), {
          [combineId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combineId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      // setErr(true);
      console.log("error in firestore", error);
    }

    setUser(null);
    setUserName("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="find a user..."
          onKeyDown={handleKeyDown}
          onChange={(e) => setUserName(e.target.value)}
          value={searchUserName}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect(user)}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
