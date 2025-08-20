async function getRegisterController(req, res) {
 res.render('register');
}

async function postRegisterController() {
    const { username, email, password } = req.body;
}

module.exports = {
    getRegisterController,
    postRegisterController
}
