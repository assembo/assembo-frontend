import { createSlice } from "@reduxjs/toolkit";

export const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    value: [],
  },
  reducers: {
    setAllCards: (state, action) => {
      state.value = action.payload;
    },
    setCardBatch: (state, action) => {
      const rawValue = state.value.slice().concat(action.payload);
      const newValue = new Set(rawValue);
      state.value = [...newValue];
    },
    deleteAllCards: (state) => {
      state.value = [];
    },
    createCard: (state, action) => {
      // action.payload = a card { _id, [...card_data] }
      state.value.push(action.payload);
    },
    updateCard: (state, action) => {
      // action.payload = a card { _id, [...card_data] }
      console.log(" store update cards");
      state.value = state.value.map((card) => {
        return card._id === action.payload._id ? action.payload : card;
      });
    },
    deleteCard: (state, action) => {
      //action.payload = a card_id
      state.value = state.value.filter((card) => card._id !== action.payload);
    },
    updateCardMediasDataUrl: (state, action) => {
      state.value = state.value.map((card) => {
        if (card._id === action.payload.id) {
          // if nothing to update, return original task
          if (action.payload.data.length === 0) return card;
          if (card === undefined) return {};
          const newCard = card;
          // if medias props not exist, set it directly
          if (!card.medias || card.medias === undefined) {
            newCard.medias = action.payload.data;
            return newCard;
          }
          // if medias props exist but is an empty array, push to it
          // if action.payload not found, push to it
          if (card.medias.length === 0) {
            newCard.medias = [...card.medias];
            newCard.medias.push(...action.payload.data);
            return newCard;
          }

          // if medias props exist and exist some medias, update corresponding or push if not include
          let count = action.payload.data.length === 1 ? 1 : 3;
          newCard.medias = card.medias.map((media) => {
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
              newCard.medias.push(action.payload.data[0]);
              break;
            case 2:
              // only action.payload.data[0] is updated
              newCard.medias.push(action.payload.data[1]);
              break;
            default:
              break;
          }
          return newCard;
        } else return card;
      });
    },
    updateCardMediasBmobUrl: (state, action) => {
      state.value = state.value.map((card) => {
        if (card._id === action.payload.id) {
          // if nothing to update, return original card
          if (action.payload.data.length === 0) return card;
          if (card === undefined) return {};
          const newCard = card;
          // if medias props not exist, set it directly
          if (!card.medias || card.medias === undefined) {
            newCard.medias = action.payload.data;
            return newCard;
          }
          // if medias props exist but is an empty array, push to it
          if (card.medias.length === 0) {
            newCard.medias = card.medias;
            newCard.medias.push(...action.payload.data);
            return newCard;
          }
          // if medias props exist and exist some medias, update corresponding or push if not include
          let count = action.payload.data.length === 1 ? 1 : 3;
          newCard.medias = card.medias.map((media) => {
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
              newCard.medias.push(action.payload.data[0]);
              break;
            case 2:
              // only action.payload.data[0] is updated
              newCard.medias.push(action.payload.data[1]);
              break;
            default:
              break;
          }
          return newCard;
        } else return card;
      });
    },
    deleteCardMedia: (state, action) => {
      state.value = state.value.map((card) => {
        if (card._id === action.payload.id) {
          const newCard = card;
          newCard.medias = card.medias.filter((media) =>
            media !== undefined ? media.keyId !== action.payload.keyId : false
          );
          return newCard;
        } else return card;
      });
    },
  },
});

export const {
  setAllCards,
  deleteAllCards,
  createCard,
  updateCard,
  deleteCard,
  updateCardMediasDataUrl,
  updateCardMediasBmobUrl,
  deleteCardMedia,
  setCardBatch,
} = cardsSlice.actions;

export default cardsSlice.reducer;
