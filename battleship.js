// Battleship Game
const gameBoard = document.getElementById('game-board');
const ships = [
    { name: 'Carrier', size: 5 },
    { name: 'Battleship', size: 4 },
    { name: 'Cruiser', size: 3 },
    { name: 'Submarine', size: 3 },
    { name: 'Destroyer', size: 2 }
];

class BattleshipGame {
    constructor() {
        this.board = [];
        this.initializeBoard();
        this.placeShips();
        this.renderBoard();
    }

    initializeBoard() {
        for (let i = 0; i < 10; i++) {
            this.board[i] = [];
            for (let j = 0; j < 10; j++) {
                this.board[i][j] = { hit: false, ship: null };
            }
        }
    }

    placeShips() {
        ships.forEach(ship => {
            let placed = false;
            while (!placed) {
                const horizontal = Math.random() < 0.5;
                const row = Math.floor(Math.random() * 10);
                const col = Math.floor(Math.random() * 10);
                
                if (this.canPlaceShip(row, col, ship.size, horizontal)) {
                    this.placeShip(row, col, ship.size, horizontal, ship.name);
                    placed = true;
                }
            }
        });
    }

    canPlaceShip(row, col, size, horizontal) {
        if (horizontal) {
            if (col + size > 10) return false;
            for (let i = 0; i < size; i++) {
                if (this.board[row][col + i].ship) return false;
            }
        } else {
            if (row + size > 10) return false;
            for (let i = 0; i < size; i++) {
                if (this.board[row + i][col].ship) return false;
            }
        }
        return true;
    }

    placeShip(row, col, size, horizontal, shipName) {
        if (horizontal) {
            for (let i = 0; i < size; i++) {
                this.board[row][col + i].ship = shipName;
            }
        } else {
            for (let i = 0; i < size; i++) {
                this.board[row + i][col].ship = shipName;
            }
        }
    }

    renderBoard() {
        gameBoard.innerHTML = '';
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.addEventListener('click', () => this.fireShot(i, j));
                gameBoard.appendChild(cell);
            }
        }
    }

    fireShot(row, col) {
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        
        if (this.board[row][col].hit) {
            return;
        }

        this.board[row][col].hit = true;

        if (this.board[row][col].ship) {
            cell.classList.add('hit');
            cell.textContent = 'X';
        } else {
            cell.classList.add('miss');
            cell.textContent = '•';
        }

        this.checkGameOver();
    }

    checkGameOver() {
        const allShipsSunk = ships.every(ship => 
            this.board.flat().filter(cell => 
                cell.ship === ship.name && cell.hit
            ).length === ship.size
        );

        if (allShipsSunk) {
            alert('Congratulations! You sunk all the ships!');
        }
    }
}

// Initialize the game when the script loads
new BattleshipGame();
