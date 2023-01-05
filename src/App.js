import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { MainContext } from "./context";
import { ReactComponent as AddIcon } from "./image/AddIcon.svg";
import { ReactComponent as CheckIcon } from "./image/ChekIcon.svg";

import "./App.css";
import Cart from "./components/Cart";

function App() {
  const mounted = useRef()
  const [users, setUsers] = useState();
  const [loader, setLoader] = useState(false);
  const [newName, setNewName] = useState();
  const [newLastName, setNewLastName] = useState();
  const [newBirthDate, setNewBirthDate] = useState();
  const [newEmail, setNewEmail] = useState();
  const [addingUser, setAddingUser] = useState(false);
  const [currentDropDown, setSelectDropDown] = useState("Филтровать по")



  const fetchUsers = async () => {
    setLoader(true);
    await axios({
      method: "get",
      url: "https://retoolapi.dev/eqsQ4S/users",
    }).then((resp) => (setUsers(resp.data), setLoader(false)));
  };

  const editUser = async () => {
    setLoader(true);
    await axios({
      method: "post",
      url: `https://retoolapi.dev/eqsQ4S/users`,
      data: {
        id: new Date(),
        name: newName,
        lastName: newLastName,
        email: newEmail,
        birthDate: newBirthDate,
      },
    })
      .then((resp) => console.log(resp))
      .catch((error) => {
        console.log(error);
      });
    await fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, [mounted]);

  return (
    <MainContext.Provider value={{ users, setUsers, setLoader }}>
      <div className="App">
        {loader &&
          <div className="loadScreen">
            <div className="lds-spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        }
        <div></div>
        <div className="cartsBlock">
          {users?.map(({ id, name, lastName, birthDate, email }) => (
            <Cart
              id={id}
              name={name}
              lastName={lastName}
              birthDate={birthDate}
              email={email}
              key={id}
            />
          ))}
          {addingUser ? (
            <div className="cart">
              <div className="infoBlock">
                <div className="infoRow">
                  <p className="title">Name: </p>

                  <input
                    type="text"
                    className="input"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>
                <div className="infoRow">
                  <p className="title">LastName: </p>

                  <input
                    type="text"
                    value={newLastName}
                    className="input"
                    onChange={(e) => setNewLastName(e.target.value)}
                  />
                </div>
                <div className="infoRow">
                  <p className="title">BirthDate: </p>

                  <input
                    type="text"
                    value={newBirthDate}
                    className="input"
                    onChange={(e) => setNewBirthDate(e.target.value)}
                  />
                </div>
                <div className="infoRow">
                  <p className="title">Email: </p>

                  <input
                    type="text"
                    className="input"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="btmBlock">
                <button
                  className="editBtn"
                  onClick={() => (
                    setAddingUser(false),
                    editUser(),
                    setNewName(""),
                    setNewLastName(""),
                    setNewBirthDate(""),
                    setNewEmail("")
                  )}
                >
                  <CheckIcon />
                </button>
              </div>
            </div>
          ) : (
            <button className="addUser" onClick={() => setAddingUser(true)}>
              <AddIcon />
            </button>
          )}
        </div>
      </div>
    </MainContext.Provider>
  );
}

export default App;
