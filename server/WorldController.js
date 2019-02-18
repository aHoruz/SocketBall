const p2 = require("p2");

let world = null;

const initWorld = () => {
    world = new p2.World({
        gravity: [0, 0],
    });
};

const createPlayerBody = () => {
    // Create an empty dynamic body
    const playerBody = new p2.Body({
        mass: 5,
        position: [10, 10],
    });

    // Add a circle shape to the body
    const circleShape = new p2.Circle({ radius: 1 });
    playerBody.addShape(circleShape);

    // ...and add the body to the world.
    // If we don't add it to the world, it won't be simulated.
    world.addBody(playerBody);

    return playerBody;
};

// To animate the bodies, we must step the world forward in time, using a fixed time step size.
// The World will run substeps and interpolate automatically for us, to get smooth animation.
const fixedTimeStep = 1 / 60; // seconds
const maxSubSteps = 10; // Max sub steps to catch up with the wall clock

const update = (deltaTime) => {
    world.step(fixedTimeStep, deltaTime, maxSubSteps);
};

module.exports = { initWorld, createPlayerBody, update };