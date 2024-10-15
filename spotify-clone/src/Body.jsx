
import React, { useState, useRef } from "react";
import "./Body.css";
import Header from "./Header";
import { useStateValue } from "./Stateprovider";
import SongRow from "./SongRow";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

function Body({ spotify }) {
  const [{ discover_weekly }, dispatch] = useStateValue();
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(new Audio(process.env.PUBLIC_URL + "/audio.mp3"));
  
  const handlePlayPause = () => {
    alert("click footer for it");
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
    setPlaying(!playing);
  };

  return (
    <div className="body">
      <Header spotify={spotify} />

      <div className="body__info">
        <img src={discover_weekly?.images[0].url} alt="" />
        <div className="body__infoText">
          <strong>PLAYLIST</strong>
          <h2>COOL SONGS</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>

      <div className="body__songs">
        <div className="body__icons">
          {playing ? (
            <PauseCircleFilledIcon
              className="body__shuffle"
              onClick={handlePlayPause}
            />
          ) : (
            <PlayCircleFilledIcon
              className="body__shuffle"
              onClick={handlePlayPause}
            />
          )}
          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </div>

        {discover_weekly?.tracks.items.map((item) => (
          <SongRow playSong={() => handlePlayPause()} track={item.track} />
        ))}
      </div>
    </div>
  );
}

export default Body;



// // import songs from "./Footer";
// import React, { useState } from "react";
// import "./Body.css";
// import Header from "./Header";
// import { useStateValue } from "./Stateprovider";
// import SongRow from "./SongRow";
// import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

// function Body({ spotify }) {
//   const [{ discover_weekly }, dispatch] = useStateValue();
//   console.log("Spotify instance:", spotify);
//   // const [currentIndex, setCurrentIndex] = useState(0);
//   // const [playing, setPlaying] = useState(false);
//   // const [volume, setVolume] = useState(1);
//   // const audioRef = React.useRef(new Audio(process.env.PUBLIC_URL + songs[currentIndex].audio));


//   // const handlePlayPause = () => {
//   //   if (playing) {
//   //     audioRef.current.pause();
//   //   } else {
//   //     audioRef.current.play().catch((error) => {
//   //       console.error("Error playing audio:", error);
//   //     });
//   //   }
//   //   setPlaying(!playing);
//   // };

//   const playPlaylist = (id) => {
//     spotify
//       .play({
//         context_uri: `spotify:playlist:37i9dQZEVXcJZyENOWUFo7`,
//       })
//       .then((res) => {
//         spotify.getMyCurrentPlayingTrack().then((r) => {
//           dispatch({
//             type: "SET_ITEM",
//             item: r.item,
//           });
//           dispatch({
//             type: "SET_PLAYING",
//             playing: true,
//           });
//         });
//       });
//   };

//   const playSong = (id) => {
//     spotify
//       .play({
//         uris: [`spotify:track:${id}`],
//       })
//       .then((res) => {
//         spotify.getMyCurrentPlayingTrack().then((r) => {
//           dispatch({
//             type: "SET_ITEM",
//             item: r.item,
//           });
//           dispatch({
//             type: "SET_PLAYING",
//             playing: true,
//           });
//         });
//       })
//       .catch((error) => {
//         console.error("Error playing song:", error); // Log the entire error object
  
//         // Check if the error object has a response
//         if (error.response && error.response.data && error.response.data.error) {
//           const { status, message } = error.response.data.error;
  
//           if (status === 403) {
//             alert("This action requires a Spotify Premium account.");
//           } else {
//             alert("An error occurred: " + message);
//           }
//         } else {
//           alert("songs cannot be played by click only next / prev button ");
//         }
//       });
//   };
  
  

//   return (
//     <div className="body">
//       <Header spotify={spotify} />

//       <div className="body__info">
//         <img src={discover_weekly?.images[0].url} alt="" />
//         <div className="body__infoText">
//           <strong>PLAYLIST</strong>
//           <h2>COOL SONGS</h2>
//           <p>{discover_weekly?.description}</p>
//         </div>
//       </div>

//       <div className="body__songs">
//         <div className="body__icons">
//           <PlayCircleFilledIcon
//             className="body__shuffle"
//             onClick={handlePlayPause}
//           />
//           <FavoriteIcon fontSize="large" />
//           <MoreHorizIcon />
//         </div>

//         {discover_weekly?.tracks.items.map((item) => (
//           <SongRow playSong={playSong} track={item.track} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Body;