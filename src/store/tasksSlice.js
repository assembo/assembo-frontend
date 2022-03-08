import { createSlice } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    value: [],
  },
  reducers: {
    setAllTasks: (state, action) => {
      // action.payload = tasks [task{_id, [...task_data]}]
      // sort the tasks
      const sortedTasks = action.payload.sort((a, b) => {
        const UpdateTimeA = new Date(a.updateDate);
        const UpdateTimeB = new Date(b.updateDate);
        if (UpdateTimeA < UpdateTimeB) {
          return 1;
        }
        if (UpdateTimeA > UpdateTimeB) {
          return -1;
        }
        return 0;
      });

      state.value = sortedTasks;
    },
    deleteAllTasks: (state) => {
      state.value = {};
    },
    createTask: (state, action) => {
      // action.payload = a task { _id, [...task_data] }
      state.value.unshift(action.payload);
    },
    updateTask: (state, action) => {
      // action.payload = a task { _id, [...task_data] }
      state.value = state.value.map((task) => {
        return task._id === action.payload._id ? action.payload : task;
      });
    },
    deleteTask: (state, action) => {
      //action.payload = a task_id
      state.value = state.value.filter((task) => task._id !== action.payload);
    },
    updateUserName: (state, action) => {
      state.value = state.value.map((task) => {
        if (task.updatedBy === action.payload.userId) {
          const newTask = task;
          newTask.updateUserName = action.payload.newName;
          return newTask;
        } else return task;
      });
    },
    updateTaskMediasDataUrl: (state, action) => {
      state.value = state.value.map((task) => {
        if (task._id === action.payload.id) {
          // if nothing to update, return original task
          if (action.payload.data.length === 0) return task;
          const newTask = task;
          // if medias props not exist, set it directly
          if (!task.medias) {
            newTask.medias = action.payload.data;
            return newTask;
          }
          // if medias props exist but is an empty array, push to it
          if (task.medias.length === 0) {
            newTask.medias = task.medias;
            newTask.medias.push(...action.payload.data);
          }
          // if medias props exist and exist some medias, update corresponding or push if not include
          let count = action.payload.length === 1 ? 1 : 3;
          newTask.medias = task.medias.map((media) => {
            const newMedia = media;
            if (media.keyId === action.payload.data[0].keyId) {
              newMedia.dataUrl = action.payload.data[0].dataUrl;
              count -= 1;
              return newMedia;
            }
            if (action.payload.data[1]) {
              if (media.keyId === action.payload.data[1].keyId) {
                newMedia.dataUrl = action.payload.data[1].dataUrl;
                count -= 2;
                return newMedia;
              }
            }
            return media;
          });
          switch (count) {
            case 0:
              // all medias are updated
              break;
            case 1:
              // only action.payload.data[1] is updated
              newTask.medias.push(action.payload.data[0]);
              break;
            case 2:
              // only action.payload.data[0] is updated
              newTask.medias.push(action.payload.data[1]);
              break;
            default:
              break;
          }
          return newTask;
        } else return task;
      });
    },
    updateTaskMediasBmobUrl: (state, action) => {
      state.value = state.value.map((task) => {
        if (task._id === action.payload.id) {
          // if nothing to update, return original task
          if (action.payload.data.length === 0) return task;
          const newTask = task;
          // if medias props not exist, set it directly
          if (!task.medias) {
            newTask.medias = action.payload.data;
            return newTask;
          }
          // if medias props exist but is an empty array, push to it
          if (task.medias.length === 0) {
            newTask.medias = task.medias;
            newTask.medias.push(...action.payload.data);
            return newTask;
          }
          // if medias props exist and exist some medias, update corresponding or push if not include
          let count = action.payload.length === 1 ? 1 : 3;
          newTask.medias = task.medias.map((media) => {
            const newMedia = media;
            if (media.keyId === action.payload.data[0].keyId) {
              newMedia.bmobUrl = action.payload.data[0].bmobUrl;
              count -= 1;
              return newMedia;
            }
            if (action.payload.data[1]) {
              if (media.keyId === action.payload.data[1].keyId) {
                newMedia.bmobUrl = action.payload.data[1].bmobUrl;
                count -= 2;
                return newMedia;
              }
            }
            return media;
          });
          switch (count) {
            case 0:
              // all medias are updated
              break;
            case 1:
              // only action.payload.data[1] is updated
              newTask.medias.push(action.payload.data[0]);
              break;
            case 2:
              // only action.payload.data[0] is updated
              newTask.medias.push(action.payload.data[1]);
              break;
            default:
              break;
          }
          return newTask;
        } else return task;
      });
    },
    deleteTaskMedia: (state, action) => {
      state.value = state.value.map((task) => {
        if (task._id === action.payload.id) {
          const newTask = task;
          newTask.medias = task.medias.filter((media) => media.keyId !== action.payload.keyId);
          return newTask;
        } else return task;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAllTasks,
  deleteAllTasks,
  createTask,
  updateTask,
  deleteTask,
  updateUserName,
  updateTaskMediasDataUrl,
  updateTaskMediasBmobUrl,
  deleteTaskMedia,
} = tasksSlice.actions;

export default tasksSlice.reducer;
