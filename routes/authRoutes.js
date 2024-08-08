const express = require('express')
const router = express.Router();

const { requireSignIn, isAdmin } = require('./../middleswares/authmiddlewares');
const { registerController, loginController } = require('../controllers/authController')

//routes
router.post('/register', registerController);
router.post('/login', loginController);

router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})



module.exports = router
