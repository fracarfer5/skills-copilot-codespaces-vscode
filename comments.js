// Create web server
const express = require('express');
const app = express();

// Use static files
app.use(express.static('public'));

// Use body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Use comments
const comments = require('./comments');
app.use('/comments', comments);

// Listen on port 3000
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
```

## 5. Create a comment
- Create a new file named `create.js` in the `comments` directory.
- Create a middleware that adds a new comment.
- The new comment should be read from the request body and added to the comments array.
- The new comment should have an `id` property that is unique and a `timestamp` property that is the current time.
- The middleware should respond with the new comment.

```javascript
// Path: comments/create.js
const express = require('express');
const router = express.Router();

const comments = require('../comments.json');

router.post('/', (req, res) => {
  const comment = {
    id: Date.now(),
    timestamp: new Date(),
    ...req.body
  };

  comments.push(comment);

  res.json(comment);
});

module.exports = router;
```

## 6. Read all comments
- Create a new file named `index.js` in the `comments` directory.
- Create a middleware that reads all comments.
- The middleware should respond with all comments.

```javascript
// Path: comments/index.js
const express = require('express');
const router = express.Router();

const comments = require('../comments.json');

router.get('/', (req, res) => {
  res.json(comments);
});

module.exports = router;
```

## 7. Update a comment
- Create a new file named `update.js` in the `comments` directory.
- Create a middleware that updates a comment.
- The comment to update should be read from the request body.
- The middleware should respond with the updated comment.

```javascript
// Path: comments/update.js
const express = require('express');
const router = express.Router();

const comments = require('../comments.json');

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = comments.findIndex(comment => comment.id === id);

  if (index === -1) {
    return res.status(