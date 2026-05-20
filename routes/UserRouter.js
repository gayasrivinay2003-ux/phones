const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');

const {
    registerUser,
    loginUser,
    AddPhone,
    getPhones,
    updatePhones,
    deletePhone,
    getPhonesById
} = require('../controllers/PhoneController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/phone/add', auth, AddPhone);
router.get('/', getPhones);
router.get('/phone/:id', getPhonesById);

router.put('/phone/update/:id', auth, updatePhones);

router.delete('/phone/:id', auth, deletePhone);


module.exports = router;