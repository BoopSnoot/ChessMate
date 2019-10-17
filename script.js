document.addEventListener("click", mouseClickHandler);

function mouseClickHandler(e) {
    for (let element of document.querySelectorAll("#chessboard td")) {
        element.classList.remove("cell-on-white");
        element.classList.remove("cell-on-black");
    }
    for (let element of document.querySelectorAll("#chessboard img")) {
        if (element.id.includes("-b") || element.id.includes("-w")) {
            if (e.target === element) {
                if (element.parentElement.classList.contains("black-space")) {
                    element.parentElement.classList.add("cell-on-black");
                } else if (element.parentElement.classList.contains("white-space")) {
                    element.parentElement.classList.add("cell-on-white");
                }
            }
        }
    }
    let isPiece = () => {
        for (let element of document.document.querySelectorAll("#chessboard img")) {
            if (element === e.target) return true;
        }
        return false;
    };

    if (isPiece) {
        let validMoves = calculateMoves(e.target);

        for (let cellCoords of validMoves) {
            let cellObject = document.getElementById(unparseCellID(cellCoords));
            if (cellObject !== null) {
                if (cellObject.classList.contains("black-space")) {
                    cellObject.classList.add("cell-on-black");
                } else if (cellObject.classList.contains("white-space")) {
                    cellObject.classList.add("cell-on-white");
                }
            }
        }
    }
}

