class ConwayGame {

    // Private properties
    #canvasElement = null
    #iterationCount = 0
    #gameInterval = null
    #board = []

    // Public properties
    boardHeightPx = 0
    boardWidthPx = 0
    cellColor = '#000'
    cellSizePx = 50
    backgroundColor = '#FFF'
    iterationTimeInMs = 500
    randomCellsNumber = 10

    getIsPlaying = () => this.#gameInterval !== null

    constructor(
        canvasElement,
        options = {
            boardWidthPx: canvasElement?.clientWidth,
            boardHeightPx: canvasElement?.clientHeight,
            cellSizePx: Math.round(canvasElement?.clientHeight / 100),
            cellColor: '#000',
            backgroundColor: '#FFF',
            iterationTimeInMs: 500,
            randomCellsNumber: Math.round((canvasElement?.clientHeight + canvasElement?.clientWidth) / 2)
        }
    ) {

        if (canvasElement?.tagName !== 'CANVAS') throw new Error('The provided object is not an HTML CANVAS element.')

        this.#canvasElement = canvasElement

        canvasElement.width = options.boardWidthPx
        canvasElement.height = options.boardHeightPx

        this.boardWidthPx = options.boardWidthPx ?? canvasElement.clientWidth
        this.boardHeightPx = options.boardHeightPx ?? canvasElement.clientHeight
        this.cellSizePx = options.cellSizePx ?? Math.round(canvasElement.clientHeight / 100)
        this.cellColor = options.cellColor ?? '#000'
        this.backgroundColor = options.backgroundColor ?? '#FFF'
        this.iterationTimeInMs = options.iterationTimeInMs ?? 500
        this.randomCellsNumber = options.randomCellsNumber ?? Math.round((canvasElement.clientHeight + canvasElement.clientWidth) / 2)
        this.#initializeBoard()
    }

    #getPxCoordinates(index) {
        return index * this.cellSizePx
    }

    #initializeBoard() {
        const availableCellsAxisY = Math.round(this.boardHeightPx / this.cellSizePx)
        const availableCellsAxisX = Math.round(this.boardWidthPx / this.cellSizePx)

        for (let y = 0; y < availableCellsAxisY; y++) {
            this.#board[y] = []
            for (let x = 0; x < availableCellsAxisX; x++) {
                this.#board[y][x] = false
            }
        }
    }

    play() {

        if (this.#gameInterval !== null) return

        const createRandomCells = () => {

            for (let i = 0; i < this.randomCellsNumber; i++) {

                let x = Math.round(Math.random() * (this.boardWidthPx / this.cellSizePx - 1))
                let y = Math.round(Math.random() * (this.boardHeightPx / this.cellSizePx - 1))

                if (!this.#board[y][x]) this.#board[y][x] = true
                else i--
            }
        }

        if (this.#iterationCount === 0) createRandomCells()

        this.#gameInterval = setInterval(() => {
            this.#iterationCount++
            this.#updateBoard()
        }, this.iterationTimeInMs);
    }

    stop() {
        clearInterval(this.#gameInterval)
        this.#gameInterval = null
    }

    reset() {
        this.stop()
        this.#iterationCount = 0
        this.#initializeBoard()
        this.#updateBoard()
    }

    #updateBoard() {

        const evaluate = () => {
            let boardCopy = this.#board.map(y => y.map(x => x))

            const getNeighboursAmount = (y, x) => new Array(
                boardCopy[y - 1]?.[x], // Top
                boardCopy[y + 1]?.[x], // Bottom
                boardCopy[y]?.[x - 1], // Left
                boardCopy[y]?.[x + 1], // Right
                boardCopy[y - 1]?.[x - 1], // Top-Left
                boardCopy[y - 1]?.[x + 1], // Top-Right
                boardCopy[y + 1]?.[x - 1], // Bottom-Left
                boardCopy[y + 1]?.[x + 1] // Bottom-Right
            ).filter(alive => alive).length

            for (let y = 0; y < this.#board.length; y++) {
                for (let x = 0; x < this.#board[0].length; x++) {

                    let neighbourAmount = getNeighboursAmount(y, x)

                    if (this.#board[y][x] && neighbourAmount < 2 || neighbourAmount > 3)
                        this.#board[y][x] = false

                    else if (neighbourAmount === 3) this.#board[y][x] = true
                }
            }
        }

        const clear = () => {
            this.#canvasElement.getContext('2d').fillStyle = this.backgroundColor
            this.#canvasElement.getContext('2d').fillRect(0, 0, this.boardWidthPx, this.boardHeightPx)
        }

        const draw = () => {
            for (let y = 0; y < this.#board.length; y++) {
                for (let x = 0; x < this.#board[0].length; x++) {
                    if (this.#board[y][x]) {
                        this.#canvasElement.getContext('2d').fillStyle = this.cellColor
                        this.#canvasElement.getContext('2d').fillRect(this.#getPxCoordinates(x), this.#getPxCoordinates(y), this.cellSizePx, this.cellSizePx)
                    }
                }
            }
        }

        // Game loop
        clear()
        draw()
        evaluate()
    }
}