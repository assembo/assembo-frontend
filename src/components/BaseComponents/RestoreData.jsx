import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
  deserializeConfiguration,
} from "../../utils/deserialization";
import { setAllTasks } from "../../store/tasksSlice";
import { setAllCards } from "../../store/cardsSlice";
import { setUser } from "../../store/userSlice";
import { setAllUsers } from "../../store/usersSlice";
import { SyncLoader } from "react-spinners";
import { setAllUserTaskMaps } from "../../store/userTaskMapsSlice";
import API from "../../api/axios";

export default function GetData({ content }) {
  const user = useSelector((state) => state.user.value);
  let [canRedirect, setCanRedirect] = useState(Boolean(user));
  const dispatch = useDispatch();
  const restoreData = async () => {
    const url = `user/${Cookies.get("userId")}/get/`;
    const userResult = await API.get(url);
    const deserializedUserData = deserializeConfiguration(userResult.data)
    const user = deserializedUserData.user;
    let [ tasks, cards, userTaskMaps ] = [ [], [], [] ]
    dispatch(setAllTasks(tasks));
    dispatch(setAllCards(cards));
    dispatch(setAllUserTaskMaps(userTaskMaps));
    dispatch(setUser(user));
    dispatch(setAllUsers([user]));
    setCanRedirect(true);
  };

  // use Boolean(user) instead of canRedirect because state update is async, which leads to duplicate post request to backend
  if (!canRedirect) {
    restoreData();
  }
  if (canRedirect) {
    return content;
  }
  else
    return (
      <div style={{ position: "absolute", top: "48%", left: "44%" }}>
        <SyncLoader color="#434A54" />
      </div>
    );
}

