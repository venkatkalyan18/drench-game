"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [noofMoves, setNoOfMoves] = useState(30);
  const rows = 14;
  const cols = 14;

  const [array, setArray] = useState([]);
  const [isVisited, setIsVisited] = useState([]);
  const [gameWon, setGameWon] = useState(false);

  const getRandomNumbers = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  const fillRandomNumbersInArray = () => {
    const tempArray = [];
    const isVisitedTempArray = [];
    for (let i = 0; i < rows; i++) {
      tempArray[i] = [];
      isVisitedTempArray[i] = [];
      for (let j = 0; j < cols; j++) {
        tempArray[i][j] = getRandomNumbers();
        isVisitedTempArray[i][j] = 0;
      }
    }
    isVisitedTempArray[0][0] = 1;
    setArray(tempArray);
    setIsVisited(isVisitedTempArray);
  };

  const handleChange = (colorChoosed) => {
    console.log(colorChoosed);
    let visitedArray = [...isVisited];
    let boardArray = [...array];
    let queue = [];
    let directions = [
      [1, 0],
      [0, 1],
      [0, -1],
      [-1, 0],
    ];

    let isVisitedArray = [];
    for (let i = 0; i < 14; i++) {
      isVisitedArray[i] = [];
      for (let j = 0; j < 14; j++) {
        isVisitedArray[i][j] = 0;
      }
    }

    for (let i = 0; i < 14; i++) {
      for (let j = 0; j < 14; j++) {
        if (visitedArray[i][j] === 1) {
          boardArray[i][j] = colorChoosed;
        }
      }
    }

    queue.push([0, 0]);
    while (queue.length > 0) {
      let [i, j] = queue.shift();
      isVisitedArray[i][j] = 1;

      for (let direction = 0; direction < directions.length; direction++) {
        let row = i + directions[direction][0];
        let col = j + directions[direction][1];

        if (
          row >= 0 &&
          col >= 0 &&
          row < boardArray.length &&
          col < boardArray[0].length &&
          isVisitedArray[row][col] === 0 &&
          boardArray[row][col] === colorChoosed
        ) {
          queue.push([row, col]);
          visitedArray[row][col] = 1;
          console.log("hello");
        }
      }
    }

    setIsVisited(visitedArray);
    setArray(boardArray);
    setNoOfMoves((prev) => prev - 1);
  };

  const handleChangedfs = (colorChoosed) => {
    console.log(colorChoosed);
    let visitedArray = [...isVisited];
    let boardArray = [...array];
    let queue = [];
    let directions = [
      [1, 0],
      [0, 1],
      [0, -1],
      [-1, 0],
    ];

    let isVisitedArray = [];
    for (let i = 0; i < 14; i++) {
      isVisitedArray[i] = [];
      for (let j = 0; j < 14; j++) {
        isVisitedArray[i][j] = 0;
      }
    }

    for (let i = 0; i < 14; i++) {
      for (let j = 0; j < 14; j++) {
        if (visitedArray[i][j] === 1) {
          boardArray[i][j] = colorChoosed;
        }
      }
    }

    helper(visitedArray, boardArray, isVisitedArray, 0, 0, colorChoosed);
    setGameWon(isWin(boardArray, colorChoosed));
    setIsVisited(visitedArray);
    setArray(boardArray);
    setNoOfMoves((prev) => prev - 1);
  };

  const isWin = (boardArray, colorChoosed) => {
    for (let i = 0; i < 14; i++) {
      for (let j = 0; j < 14; j++) {
        if (boardArray[i][j] != colorChoosed) {
          return false;
        }
      }
    }
    return true;
  };

  const helper = (
    visitedArray,
    boardArray,
    isVisitedArray,
    row,
    col,
    colorChoosed
  ) => {
    isVisitedArray[row][col] = 1;
    visitedArray[row][col] = 1;
    let directions = [
      [1, 0],
      [0, 1],
      [0, -1],
      [-1, 0],
    ];
    for (let direction = 0; direction < directions.length; direction++) {
      let r = row + directions[direction][0];
      let c = col + directions[direction][1];
      if (
        r >= 0 &&
        c >= 0 &&
        r < 14 &&
        c < 14 &&
        isVisitedArray[r][c] === 0 &&
        boardArray[r][c] === colorChoosed
      ) {
        helper(visitedArray, boardArray, isVisitedArray, r, c, colorChoosed);
      }
    }
  };

  const reset = () => {
    fillRandomNumbersInArray();
    setGameWon(false);
    setNoOfMoves(30);
  };

  useEffect(() => {
    fillRandomNumbersInArray();
  }, []);

  return (
    <section className="h-screen min-screen flex justify-center items-center overflow-hidden">
      <div className="flex justify-center items-center gap-4  max-md:flex-col">
        <div className="grid  grid-rows-14 grid-cols-14 w-fit shadow-2xl relative">
          {gameWon ? (
            <div
              className="w-[300px] h-[300px] bg-orange-600 absolute bottom-5 right-5 text-center flex flex-col gap-4 justify-center items-center cursor-pointer"
              onClick={() => reset()}
            >
              <h1 className="text-6xl text-white font-bold">
                Game <br /> Won
              </h1>
              <p className="text-xl text-white font-bold">
                Click this box <br /> to try again!
              </p>
            </div>
          ) : noofMoves <= 0 ? (
            <div
              className="w-[300px] h-[300px] bg-orange-600 absolute bottom-5 right-5 text-center flex flex-col gap-4 justify-center items-center cursor-pointer"
              onClick={() => reset()}
            >
              <h1 className="text-6xl text-white font-bold">
                Game <br /> Over
              </h1>
              <p className="text-xl text-white font-bold">
                Click this box <br /> to try again!
              </p>
            </div>
          ) : (
            <></>
          )}
          {array.map((numsArray, rowIndex) =>
            numsArray.map((nums, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`w-6 h-6 ${
                  nums === 1
                    ? "bg-green-600"
                    : nums === 2
                    ? "bg-pink-600"
                    : nums === 3
                    ? "bg-violet-600"
                    : nums === 4
                    ? "bg-green-200"
                    : nums === 5
                    ? "bg-red-600"
                    : "bg-yellow-400"
                }   `}
              ></div>
            ))
          )}
        </div>
        <div className="flex flex-col gap-4 p-4 h-full bg-black bg-opacity-20 shadow-2xl w-[280px]">
          <div className="flex gap-5 ml-4">
            <div className="text-6xl bg-black text-white p-4  min-w-20 text-center min-h-20">
              {noofMoves}
            </div>
            <p className="text-xl font-bold">
              Moves to <br /> Drench the <br />
              board
            </p>
          </div>
          <div className="grid grid-cols-3 grid-rows-2 gap-4 ml-7">
            <div
              className={`bg-green-600 w-10 h-10  border-black border-4 rounded-full cursor-pointer hover:bg-opacity-80 ${
                noofMoves <= 0 || gameWon ? "pointer-events-none" : ""
              }`}
              onClick={() => handleChangedfs(1)}
            ></div>
            <div
              className={`bg-pink-600 w-10 h-10  border-black border-4 rounded-full cursor-pointer hover:bg-opacity-80 ${
                noofMoves <= 0 || gameWon ? "pointer-events-none" : ""
              }`}
              onClick={() => handleChangedfs(2)}
            ></div>
            <div
              className={`bg-violet-600 w-10 h-10  border-black border-4 rounded-full cursor-pointer hover:bg-opacity-80 ${
                noofMoves <= 0 || gameWon ? "pointer-events-none" : ""
              }`}
              onClick={() => handleChangedfs(3)}
            ></div>
            <div
              className={`bg-green-200 w-10 h-10  border-black border-4 rounded-full cursor-pointer hover:bg-opacity-80 ${
                noofMoves <= 0 || gameWon ? "pointer-events-none" : ""
              }`}
              onClick={() => handleChangedfs(4)}
            ></div>
            <div
              className={`bg-red-600 w-10 h-10  border-black border-4 rounded-full cursor-pointer hover:bg-opacity-80 ${
                noofMoves <= 0 || gameWon ? "pointer-events-none" : ""
              }`}
              onClick={() => handleChangedfs(5)}
            ></div>
            <div
              className={`bg-yellow-600 w-10 h-10  border-black border-4 rounded-full cursor-pointer hover:bg-opacity-80 ${
                noofMoves <= 0 || gameWon ? "pointer-events-none" : ""
              }`}
              onClick={() => handleChangedfs(6)}
            ></div>
          </div>
          <button
            className="px-4 py-2 bg-yellow-600 w-36 ml-14 font-bold  text-xl"
            onClick={() => reset()}
          >
            Reset
          </button>
        </div>
      </div>
    </section>
  );
};

export default Page;
