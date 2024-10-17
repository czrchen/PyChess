const chessboard = document.querySelector('.chessboard');
const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

for (let row = 8; row >= 1; row--) {
    for (let col = 0; col < 8; col++) {
        const square = document.createElement('div');
        square.id = files[col] + row;  // Assigning unique ID like 'a1', 'b2', etc.
        square.classList.add('square');

        if ((row + col) % 2 === 0) {
            square.classList.add('light'); // Add light class
        } else {
            square.classList.add('dark'); // Add dark class
        }

        chessboard.appendChild(square);
    }
}

// Example of recording a piece position
function placePiece(piece, position) {
    const square = document.getElementById(position);
    if (square) {
        square.textContent = piece;  // Place the piece as text in the square (e.g., '♟' for pawn)
    }
}


placePiece('♖', 'a1');
placePiece('♘', 'b1');
placePiece('♗', 'c1');
placePiece('♕', 'd1');
placePiece('♔', 'e1');
placePiece('♗', 'f1');
placePiece('♘', 'g1');
placePiece('♖', 'h1');

placePiece('♙', 'a2');
placePiece('♙', 'b2');
placePiece('♙', 'c2');
placePiece('♙', 'd2');
placePiece('♙', 'e2');
placePiece('♙', 'f2');
placePiece('♙', 'g2');
placePiece('♙', 'h2');

placePiece('♜', 'a8');
placePiece('♞', 'b8');
placePiece('♝', 'c8');  
placePiece('♛', 'd8'); 
placePiece('♚', 'e8'); 
placePiece('♝', 'f8'); 
placePiece('♞', 'g8'); 
placePiece('♜', 'h8'); 

placePiece('♟', 'a7');
placePiece('♟', 'b7');
placePiece('♟', 'c7');  
placePiece('♟', 'd7'); 
placePiece('♟', 'e7'); 
placePiece('♟', 'f7'); 
placePiece('♟', 'g7'); 
placePiece('♟', 'h7'); 
  