function calculateMoves(pieceElement) {
    let cellElement = pieceElement.parentElement;
    let cellParsed = parseCellID(cellElement.id);
    console.log("Cell: " + cellParsed);
    let moveList = [[], []];
    // parse the pieces
    if (pieceElement.id.includes("rook")) {
        if (pieceElement.id.includes("-w")) {
            console.log("white rook");
        } else {
            console.log("black rook");
        }
        let currCell = cellParsed;
        if (currCell[0] > 0 && currCell[0] < 9 && currCell[1] > 0 && currCell[1] < 9) {
            //go left
            let endOfBoard = false;
            while (!endOfBoard) {
                currCell = [currCell[0] - 1, currCell[1]];
                if (currCell[0] > 0) {
                    moveList.push(currCell);
                } else {
                    endOfBoard = true;
                    currCell = cellParsed;
                }
            }
            endOfBoard = false;
            //go right
            while (!endOfBoard) {
                currCell = [currCell[0] + 1, currCell[1]];
                if (currCell[0] < 9) {
                    moveList.push(currCell);
                } else {
                    endOfBoard = true;
                    currCell = cellParsed;
                }
            }
            endOfBoard = false;
            //go up
            while (!endOfBoard) {
                currCell = [currCell[0] , currCell[1] + 1];
                if (currCell[1] < 9) {
                    moveList.push(currCell);
                } else {
                    endOfBoard = true;
                    currCell = cellParsed;
                }
            }
            endOfBoard = false;
            // go down
            while (!endOfBoard) {
                currCell = [currCell[0] , currCell[1] - 1];
                if (currCell[1] > 0) {
                    moveList.push(currCell);
                } else {
                    endOfBoard = true;
                    currCell = cellParsed;
                }
            }
        }
    } //done
    else if (pieceElement.id.includes("knight")) {
        if (pieceElement.id.includes("-w")) {
            console.log("white knight");
        } else {
            console.log("black knight");

        }
        let currCell = cellParsed;
        //go right up
        currCell = [currCell[0] + 2, currCell[1] + 1];
        if (currCell[0] > 0 && currCell[0] < 9 && currCell[1] > 0 && currCell[1] < 9) { moveList.push(currCell); }
        currCell = cellParsed;
        //go right down
        currCell = [currCell[0] + 2, currCell[1] - 1];
        if (currCell[0] > 0 && currCell[0] < 9 && currCell[1] > 0 && currCell[1] < 9) { moveList.push(currCell); }
        currCell = cellParsed;
        //go down right
        currCell = [currCell[0] + 1, currCell[1] - 2];
        if (currCell[0] > 0 && currCell[0] < 9 && currCell[1] > 0 && currCell[1] < 9) { moveList.push(currCell); }
        currCell = cellParsed;
        //go down left
        currCell = [currCell[0] - 1, currCell[1] - 2];
        if (currCell[0] > 0 && currCell[0] < 9 && currCell[1] > 0 && currCell[1] < 9) { moveList.push(currCell); }
        currCell = cellParsed;
        //go left up
        currCell = [currCell[0] - 2, currCell[1] + 1];
        if (currCell[0] > 0 && currCell[0] < 9 && currCell[1] > 0 && currCell[1] < 9) { moveList.push(currCell); }
        currCell = cellParsed;
        //go left down
        currCell = [currCell[0] - 2, currCell[1] - 1];
        if (currCell[0] > 0 && currCell[0] < 9 && currCell[1] > 0 && currCell[1] < 9) { moveList.push(currCell); }
        currCell = cellParsed;
        //go up left
        currCell = [currCell[0] - 1, currCell[1] + 2];
        if (currCell[0] > 0 && currCell[0] < 9 && currCell[1] > 0 && currCell[1] < 9) { moveList.push(currCell); }
        currCell = cellParsed;
        //go up right
        currCell = [currCell[0] + 1, currCell[1] + 2];
        if (currCell[0] > 0 && currCell[0] < 9 && currCell[1] > 0 && currCell[1] < 9) { moveList.push(currCell); }
    } //done
    else if (pieceElement.id.includes("bishop")) {
        if (pieceElement.id.includes("-w")) {
            console.log("white bishop");
        } else {
            console.log("black bishop");
        }

        let currCell = cellParsed;
        let endOfCell = false;

        //go right up
        while (!endOfCell) {
            currCell = [currCell[0] + 1, currCell[1] + 1];
            if (currCell[0] > 0 && currCell[0] < 9 && currCell[1] > 0 && currCell[1] < 9) {
                moveList.push(currCell);
            } else {
                endOfCell = true;
            }
        }
        endOfCell = false;
        currCell = cellParsed;

        //go left up
        while (!endOfCell) {
            currCell = [currCell[0] - 1, currCell[1] + 1];
            if (currCell[0] > 0 && currCell[0] < 9 && currCell[1] > 0 && currCell[1] < 9) {
                moveList.push(currCell);
            } else {
                endOfCell = true;
            }
        }
        endOfCell = false;
        currCell = cellParsed;

        //go right down
        while (!endOfCell) {
            currCell = [currCell[0] + 1, currCell[1] - 1];
            if (currCell[0] > 0 && currCell[0] < 9 && currCell[1] > 0 && currCell[1] < 9) {
                moveList.push(currCell);
            } else {
                endOfCell = true;
            }
        }
        endOfCell = false;
        currCell = cellParsed;

        //go left down
        while (!endOfCell) {
            currCell = [currCell[0] - 1, currCell[1] - 1];
            if (currCell[0] > 0 && currCell[0] < 9 && currCell[1] > 0 && currCell[1] < 9) {
                moveList.push(currCell);
            } else {
                endOfCell = true;
            }
        }

    } //done
    else if (pieceElement.id.includes("queen")) {
        if (pieceElement.id.includes("-w")) {
            console.log("white queen");
        } else {
            console.log("black queen");
        }

        let currCell = cellParsed;

        if (currCell[0] > 0 && currCell[0] < 9 && currCell[1] > 0 && currCell[1] < 9) {
            //go left
            let endOfBoard = false;
            while (!endOfBoard) {
                currCell = [currCell[0] - 1, currCell[1]];
                if (currCell[0] > 0) {
                    moveList.push(currCell);
                } else {
                    endOfBoard = true;
                    currCell = cellParsed;
                }
            }
            endOfBoard = false;
            //go right
            while (!endOfBoard) {
                currCell = [currCell[0] + 1, currCell[1]];
                if (currCell[0] < 9) {
                    moveList.push(currCell);
                } else {
                    endOfBoard = true;
                    currCell = cellParsed;
                }
            }
            endOfBoard = false;
            //go up
            while (!endOfBoard) {
                currCell = [currCell[0] , currCell[1] + 1];
                if (currCell[1] < 9) {
                    moveList.push(currCell);
                } else {
                    endOfBoard = true;
                    currCell = cellParsed;
                }
            }
            endOfBoard = false;
            // go down
            while (!endOfBoard) {
                currCell = [currCell[0] , currCell[1] - 1];
                if (currCell[1] > 0) {
                    moveList.push(currCell);
                } else {
                    endOfBoard = true;
                    currCell = cellParsed;
                }
            }
            endOfBoard = false;

            //go right up
            while (!endOfBoard) {
                currCell = [currCell[0] + 1, currCell[1] + 1];
                if (currCell[0] > 0 && currCell[0] < 9 && currCell[1] > 0 && currCell[1] < 9) {
                    moveList.push(currCell);
                } else {
                    endOfBoard = true;
                }
            }
            endOfBoard = false;
            currCell = cellParsed;

            //go left up
            while (!endOfBoard) {
                currCell = [currCell[0] - 1, currCell[1] + 1];
                if (currCell[0] > 0 && currCell[0] < 9 && currCell[1] > 0 && currCell[1] < 9) {
                    moveList.push(currCell);
                } else {
                    endOfBoard = true;
                }
            }
            endOfBoard = false;
            currCell = cellParsed;

            //go right down
            while (!endOfBoard) {
                currCell = [currCell[0] + 1, currCell[1] - 1];
                if (currCell[0] > 0 && currCell[0] < 9 && currCell[1] > 0 && currCell[1] < 9) {
                    moveList.push(currCell);
                } else {
                    endOfBoard = true;
                }
            }
            endOfBoard = false;
            currCell = cellParsed;

            //go left down
            while (!endOfBoard) {
                currCell = [currCell[0] - 1, currCell[1] - 1];
                if (currCell[0] > 0 && currCell[0] < 9 && currCell[1] > 0 && currCell[1] < 9) {
                    moveList.push(currCell);
                } else {
                    endOfBoard = true;
                }
            }
        }
    } //done
    else if (pieceElement.id.includes("king")) {
        if (pieceElement.id.includes("-w")) {
            console.log("white king");
        } else {
            console.log("black king");
        }


    }
    else if (pieceElement.id.includes("pawn")) {
        if (pieceElement.id.includes("-w")) {
            console.log("white pawn");
            if (cellParsed[1] + 1 < 9) {
                moveList = [[cellParsed[0], cellParsed[1] + 1]];
                if (cellParsed[1] === 2 && cellParsed[1] + 1 < 10) {
                    moveList.push([cellParsed[0], cellParsed[1] + 2]);
                }
            }
        } else {
            console.log("black pawn");
            if (cellParsed[1] - 1 > 0) {
                moveList = [[cellParsed[0], cellParsed[1] - 1]];
                if (cellParsed[1] === 7 && cellParsed[1] - 1 > 1) {
                    moveList.push([cellParsed[0], cellParsed[1] - 2]);
                }
            }
        }
    }
    return moveList;
}

