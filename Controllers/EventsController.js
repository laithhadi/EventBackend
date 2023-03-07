const EventModel = require('../Models/EventSchema');

exports.index = async function (req, res) {
    try {
        const events = await EventModel.find({});
        res.send(events);
    } catch (error) {
        //TODO: error handling
        res.status(500).send({ error: 'Something went wrong' });
    }
}

exports.show = async function (req, res) {
    try {
        const event = await EventModel.findById(req.params.id);
        return res.send(event);
    } catch (error) {
        //TODO: error handling
        res.status(500).send({ error: 'Something went wrong' });
    }
}

exports.create = async function (req, res) {
    try {
        const request = req.body;

        const eventInstance = new EventModel({
            name: request.name,
            description: request.description,
            location: request.location,
            venue: request.venue,
            photoUrl: request.photoUrl,
            startDate: request.startDate,
            endDate: request.endDate,
            price: request.price,
            rating: request.rating
        });

        await eventInstance.validate();
        const updatedEvent = await eventInstance.save();
        res.send(updatedEvent);
    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(error => error.message);
            return res.status(400).send({ errors });
        } else {
            //TODO: other error handling
            res.status(500).send({ error: 'Something went wrong' });
        }
    }
}

exports.update = async function (req, res) {
    try {
        const event = await EventModel.findByIdAndUpdate(
            req.params.id, req.body, { runValidators: true, new: true }
        );
        res.send(event);
    } catch (error) {
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(error => error.message);
            return res.status(400).send({ errors });
        } else {
            //TODO: other error handling
            res.status(500).send({ error: 'Something went wrong' });
        }
    }
}

exports.deleteAll = async function (req, res) {
    try {
        const event = await EventModel.deleteMany();
        return res.send(event);
    } catch (error) {
        //TODO: error handling
        res.status(500).send({ error: 'Something went wrong' });
    }
}

exports.delete = async function (req, res) {
    try {
        const event = await EventModel.findByIdAndDelete(req.params.id);
        return res.send(event);
    } catch (error) {
        //TODO: error handling
        res.status(500).send({ error: 'Something went wrong' });
    }
}