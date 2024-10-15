
    // token: " BQDy0esTGnoO_EBECB9E4TME-nROWI3555zWWtvkOSyMGZrbBjUnnF8-Q_GW-G4YQ5ievh6IBBIttUtRQkzLR2CtqhCbjTtyy6aO2QXe5zuLk-0aH8V-MvYPOxys3Rd-6CsIwhIRIC-LD1hY6r7KN0fG0fgRO2MFir2U_4O7yjaHrU-G91g0-7A1qN7LocZMDawt-_ubihiEAW9iZIOmxkLQjPkj",

import { findAllByDisplayValue } from "@testing-library/react";

    export const initialState = {
      user: null,
      playlists: [],
      spotify: null,
      discover_weekly: null,
      top_artists: null,
      playing: false,
      item: null,
    };
    
    const reducer = (state, action) => {
      console.log(action);
      switch (action.type) {
        case "SET_USER":
          return {
            ...state,
            user: action.user,
          };
    
        case "SET_PLAYING":
          return {
            ...state,
            playing: action.playing,
          };
    
        case "SET_ITEM":
          return {
            ...state,
            item: action.item,
          };
    
        case "SET_DISCOVER_WEEKLY":
          return {
            ...state,
            discover_weekly: action.discover_weekly,
          };
    
        case "SET_TOP_ARTISTS":
          return {
            ...state,
            top_artists: action.top_artists,
          };
    
        case "SET_TOKEN":
          return {
            ...state,
            token: action.token,
          };
    
        case "SET_SPOTIFY":
          return {
            ...state,
            spotify: action.spotify,
          };
    
        case "SET_PLAYLISTS":
          return {
            ...state,
            playlists: action.playlists,
          };
        default:
          return state;
      }
    };
    
    export default reducer;