function parseCellID(cellID) {
    let cellParsed;
    switch (cellID.substr(5, 1)) {
        case "A":
            cellParsed = [1, parseInt(cellID.substr(6))];
            break;
        case "B":
            cellParsed = [2, parseInt(cellID.substr(6))];
            break;
        case "C":
            cellParsed = [3, parseInt(cellID.substr(6))];
            break;
        case "D":
            cellParsed = [4, parseInt(cellID.substr(6))];
            break;
        case "E":
            cellParsed = [5, parseInt(cellID.substr(6))];
            break;
        case "F":
            cellParsed = [6, parseInt(cellID.substr(6))];
            break;
        case "G":
            cellParsed = [7, parseInt(cellID.substr(6))];
            break;
        case "H":
            cellParsed = [8, parseInt(cellID.substr(6))];
            break;
    }
    return cellParsed;
}
function unparseCellID(cellCoords) {
    let cellID;
    switch (cellCoords[0]) {
        case 1:
            cellID = "cell-A" + cellCoords[1];
            break;
        case 2:
            cellID = "cell-B" + cellCoords[1];
            break;
        case 3:
            cellID = "cell-C" + cellCoords[1];
            break;
        case 4:
            cellID = "cell-D" + cellCoords[1];
            break;
        case 5:
            cellID = "cell-E" + cellCoords[1];
            break;
        case 6:
            cellID = "cell-F" + cellCoords[1];
            break;
        case 7:
            cellID = "cell-G" + cellCoords[1];
            break;
        case 8:
            cellID = "cell-H" + cellCoords[1];
            break;
    }
    return cellID;
}
