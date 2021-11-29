import styled from 'styled-components';
import BlankHex from '../../assets/BlankHex.png'
import AntWhite from '../../assets/pieces/AntWhite.png'
import AntBlack from '../../assets/pieces/AntBlack.png'
import BeetleWhite from '../../assets/pieces/BeetleWhite.png'
import BeetleBlack from '../../assets/pieces/BeetleBlack.png'
import GrassWhite from '../../assets/pieces/GrassWhite.png'
import GrassBlack from '../../assets/pieces/GrassBlack.png'
import QueenWhite from '../../assets/pieces/QueenWhite.png'
import QueenBlack from '../../assets/pieces/QueenBlack.png'
import SpiderWhite from '../../assets/pieces/SpiderWhite.png'
import SpiderBlack from '../../assets/pieces/SpiderBlack.png'
import SelectionOverlay from '../../assets/LocationSelector.png'
import { useState, useEffect } from 'react';

function hexSelect(coordinates, activeSquare, setActiveSquare) {
  console.log(`Hex: [${coordinates["x"]}, ${coordinates["y"]}]`);
  setActiveSquare(coordinates);
}

// figures out which piece to render
function getCorrectIcon(pieces) {
  // console.log(pieces)
  if (pieces.length === 0) {
    return BlankHex
  } 
  else {
    const topmost_piece = pieces.at(-1);
    console.log(topmost_piece)
    switch(topmost_piece[0]){
      case "Ant":
        return topmost_piece[1] === "white" ? AntWhite : AntBlack;
      case "Beetle":
        return topmost_piece[1] === "white" ? BeetleWhite : BeetleBlack;
      case "Grasshopper":
        return topmost_piece[1] === "white" ? GrassWhite : GrassBlack;
      case "Spider":
        return topmost_piece[1] === "white" ? SpiderWhite : SpiderBlack;
      case "Queen":
        return topmost_piece[1] === "white" ? QueenWhite : QueenBlack;
    }
  }
}

function HexContainer({coords, activeSquare, setActiveSquare, pieces}) {
  const coordinates = coords;
  // console.log(pieces)

  return (
    <>
      <img src={getCorrectIcon(pieces)} 
        draggable="false"
        onClick={() => hexSelect(coordinates, activeSquare, setActiveSquare)}
        />
      {/* <img src={SelectionOverlay}/> */}
    </>
  );
}

export default HexContainer;


//JSON.stringify(activeSquare) !== JSON.stringify(coordinates)

//hexSelect(coordinates, setActiveSquare, activeSquare)