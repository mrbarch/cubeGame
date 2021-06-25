function createFood(size) {
    const eat = document.createElement("div")

    eat.classList.add("food")
    const x = Math.round(Math.random() * (window.innerWidth - 10))
    const y = Math.round(Math.random() * (window.innerHeight - 10))

    eat.style.top = y + 'px';
    eat.style.left = x + 'px';
    eat.style.width = size + 'px'
    eat.style.height = size + 'px'

    eat.dataset.x = `${x}`
    eat.dataset.y = `${y}`

    return eat
}

function createCube(name, cubeSize) {
    let cube = document.createElement("div")
    cube.classList.add("cube", `cube__${name}`)
    cube.style.width = cubeSize + 'px'
    cube.style.height = cubeSize + 'px'
    cube.dataset.x = '0'
    cube.dataset.y = '0'
    cube.dataset.direction = ''

    return cube
}

function directionCube(cube, left, right, up, down) {
    document.addEventListener('keydown', function (event) {
        if (event.key === right) {
            cube.dataset.direction = 'right'
        } else if (event.key === down) {
            cube.dataset.direction = 'down'
        } else if (event.key === left) {
            cube.dataset.direction = 'left'
        } else if (event.key === up) {
            cube.dataset.direction = 'up'
        }
    })
}

function eatFood(cube, cubeSize, foodSize, counter) {
    const food = document.querySelector('.food')
    const foodX = Number(food.dataset.x)
    const foodY = Number(food.dataset.y)
    const cubeX = Number(cube.dataset.x)
    const cubeY = Number(cube.dataset.y)

    if (food && (cubeX + cubeSize) >= foodX && (cubeY + cubeSize) >= foodY && foodX >= cubeX && foodY >= cubeY) {
         counter.innerHTML = String(Number(counter.innerHTML) + 1)
        if (Number(counter.innerHTML) === 100) {
            alert('Вы победили в этом состязании!')
            location.reload()
        }
        food.remove()
        const game = document.querySelector('.game')
        game.appendChild(createFood(foodSize))
    }
}

function moveCube(cube, step, cubeSize) {
    if (cube.dataset.direction === 'right') {
        cube.dataset.x = String(Number(cube.dataset.x) + step)
    } else if (cube.dataset.direction === 'left') {
        cube.dataset.x = String(Number(cube.dataset.x) - step)
    } else if (cube.dataset.direction === 'up') {
        cube.dataset.y = String(Number(cube.dataset.y) - step)
    } else if (cube.dataset.direction === 'down') {
        cube.dataset.y = String(Number(cube.dataset.y) + step)
    }
    if (cube.dataset.x < 0) {
        cube.dataset.x = String(window.innerWidth - cubeSize)
    }
    if (cube.dataset.y < 0) {
        cube.dataset.y = String(window.innerHeight - cubeSize)

    }
    if (String(Number(cube.dataset.x) + cubeSize) > window.innerWidth) {
        cube.dataset.x = '0'
    }
    if (String(Number(cube.dataset.y) + cubeSize) > window.innerHeight) {
        cube.dataset.y = '0'
    }
    cube.style.top = cube.dataset.y + 'px';
    cube.style.left = cube.dataset.x + 'px';
}

function initializeInterval(cube, step, cubeSize, foodSize, counter, intervalHandler) {
    if (intervalHandler) {
        clearInterval(intervalHandler)
    }
    intervalHandler = setInterval(() => {
        moveCube(cube, step, cubeSize)
        eatFood(cube, cubeSize, foodSize, counter)
    }, 20)
}

function createCounter(name) {
    let counter = document.createElement("div")
    counter.classList.add("counter", `counter__${name}`)
    counter.innerHTML = '0'

    return counter
}
function initializeGame(cubeSize, foodSize, step) {
    const game = document.querySelector('.game')
    const redCube = createCube('red', cubeSize)
    const greenCube = createCube('green', cubeSize)
    const redCounter = createCounter('red')
    const greenCounter = createCounter('green')
    const food = createFood(foodSize)

    game.appendChild(food)
    game.appendChild(redCube)
    game.appendChild(greenCube)
    game.appendChild(redCounter)
    game.appendChild(greenCounter)

    directionCube(redCube, 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown')
    directionCube(greenCube, 'a', 'd', 'w', 's')
    initializeInterval(redCube, step, cubeSize, foodSize, redCounter)
    initializeInterval(greenCube, step, cubeSize, foodSize, greenCounter)
}

initializeGame(50, 10, 10, 1)


// function incrementPoint() {
//     addPoint += 1
//     document.querySelector('.counter').innerHTML = addPoint;
//     console.log(addPoint)
// }
//

//
// function moveCube() {
//
//     if (x < 0) {
//         x = window.innerWidth - cubeSize
//     }
//     if (y < 0) {
//         y = window.innerHeight - cubeSize
//     }
//     if (x > window.innerWidth) {
//         x = 0
//     }
//     if (y > window.innerHeight) {
//         y = 0
//     }
//     block.style.top = y + 'px';
//     block.style.left = x + 'px';
// }

// start()
//
