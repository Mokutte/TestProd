import React, { useState, useContext, useEffect } from "react";
import { ReactComponent as EditIcon } from "../image/EditIcon.svg";
import { ReactComponent as DeleteIcon } from "../image/deletIcon.svg";
import { ReactComponent as CheckIcon } from "../image/ChekIcon.svg";
import { MainContext } from "../context";
import axios from "axios";
import "../App.css";

export default function Cart(props) {
  const { users, setUsers, setLoader } = useContext(MainContext);
  const [editView, setEditView] = useState(false);
  const [newName, setNewName] = useState();
  const [newLastName, setNewLastName] = useState();
  const [newBirthDate, setNewBirthDate] = useState();
  const [newEmail, setNewEmail] = useState();

  const fetchUsers = async () => {
    await axios({
      method: "get",
      url: "https://retoolapi.dev/eqsQ4S/users",
    }).then((resp) => (setUsers(resp.data), setLoader(false)));
  };

  useEffect(() => {
    setNewName(props.name);
    setNewLastName(props.lastName);
    setNewBirthDate(props.birthDate);
    setNewEmail(props.email);
  }, []);

  const editUser = async () => {
    setLoader(true);
    await axios({
      method: "put",
      url: `https://retoolapi.dev/eqsQ4S/users/${props.id}`,
      data: {
        id: props.id,
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

  const deleteUser = async () => {
    setLoader(true);
    await axios({
      method: "delete",
      url: `https://retoolapi.dev/eqsQ4S/users/${props.id}`,
    })
      .then((resp) => console.log("Пользователь удален"))
      .catch((error) => {
        console.log(error);
      });
    await fetchUsers();
  };

  return (
    <div className="cart">
      <div className="infoBlock">
        <div className="infoRow">
          <p className="title">Name: </p>
          {editView ? (
            <input
              type="text"
              className="input"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          ) : (
            <p>{props.name}</p>
          )}
        </div>
        <div className="infoRow">
          <p className="title">LastName: </p>
          {editView ? (
            <input
              type="text"
              value={newLastName}
              className="input"
              onChange={(e) => setNewLastName(e.target.value)}
            />
          ) : (
            <p>{props.lastName}</p>
          )}
        </div>
        <div className="infoRow">
          <p className="title">BirthDate: </p>
          {editView ? (
            <input
              type="text"
              value={newBirthDate}
              className="input"
              onChange={(e) => setNewBirthDate(e.target.value)}
            />
          ) : (
            <p>{props.birthDate}</p>
          )}
        </div>
        <div className="infoRow">
          <p className="title">Email: </p>
          {editView ? (
            <input
              type="text"
              className="input"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          ) : (
            <p>{props.email}</p>
          )}
        </div>
      </div>
      <div className="btmBlock">
        {editView ? (
          <button
            className="editBtn"
            onClick={() => (setEditView(false), editUser())}
          >
            <CheckIcon />
          </button>
        ) : (
          <>
            <button className="editBtn" onClick={() => deleteUser()}>
              <DeleteIcon />
            </button>
            <button className="editBtn" onClick={() => setEditView(true)}>
              <EditIcon />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
