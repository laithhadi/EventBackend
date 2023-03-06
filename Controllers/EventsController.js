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
        const event = await EventModel.findById(req.params.id, req.body);
        return res.send(event);
    } catch (error) {
        //TODO: error handling
        res.status(500).send({ error: 'Something went wrong' });
    }
}

//TODO: error handling
exports.create = async function (req, res) {
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

    try {
        eventInstance.validate();
        eventInstance.save();
    } catch (err) {
        res.status(500).send({ error: err });
    }

    res.send(eventInstance);
}

exports.update = async function (req, res, next) {
    if (!req.body.name) {
        return (next(createError(400, "Name is required.")))
    }

    try {
        const bookId = req.params.id;
        const book = await BookModel.findByIdAndUpdate(bookId, req.body, { new: true });
        if (!book) {
            return next(createError(404, 'Book not found'));
        }
        console.log('Book updated:', book);
        res.send(book);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Something went wrong' });
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
        const event = await EventModel.findByIdAndDelete(req.params.id, req.body);
        return res.send(event);
    } catch (error) {
        //TODO: error handling
        res.status(500).send({ error: 'Something went wrong' });
    }
}