/**
 * TODO: drawArrows uses recursion, but this time
 * with Promise, resolve() and setTimeout()
 *
 * @param {*} actors the actors (labels on vertical lines) to be drawn
 * @param {*} timeout time for setTimeout
 * @param {*} drawArrow the callback for drawing a single arrow
 * @param {*} i the index of an array (defaults to 0)
 */
async function drawArrows(actors, timeout, drawArrow, i = 0) {
  if (i >= actors.length * 2 - 2) {
    return null; // Base case to stop recursion
  }

  return new Promise((resolve) => {
    // Draw the arrow between actors
    drawArrow(
      i,
      i % 2 === 0 ? i / 2 : Math.floor(i / 2),
      Math.floor(i / 2) + 1
    );

    // Recursively call drawArrows after a timeout
    setTimeout(() => {
      // Continue drawing the next arrow with incremented index
      drawArrows(actors, timeout, drawArrow, i + 1).then(resolve);
    }, timeout);
  });
}

/**
 * DO NOT TOUCH THIS: drawArrowSync is the utility function for sync.test.js
 * The test just checks the accuracy of drawing, this is done synchronously,
 * the functionality is just partial, do not use as a model above.
 * @param {*} actors the actors for the sequence diagram
 * @param {*} drawArrow a callback to draw an arrow
 */
const drawArrowsSync = (actors, drawArrow) => {
  actors.forEach((actor, index) => drawArrow(index, -1, actors.length - 1));
};

/**
 * DO NOT TOUCH THIS:  Draws all, both actors and arrows, this function is for a browser use.
 * Makes UML seq diagram based on actors
 * @param {*} actors
 * @param {*} timeout
 */
const drawAll = (
  actors = ['mobile client', 'router', 'controller', 'model', 'mongoDB'],
  timeout = 200
) => {
  draw = getCanvasInBrowser();
  drawActors(actors);
  drawArrows(actors, timeout, drawArrow);
};

exports.drawArrows = drawArrows; //needed for testing, 'exports' causes "Uncaught ReferenceError: exports is not defined" that can be ignored
exports.drawArrowsSync = drawArrowsSync; //needed for testing, 'exports' causes "Uncaught ReferenceError: exports is not defined" that can be ignored
