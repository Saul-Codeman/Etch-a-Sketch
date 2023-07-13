// Creates the canvas grid and populates with the specified cells
function createCanvas(canvasSize){
    const canvasWidthHeight = 480;
    const canvas = document.querySelector('.canvas');

    const cellWidthHeight = canvasWidthHeight / canvasSize;

    for (let i = 0; i < canvasSize; i++){
        // Create row in canvas
        const row = document.createElement('div');
        row.classList.add('canvas-row')
        for (let j = 0; j < canvasSize; j++){
            // Create box in canvas
            const cell = document.createElement('div');
            cell.style.width = `${cellWidthHeight}px`;
            cell.style.height = `${cellWidthHeight}px`;
            cell.classList.add('canvas-cell');
            row.appendChild(cell);
        }
        canvas.appendChild(row);
    }
    return canvas
}

// Clears the canvas by setting each cell to the default color
function clearCanvas(cells){
    cells.forEach((cell) => {
        cell.style.backgroundColor = '#C5C6C7';
    });
}

// Sets each cells clicked color to black
function setBlack(cells){
    cells.forEach((cell) => {

        cell.addEventListener('mousedown', () => {
            cell.style.backgroundColor = 'black';
        });

        cell.addEventListener('mousemove', (event) => {
            if (event.buttons === 1) { // Check if left mouse button is held down
                cell.style.backgroundColor = 'black';
            }
        });
    });
}

// Set each cells clicked color to random colors
function setColors(cells){
    cells.forEach((cell) => {

        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        const rgbValue = `rgb(${red}, ${green}, ${blue})`;

        cell.addEventListener('mousedown', () => {
            cell.style.backgroundColor = rgbValue;
        });

        cell.addEventListener('mousemove', (event) => {
            if (event.buttons === 1) { // Check if left mouse button is held down
                cell.style.backgroundColor = rgbValue;
            }
        });
    });
}

// Set each cells clicked color to default cell color
function setErase(cells){
    cells.forEach((cell) => {

        cell.addEventListener('mousedown', () => {
            cell.style.backgroundColor = '#C5C6C7';
        });

        cell.addEventListener('mousemove', (event) => {
            if (event.buttons === 1) { // Check if left mouse button is held down
                cell.style.backgroundColor = '#C5C6C7';
            }
        });
    });
}

// Set each cells clicked color to the user's color
function setUserColor(cells, userColor){
    cells.forEach((cell) => {

        cell.addEventListener('mousedown', () => {
            cell.style.backgroundColor = userColor;
        });

        cell.addEventListener('mousemove', (event) => {
            if (event.buttons === 1) { // Check if left mouse button is held down
                cell.style.backgroundColor = userColor;
            }
        });
    });
}

// Remove all cells from canvas
function removeCellsFromCanvas(canvasContainer){
    while (canvasContainer.firstChild) {
        canvasContainer.firstChild.remove();
    }
}

// Set all event listeners
function setEventListeners(cells){
    // Initialize buttons
    const userChoiceButton = document.querySelector('#userChoice');
    const blackButton = document.querySelector('#black');
    const colorButton = document.querySelector('#colors');
    const eraseButton = document.querySelector('#erase');
    const clearButton = document.querySelector('#clear');

    // Set blackButton as the initially active button
    userChoiceButton.classList.remove('active');
    blackButton.classList.add('active');
    colorButton.classList.remove('active');
    eraseButton.classList.remove('active');
    setBlack(cells);

    // User choice button takes the selected color 
    const userChoiceColor = document.querySelector('#colorPicker');
    userChoiceButton.addEventListener('click', () => {
        userChoiceButton.classList.add('active');
        blackButton.classList.remove('active');
        colorButton.classList.remove('active');
        eraseButton.classList.remove('active');
        setUserColor(cells, userChoiceColor.value);
    });

    userChoiceColor.addEventListener('input', () => {
        userChoiceButton.classList.add('active');
        blackButton.classList.remove('active');
        colorButton.classList.remove('active');
        eraseButton.classList.remove('active');
        setUserColor(cells, userChoiceColor.value);
    });

    // Black button changes pen to black
    blackButton.addEventListener('click', () => {
        userChoiceButton.classList.remove('active');
        blackButton.classList.add('active');
        colorButton.classList.remove('active');
        eraseButton.classList.remove('active');
        setBlack(cells);
    });
    // Color button changes background color when clicked for each cell
    colorButton.addEventListener('click', () => {
        userChoiceButton.classList.remove('active');
        blackButton.classList.remove('active');
        colorButton.classList.add('active');
        eraseButton.classList.remove('active');
        setColors(cells);
    });
    // Erase button changes 'pen' to erase
    eraseButton.addEventListener('click', () => {
        userChoiceButton.classList.remove('active');
        blackButton.classList.remove('active');
        colorButton.classList.remove('active');
        eraseButton.classList.add('active');
        setErase(cells);
    });
    // Clear button clears the canvas
    clearButton.addEventListener('click', () => {
        clearCanvas(cells);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Create the canvas
    const canvasSize = document.querySelector('#canvasSize');
    const canvasSizeText = document.querySelector('#sizeValue');
    createCanvas(canvasSize.value);
    // Get canvas cells
    const cells = document.querySelectorAll('.canvas-cell');

    // Initialize buttons
    const userChoiceButton = document.querySelector('#userChoice');
    const blackButton = document.querySelector('#black');
    const colorButton = document.querySelector('#colors');
    const eraseButton = document.querySelector('#erase');
    const clearButton = document.querySelector('#clear');

    // Set blackButton as the initially active button
    blackButton.classList.add('active');
    setBlack(cells);
    
    // Set cells event listeners
    setEventListeners(cells);

    // Change in canvas size
    const canvasContainer = document.querySelector('.canvas');
    canvasSize.addEventListener('input', () => {
        canvasSizeText.innerText = `${canvasSize.value} x ${canvasSize.value}`
        removeCellsFromCanvas(canvasContainer);
        createCanvas(canvasSize.value);
        // Get canvas cells
        const cells = document.querySelectorAll('.canvas-cell');
        setEventListeners(cells);

    });
});

