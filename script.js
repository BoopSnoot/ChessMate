document.addEventListener("click", mouseClickHandler);
let selectPiece;

function mouseClickHandler(e) {
    cleanUp("cell-on-color");
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
    function isPiece() {
        let isPiece = false;
        for (let element of document.querySelectorAll("#chessboard img")) {
            if (element === e.target) isPiece = true;
        }
        return isPiece
    }

    if (isPiece()) {
        selectPiece = e.target;
        let validMoves = calculateMoves(e.target.parentElement);

        for (let cellCoords of validMoves) {
            let cellObject = document.getElementById(parseCellCoords(cellCoords));
            if (cellObject !== null) {
                cellObject.classList.add("cell-on");
                if (cellObject.classList.contains("black-space")) {
                    cellObject.classList.add("cell-on-black");
                } else if (cellObject.classList.contains("white-space")) {
                    cellObject.classList.add("cell-on-white");
                }
            }
        }
    }
    else if (e.target.classList.contains("cell-on")) {
        movePiece(selectPiece, e.target);
    }
}

function calculateMoves(cellElement) {
    function isInBoard(currCell) {
        return (currCell[0] > 0 && currCell[0] < 9 && currCell[1] > 0 && currCell[1] < 9);
    }
    function cellFree(currCell) {
        return document.getElementById(parseCellCoords(currCell)).getElementsByTagName("img").length === 0;
    }

    let pieceElement = cellElement.getElementsByTagName("img")[0];
    let cellParsed = parseCellID(cellElement.id);
    let moveList = [];

    console.log("Cell: " + cellParsed);

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
            let endOfMove = false;
            while (!endOfMove) {
                currCell = [currCell[0] - 1, currCell[1]];
                if (currCell[0] > 0 && cellFree(currCell)) {
                    moveList.push(currCell);
                } else {
                    endOfMove = true;
                    currCell = cellParsed;
                }
            }
            endOfMove = false;
            //go right
            while (!endOfMove) {
                currCell = [currCell[0] + 1, currCell[1]];
                if (currCell[0] < 9 && cellFree(currCell)) {
                    moveList.push(currCell);
                } else {
                    endOfMove = true;
                    currCell = cellParsed;
                }
            }
            endOfMove = false;
            //go up
            while (!endOfMove) {
                currCell = [currCell[0] , currCell[1] + 1];
                if (currCell[1] < 9 && cellFree(currCell)) {
                    moveList.push(currCell);
                } else {
                    endOfMove = true;
                    currCell = cellParsed;
                }
            }
            endOfMove = false;
            // go down
            while (!endOfMove) {
                currCell = [currCell[0] , currCell[1] - 1];
                if (currCell[1] > 0 && cellFree(currCell)) {
                    moveList.push(currCell);
                } else {
                    endOfMove = true;
                    currCell = cellParsed;
                }
            }
        }
    }
    else if (pieceElement.id.includes("knight")) {
        if (pieceElement.id.includes("-w")) {
            console.log("white knight");
        } else {
            console.log("black knight");

        }
        let currCell = cellParsed;

        //go right up
        currCell = [currCell[0] + 2, currCell[1] + 1];
        if (isInBoard(currCell) && cellFree(currCell)) { moveList.push(currCell); }
        currCell = cellParsed;
        //go right down
        currCell = [currCell[0] + 2, currCell[1] - 1];
        if (isInBoard(currCell) && cellFree(currCell)) { moveList.push(currCell); }
        currCell = cellParsed;
        //go down right
        currCell = [currCell[0] + 1, currCell[1] - 2];
        if (isInBoard(currCell) && cellFree(currCell)) { moveList.push(currCell); }
        currCell = cellParsed;
        //go down left
        currCell = [currCell[0] - 1, currCell[1] - 2];
        if (isInBoard(currCell) && cellFree(currCell)) { moveList.push(currCell); }
        currCell = cellParsed;
        //go left up
        currCell = [currCell[0] - 2, currCell[1] + 1];
        if (isInBoard(currCell) && cellFree(currCell)) { moveList.push(currCell); }
        currCell = cellParsed;
        //go left down
        currCell = [currCell[0] - 2, currCell[1] - 1];
        if (isInBoard(currCell) && cellFree(currCell)) { moveList.push(currCell); }
        currCell = cellParsed;
        //go up left
        currCell = [currCell[0] - 1, currCell[1] + 2];
        if (isInBoard(currCell) && cellFree(currCell)) { moveList.push(currCell); }
        currCell = cellParsed;
        //go up right
        currCell = [currCell[0] + 1, currCell[1] + 2];
        if (isInBoard(currCell) && cellFree(currCell)) { moveList.push(currCell); }
    }
    else if (pieceElement.id.includes("bishop")) {
        if (pieceElement.id.includes("-w")) {
            console.log("white bishop");
        } else {
            console.log("black bishop");
        }

        let currCell = cellParsed;
        let endOfMove = false;

        //go right up
        while (!endOfMove) {
            currCell = [currCell[0] + 1, currCell[1] + 1];
            if (currCell[0] > 0 && currCell[0] < 9 && currCell[1] > 0 && currCell[1] < 9 && cellFree(currCell)) {
                moveList.push(currCell);
            } else {
                endOfMove = true;
            }
        }
        endOfMove = false;
        currCell = cellParsed;

        //go left up
        while (!endOfMove) {
            currCell = [currCell[0] - 1, currCell[1] + 1];
            if (currCell[0] > 0 && currCell[0] < 9 && currCell[1] > 0 && currCell[1] < 9 && cellFree(currCell)) {
                moveList.push(currCell);
            } else {
                endOfMove = true;
            }
        }
        endOfMove = false;
        currCell = cellParsed;

        //go right down
        while (!endOfMove) {
            currCell = [currCell[0] + 1, currCell[1] - 1];
            if (currCell[0] > 0 && currCell[0] < 9 && currCell[1] > 0 && currCell[1] < 9 && cellFree(currCell)) {
                moveList.push(currCell);
            } else {
                endOfMove = true;
            }
        }
        endOfMove = false;
        currCell = cellParsed;

        //go left down
        while (!endOfMove) {
            currCell = [currCell[0] - 1, currCell[1] - 1];
            if (currCell[0] > 0 && currCell[0] < 9 && currCell[1] > 0 && currCell[1] < 9 && cellFree(currCell)) {
                moveList.push(currCell);
            } else {
                endOfMove = true;
            }
        }

    }
    else if (pieceElement.id.includes("queen")) {
        if (pieceElement.id.includes("-w")) {
            console.log("white queen");
        } else {
            console.log("black queen");
        }

        let currCell = cellParsed;

        if (currCell[0] > 0 && currCell[0] < 9 && currCell[1] > 0 && currCell[1] < 9) {
            //go left
            let endOfMove = false;
            while (!endOfMove) {
                currCell = [currCell[0] - 1, currCell[1]];
                if (currCell[0] > 0 && cellFree(currCell)) {
                    moveList.push(currCell);
                } else {
                    endOfMove = true;
                    currCell = cellParsed;
                }
            }
            endOfMove = false;
            //go right
            while (!endOfMove) {
                currCell = [currCell[0] + 1, currCell[1]];
                if (currCell[0] < 9 && cellFree(currCell)) {
                    moveList.push(currCell);
                } else {
                    endOfMove = true;
                    currCell = cellParsed;
                }
            }
            endOfMove = false;
            //go up
            while (!endOfMove) {
                currCell = [currCell[0] , currCell[1] + 1];
                if (currCell[1] < 9 && cellFree(currCell)) {
                    moveList.push(currCell);
                } else {
                    endOfMove = true;
                    currCell = cellParsed;
                }
            }
            endOfMove = false;
            // go down
            while (!endOfMove) {
                currCell = [currCell[0] , currCell[1] - 1];
                if (currCell[1] > 0 && cellFree(currCell)) {
                    moveList.push(currCell);
                } else {
                    endOfMove = true;
                    currCell = cellParsed;
                }
            }
            endOfMove = false;

            //go right up
            while (!endOfMove) {
                currCell = [currCell[0] + 1, currCell[1] + 1];
                if (currCell[0] > 0 && currCell[0] < 9 && currCell[1] > 0 && currCell[1] < 9 && cellFree(currCell)) {
                    moveList.push(currCell);
                } else {
                    endOfMove = true;
                }
            }
            endOfMove = false;
            currCell = cellParsed;

            //go left up
            while (!endOfMove) {
                currCell = [currCell[0] - 1, currCell[1] + 1];
                if (currCell[0] > 0 && currCell[0] < 9 && currCell[1] > 0 && currCell[1] < 9 && cellFree(currCell)) {
                    moveList.push(currCell);
                } else {
                    endOfMove = true;
                }
            }
            endOfMove = false;
            currCell = cellParsed;

            //go right down
            while (!endOfMove) {
                currCell = [currCell[0] + 1, currCell[1] - 1];
                if (currCell[0] > 0 && currCell[0] < 9 && currCell[1] > 0 && currCell[1] < 9 && cellFree(currCell)) {
                    moveList.push(currCell);
                } else {
                    endOfMove = true;
                }
            }
            endOfMove = false;
            currCell = cellParsed;

            //go left down
            while (!endOfMove) {
                currCell = [currCell[0] - 1, currCell[1] - 1];
                if (currCell[0] > 0 && currCell[0] < 9 && currCell[1] > 0 && currCell[1] < 9 && cellFree(currCell)) {
                    moveList.push(currCell);
                } else {
                    endOfMove = true;
                }
            }
        }
    }
    else if (pieceElement.id.includes("king")) {
        if (pieceElement.id.includes("-w")) {
            console.log("white king");
        } else {
            console.log("black king");
        }

        // check boundaries
        let goUp = (cellParsed[1] + 1) < 9;
        let goDown = (cellParsed[1] - 1) > 0;
        let goLeft = (cellParsed[0] - 1) > 0;
        let goRight = (cellParsed[0] + 1) < 9;

        //probe all 8 ways
        if (goDown && cellFree([cellParsed[0], cellParsed[1] - 1])) {
            moveList.push([cellParsed[0], cellParsed[1] - 1]);
            if (goLeft && cellFree([cellParsed[0] - 1, cellParsed[1] - 1])) { moveList.push([cellParsed[0] - 1, cellParsed[1] - 1]) }
            if (goRight && cellFree([cellParsed[0] + 1, cellParsed[1] - 1])) { moveList.push([cellParsed[0] + 1, cellParsed[1] - 1]) }
        }
        if (goRight && cellFree([cellParsed[0] + 1, cellParsed[1]])) {
            moveList.push([cellParsed[0] + 1, cellParsed[1]]);
            if (goUp && cellFree([cellParsed[0] + 1, cellParsed[1] + 1])) { moveList.push([cellParsed[0] + 1, cellParsed[1] + 1]) }
        }
        if (goUp && cellFree([cellParsed[0], cellParsed[1] + 1])) {
            moveList.push([cellParsed[0], cellParsed[1] + 1]);
            if (goLeft && cellFree([cellParsed[0] - 1, cellParsed[1] + 1])) { moveList.push([cellParsed[0] - 1, cellParsed[1] + 1]) }
        }
        if (goLeft && cellFree([cellParsed[0] - 1, cellParsed[1]])) { moveList.push([cellParsed[0] - 1, cellParsed[1]]); }

    }
    else if (pieceElement.id.includes("pawn")) {
        if (pieceElement.id.includes("-w")) {
            console.log("white pawn");
            if (cellParsed[1] + 1 < 9 && cellFree([cellParsed[0], cellParsed[1] + 1])) {
                moveList = [[cellParsed[0], cellParsed[1] + 1]];
                if (cellParsed[1] === 2 && cellParsed[1] + 1 < 10 && cellFree([cellParsed[0], cellParsed[1] + 2])) {
                    moveList.push([cellParsed[0], cellParsed[1] + 2]);
                }
            }
        } else {
            console.log("black pawn");
            if (cellParsed[1] - 1 > 0 && cellFree([cellParsed[0], cellParsed[1] - 1])) {
                moveList = [[cellParsed[0], cellParsed[1] - 1]];
                if (cellParsed[1] === 7 && cellParsed[1] - 1 > 1 && cellFree([cellParsed[0], cellParsed[1] - 2])) {
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

function movePiece(piece, toCell) {
    let pieceHTML = piece.parentElement.innerHTML;
    piece.parentElement.innerHTML = "";
    toCell.innerHTML = pieceHTML;
    cleanUp("cell-on");
}

function parseCellCoords(cellCoords) {
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

function cleanUp(type) {
    for (let element of document.querySelectorAll("#chessboard td")) {
        if (type === "cell-on-color") {
            element.classList.remove("cell-on-white");
            element.classList.remove("cell-on-black");
        } else if (type === "cell-on") {
            element.classList.remove("cell-on");
        }
    }
}