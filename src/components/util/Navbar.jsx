import { Button, Grid, Typography } from "@mui/material";
import { useFirstRender } from '../logic/FirstRenderCheck';
import { useState, useEffect } from 'react';
import { HexIcons } from '../../assets/ImageDatabase';

const navbar_styling = {
  backgroundColor: "#e3e3e3",
  borderRadius: "20px",
  height: "15vh",
  width: "96vw",
  marginLeft: "2vw",
  position: "absolute",
  bottom: "0"
}

const pieces = ["Ant", "Beetle", "Grasshopper", "Spider", "Queen"];

function getCorrectIcon(icon, colour, setNavSelect, blackPieceCount, whitePieceCount, navbarSelection) {
  let icon_img;
  switch(icon) {
    case "Ant":
      icon_img = colour === "white" ? HexIcons["AntWhite"] : HexIcons["AntBlack"];
      break;
    case "Beetle":
      icon_img = colour === "white" ? HexIcons["BeetleWhite"] : HexIcons["BeetleBlack"];
      break;
    case "Grasshopper":
      icon_img = colour === "white" ? HexIcons["GrassWhite"] : HexIcons["GrassBlack"];
      break;
    case "Spider":
      icon_img = colour === "white" ? HexIcons["SpiderWhite"] : HexIcons["SpiderBlack"];
      break;
    case "Queen":
      icon_img = colour === "white" ? HexIcons["QueenWhite"] : HexIcons["QueenBlack"];
      break;
    default:
      break;
  }
  // styling to ensure pieces are disabled when their count reaches 0
  const img_style = {
    pointerEvents: (colour === "white" ? (whitePieceCount[icon] <= 0 ? "none" : "auto") : (blackPieceCount[icon] <= 0 ? "none" : "auto")),
    opacity: (colour === "white" ? (whitePieceCount[icon] <= 0 ? "0.3" : "1") : (blackPieceCount[icon] <= 0 ? "0.3" : "1")),
    draggable: false,
    width: "7vw",
    margin: "0.8vw"
  }
  return (
    <>
      <img src={icon_img} style={img_style} onClick={() => setNavSelect([icon, colour])}/>
      {navbarSelection[0] == icon && <img src={HexIcons["NavSelector"]} style={img_style}/>}
    </>
  )
}

function Navbar(props) {
  let active_colour = props["turn"]["colour"];
  const [blackPieceCount, setBlackPieceCount] = useState({
    "Ant": 3,
    "Beetle": 2,
    "Grasshopper": 3,
    "Spider": 2,
    "Queen": 1
  })
  const [whitePieceCount, setWhitePieceCount] = useState({
    "Ant": 3,
    "Beetle": 2,
    "Grasshopper": 3,
    "Spider": 2,
    "Queen": 1
  })

  // decrements piece counts and updates navbuttons
  const firstRender = useFirstRender();
  useEffect(() => {
    if (!firstRender) {
      let cur_selection = props["navbarSelection"];
      if (JSON.stringify(cur_selection) !== JSON.stringify(["None", "None"])) {
        if (active_colour === "black") { 
          let wpc = {...whitePieceCount}
          wpc[cur_selection[0]] = wpc[cur_selection[0]] - 1;
          setWhitePieceCount(wpc);
        }
        else { 
          let wpc = {...blackPieceCount}
          wpc[cur_selection[0]] = wpc[cur_selection[0]] - 1;
          setBlackPieceCount(wpc);
        }
        props["setNavbarSelection"](["None", "None"]);
      }
    }
  }, [props["turn"]]);

  return (
    <div style={navbar_styling}>
      <Grid container spacing={2}>
      {pieces.map(icon => 
        <Grid item xs={2.25} key={icon}>
          {getCorrectIcon(icon, active_colour, props["setNavbarSelection"], blackPieceCount, whitePieceCount, props["navbarSelection"])}
          <Typography 
          variant="h4"
          sx={{
            fontFamily: "Roboto",
            margin: "5%",
            border: "2.5px solid black",
            borderRadius: "50%",
            width: "2.3vw",
            backgroundColor: "white"
          }}
          >
            {active_colour === "white" ? whitePieceCount[icon] : blackPieceCount[icon]}
          </Typography>
        </Grid>
      )}
      </Grid>
    </div>
  );
}

export default Navbar;
