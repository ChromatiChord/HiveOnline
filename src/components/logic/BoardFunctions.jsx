// ideal number is 23
export const board_size = 15;

export const traversal_memory = {
  "UP": [0, -2],
  "UP_RIGHT": [1, -1],
  "DOWN_RIGHT": [1, 1],
  "DOWN": [0, 2],
  "DOWN_LEFT": [-1, 1],
  "UP_LEFT": [-1, -1]
}

// increments the turn by one
function incrementTurn(turn, setTurn) {
  let return_turn = {...turn};
  const counter = return_turn["counter"];
  const colour = return_turn["colour"];

  return_turn["counter"] = colour === "black" ? counter + 1 : counter;
  return_turn["colour"] = colour === "black" ? "white" : "black";
  setTurn(return_turn);
}

// array coordinates of hexes that have a selection overlay on them
export let selection_hexes = []

export function createBoard() {
  // construct the board
  let board_data = Array(board_size);
  
  // fills the board the necessary coords with hexes
  // if x AND y are even, or if x AND y are odd,
  // fills that space with hex
  for (let x = 0; x < board_data.length; x++) {
    let y_array = Array(board_size);
    for (let y = 0; y < board_data.length; y++) {
      if ((x % 2 === 0 && y % 2 === 0) || 
      (x % 2 !== 0 && y % 2 !== 0)) {
        y_array[y] = {
          "isHex": true,
          "pieces": [],
          "selection": []
        };
      } else {
        y_array[y] = {"isHex": false};
      }
    }
    board_data[x] = y_array;
  }

  // debug board data
  // const center_coord = (board_size - 1) / 2;
  // board_data[center_coord][center_coord - 2]["pieces"].push(["Ant", "black"]);
  // board_data[center_coord + 1][center_coord - 1]["pieces"].push(["Queen", "white"]);

  return board_data;
}

// this is the master function where piece movement calculations will occur
export function getPotentialHexes(boardData, pieceType, turn, origin) {
  const center_coord = (board_size - 1) / 2;
  // first turn logic
  if (turn["colour"] === "white" && turn["counter"] === 1) {
    selection_hexes = [[center_coord, center_coord]];
  } 
  // place adjacent to center of board
  else if (turn["colour"] === "black" && turn["counter"] === 1) {
    let return_coords = [];
    for (const direction in traversal_memory) {
      let adjacent_coordinates = [center_coord + traversal_memory[direction][0], center_coord + traversal_memory[direction][1]]
      return_coords.push(adjacent_coordinates)
    }
    selection_hexes = return_coords;
  }
  // INSERT PIECE MOVEMENT LOGIC HERE
  // at the moment it just assumes the entire board is fair game
  else {
    console.log(`Funky Stuff`);
    let full_board = [];
    for (let x = 0; x < board_size; x++) {  
      for (let y = 0; y < board_size; y++) {
        full_board.push([x, y]);
      }
    }  
    selection_hexes = full_board;
  }
}

export function clearSelectionHexes(boardData, setBoardData) {
  let board_data_copy = [...boardData];

  for (let x = 0; x < board_size; x++) {
    for (let y = 0; y < board_size; y++) {
      board_data_copy[x][y]["selection"] = [];
    }
  }

  setBoardData(board_data_copy);
}


export function placePotentialHexes(boardData, setBoardData, pieceType, origin) {
  clearSelectionHexes(boardData, setBoardData);
  let board_copy = [...boardData];
  for (const coordinates of selection_hexes){
    board_copy[coordinates[0]][coordinates[1]]["selection"].push({
      "piece": pieceType,
      "origin": origin
    })
  }
  setBoardData(board_copy);
}

export function placeHex(coords, selectionData, boardData, setBoardData, turn, setTurn) {
  let board_data_copy = [...boardData];
  let origin = selectionData["origin"];
  let piece = selectionData["piece"];
  clearSelectionHexes(boardData, setBoardData);
  // remove topmost piece from origin if it's not empty
  if (JSON.stringify(origin) != JSON.stringify([-1, -1])) {
    board_data_copy[origin[0]][origin[1]]["pieces"].pop();
  } 
  // place new piece at coords
  board_data_copy[coords["x"]][coords["y"]]["pieces"].push(piece);
  setBoardData(board_data_copy);
  incrementTurn(turn, setTurn);
}