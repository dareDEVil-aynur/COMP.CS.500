const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const app = express();

app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

(function () {
  function log(error = '') {
    console.error(`Oops! Something went wrong: ${error}`);
    return 0;
  }

  // Any code that uses this function should be inside this scope
  // or the function can be exported if needed globally
})();

module.exports = app;
