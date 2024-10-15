import React, { useEffect, useState } from "react";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import { Grid, Slider } from "@material-ui/core";
import "./Footer.css";

const songs = [
  {
    title: "7 Years",
    artist: "Lukas Graham",
    audio: "/audio/audio.mp3",
    image: "/images/image.jpg",
  },
  {
    title: "Yamma Yamma",
    artist: "SPB and Shwetha Mohan",
    audio: "/audio/yamma_yamma.mp3",
    image: "/images/yamma_yamma.jpg",
  },
  {
    title: "Yathe Yathe",
    artist: "G V Prakash",
    audio: "/audio/yathe_yathe.mp3",
    image: "/images/yathe_yathe.jpg",
  },
  {
    title: "Levitating",
    artist: "Dua Lipa",
    audio: "/audio/levitating.mp3",
    image: "/images/levitating.jpg",
  },
  {
    title: "Billionera",
    artist: "Otilia",
    audio: "/audio/billionera.mp3",
    image: "/images/billionera.jpg",
  },
];

function Footer() {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  const audioRef = React.useRef(new Audio(process.env.PUBLIC_URL + songs[currentIndex].audio));

  const handlePlayPause = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
    setPlaying(!playing);
  };

  const handleTimeChange = (event, newValue) => {
    audioRef.current.currentTime = newValue;
    setCurrentTime(newValue);
  };

  const skipNext = () => {
    const nextIndex = (currentIndex + 1) % songs.length;
    changeSong(nextIndex);
  };

  const skipPrevious = () => {
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    changeSong(prevIndex);
  };

  const changeSong = (index) => {
    audioRef.current.pause();
    audioRef.current.src = process.env.PUBLIC_URL + songs[index].audio;
    audioRef.current.volume = volume;

    // Play only if the current song was playing
    if (playing) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
    
    setCurrentIndex(index);
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    audioRef.current.volume = newValue;
  };

  useEffect(() => {
    audioRef.current.volume = volume;
    audioRef.current.src = process.env.PUBLIC_URL + songs[currentIndex].audio;

    const setAudioData = () => {
      setDuration(audioRef.current.duration);
      setCurrentTime(audioRef.current.currentTime);
    };

    const updateCurrentTime = () => setCurrentTime(audioRef.current.currentTime);

    if (playing) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }

    audioRef.current.addEventListener("loadeddata", setAudioData);
    audioRef.current.addEventListener("timeupdate", updateCurrentTime);

    return () => {
      audioRef.current.removeEventListener("loadeddata", setAudioData);
      audioRef.current.removeEventListener("timeupdate", updateCurrentTime);
    };
  }, [currentIndex, playing, volume]);

  return (
    <div className="footer">
      <div className="footer__left">
        <img
          className="footer__albumLogo"
          src={process.env.PUBLIC_URL + songs[currentIndex].image}
          alt={songs[currentIndex].title}
        />
        <div className="footer__songInfo">
          <h4>{songs[currentIndex].title}</h4>
          <p>{songs[currentIndex].artist}</p>
        </div>
      </div>

      <div className="footer__center">
        <ShuffleIcon className="footer__green" />
        <SkipPreviousIcon onClick={skipPrevious} className="footer__icon" />
        
        <div>
          {playing ? (
            <PauseCircleOutlineIcon onClick={handlePlayPause} fontSize="large" className="footer__icon" />
          ) : (
            <PlayCircleOutlineIcon onClick={handlePlayPause} fontSize="large" className="footer__icon" />
          )}
        </div>
        
        <SkipNextIcon onClick={skipNext} className="footer__icon" />
        <RepeatIcon className="footer__green" />

        <Slider
          value={currentTime}
          max={duration || 1}
          onChange={handleTimeChange}
          aria-labelledby="continuous-slider"
          step={1}
          min={0}
          style={{ marginLeft: '25px', width: '200px' }}
        />
      </div>

      <div className="footer__right">
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
            <Slider
              value={volume}
              onChange={handleVolumeChange}
              aria-labelledby="continuous-slider"
              min={0}
              max={1}
              step={0.01}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;



// import React, { useEffect, useState } from "react";
// import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
// import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
// import SkipNextIcon from "@material-ui/icons/SkipNext";
// import ShuffleIcon from "@material-ui/icons/Shuffle";
// import RepeatIcon from "@material-ui/icons/Repeat";
// import VolumeDownIcon from "@material-ui/icons/VolumeDown";
// import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
// import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
// import "./Footer.css";
// import { Grid, Slider } from "@material-ui/core";

// const songs = [
//   {
//     title: "7 Years",
//     artist: "Lukas Graham",
//     audio: "/audio/audio.mp3",
//     image: "/images/image.jpg",
//   },
//   // Add other songs...
// ];

// function Footer() {
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [playing, setPlaying] = useState(false);
//   const [volume, setVolume] = useState(1);

//   const audioRef = React.useRef(new Audio(process.env.PUBLIC_URL + songs[currentIndex].audio));

//   const handlePlayPause = () => {
//     if (playing) {
//       audioRef.current.pause();
//     } else {
//       audioRef.current.play().catch((error) => {
//         console.error("Error playing audio:", error);
//       });
//     }
//     setPlaying(!playing);
//   };

//   const handleTimeChange = (event, newValue) => {
//     audioRef.current.currentTime = newValue;
//     setCurrentTime(newValue);
//   };

//   const skipNext = () => {
//     setCurrentIndex((prevIndex) => {
//       const nextIndex = (prevIndex + 1) % songs.length;
//       changeSong(nextIndex);
//       return nextIndex;
//     });
//   };

//   const skipPrevious = () => {
//     setCurrentIndex((prevIndex) => {
//       const prevIndexAdjusted = (prevIndex - 1 + songs.length) % songs.length;
//       changeSong(prevIndexAdjusted);
//       return prevIndexAdjusted;
//     });
//   };

//   const changeSong = (index) => {
//     audioRef.current.pause();
//     audioRef.current.src = process.env.PUBLIC_URL + songs[index].audio;
//     audioRef.current.volume = volume;
//     audioRef.current.play().catch((error) => {
//       console.error("Error playing audio:", error);
//     });
//     setPlaying(true);
//   };

//   const handleVolumeChange = (event, newValue) => {
//     setVolume(newValue);
//     audioRef.current.volume = newValue;
//   };

//   useEffect(() => {
//     audioRef.current.volume = volume;
//     audioRef.current.src = process.env.PUBLIC_URL + songs[currentIndex].audio;

//     const setAudioData = () => {
//       setDuration(audioRef.current.duration);
//       setCurrentTime(audioRef.current.currentTime);
//     };

//     const updateCurrentTime = () => setCurrentTime(audioRef.current.currentTime);

//     audioRef.current.addEventListener("loadeddata", setAudioData);
//     audioRef.current.addEventListener("timeupdate", updateCurrentTime);

//     return () => {
//       audioRef.current.removeEventListener("loadeddata", setAudioData);
//       audioRef.current.removeEventListener("timeupdate", updateCurrentTime);
//     };
//   }, [currentIndex, volume]);

//   return (
//     <div className="footer">
//       <div className="footer__left">
//         <img
//           className="footer__albumLogo"
//           src={process.env.PUBLIC_URL + songs[currentIndex].image}
//           alt={songs[currentIndex].title}
//         />
//         <div className="footer__songInfo">
//           <h4>{songs[currentIndex].title}</h4>
//           <p>{songs[currentIndex].artist}</p>
//         </div>
//       </div>

//       <div className="footer__center">
//         <ShuffleIcon className="footer__green" />
//         <SkipPreviousIcon onClick={skipPrevious} className="footer__icon" />
//         {playing ? (
//           <PauseCircleOutlineIcon onClick={handlePlayPause} fontSize="large" className="footer__icon" />
//         ) : (
//           <PlayCircleOutlineIcon onClick={handlePlayPause} fontSize="large" className="footer__icon" />
//         )}
//         <SkipNextIcon onClick={skipNext} className="footer__icon" />
//         <RepeatIcon className="footer__green" />
//         <Slider
//           value={currentTime}
//           max={duration || 1}
//           onChange={handleTimeChange}
//           aria-labelledby="continuous-slider"
//           step={1}
//           min={0}
//         />
//         <div></div>
//       </div>

//       <div className="footer__right">
//         <Grid container spacing={2}>
//           <Grid item>
//             <PlaylistPlayIcon />
//           </Grid>
//           <Grid item>
//             <VolumeDownIcon />
//           </Grid>
//           <Grid item xs>
//             <Slider
//               value={volume}
//               onChange={handleVolumeChange}
//               aria-labelledby="continuous-slider"
//               min={0}
//               max={1}
//               step={0.01}
//             />
//           </Grid>
//         </Grid>
//       </div>
//     </div>
//   );
// }

// export default Footer;



