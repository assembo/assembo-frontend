import { configureStore } from "@reduxjs/toolkit";
import meetingCenterReducer from "./meetingCenterSlice";
import meetingsReducer from "./meetingsSlice";
import tasksReducer from "./tasksSlice";
import cardsReducer from "./cardsSlice";
import userReducer from "./userSlice";
import userTaskMapsReducer from "./userTaskMapsSlice";
import usersReducer from "./usersSlice";

export default configureStore({
	reducer: {
		meetingCenter: meetingCenterReducer,
		meetings: meetingsReducer,
		tasks: tasksReducer,
		cards: cardsReducer,
		user: userReducer,
		userTaskMaps: userTaskMapsReducer,
		users: usersReducer,
	}
});
