const UserModel = require('../Models/UserSchema');

exports.register = async function (req, res) {
    try {
        const request = req.body;

        const user = await UserModel.findOne({
            username: request.username
        }).exec();

        if (user) {
            return res.status(400).send({
                message: "Error! Username already taken!"
            });
        }

        const userInstance = new UserModel({
            username: request.username,
            password: request.password,
        });

        await userInstance.validate();
        await userInstance.save();

        return res.status(200).send({
            message: "Registered successfully!"
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(error => error.message);
            return res.status(400).send({
                errors
            });
        } else {
            //TODO: other error handling
            return res.status(500).send({
                error: 'Something went wrong'
            });
        }
    }
}

exports.login = async function (req, res) {
    try {
        const request = req.body;

        const user = await UserModel.findOne({
            username: request.username,
            password: request.password
        }).exec();

        if (!user) {
            return res.status(400).send({
                message: "Error! Invalid username or password!"
            });
        }

        if (user.username === process.env.ADMIN_USERNAME
            && user.password === process.env.ADMIN_PASSWORD
        ) {
            return res.status(200).send({
                message: "Logged in successfully!",
                authorization: process.env.ADMIN_AUTH_SECRET
            });
        }

        return res.status(200).send({
            message: "Logged in successfully!",
            authorization: process.env.AUTH_SECRET
        });
    } catch (err) {
        //TODO: other error handling
        return res.status(500).send({
            error: 'Something went wrong'
        });
    }
}