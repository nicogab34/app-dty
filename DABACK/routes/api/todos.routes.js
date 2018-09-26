var express = require('express')

var router = express.Router()

var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../../controllers/profile');
var ctrlAuth = require('../../controllers/authentication');

// Getting the Todo Controller that we just created

var UserController = require('../../controllers/users.controller');

var ToDoController = require('../../controllers/todos.controller');

var MessageController = require('../../controllers/messages.controller');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);

router.post('/login', ctrlAuth.login);
// Map each API to the Controller FUnctions

router.get('/users', UserController.getUsers)

router.put('/users', UserController.updateUser)

router.delete('/users/:id',UserController.removeUser)

router.get('/messages',MessageController.getMessages)

router.post('/messages', MessageController.createMessage)

router.delete('/messages/:id',MessageController.removeMessage)

router.get('/', ToDoController.getTodos)

router.post('/', ToDoController.createTodo)

router.put('/', ToDoController.updateTodo)

router.delete('/:id',ToDoController.removeTodo)
// Export the Router

module.exports = router;