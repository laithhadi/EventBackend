const { isAfter, parse } = require('date-fns');

const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        auto: true
    },
    name: {
        type: String,
        required: [true, "Event name is required"],
        maxLength: [100, "Event name must not exceed more than 100 characters"]
    },
    description: {
        type: String,
        required: [true, "Event description is required"],
        maxLength: [500, "Event description must not exceed more than 500 characters"]
    },
    location: {
        type: String,
        required: [true, "Event location is required"],
        maxLength: [58, "Event location must not exceed more than 58 characters"]
    },
    venue: {
        type: String,
        required: [true, "Event venue is required"],
        maxLength: [85, "Event venue must not exceed more than 85 characters"]
    },
    photoUrl: {
        type: String,
        maxLength: [500, "Event photo URL must not exceed more than 500 characters"]
    },
    startDate: {
        type: Date,
        required: [true, 'Event start date is required'],
        validate: {
            validator: function (value) {
                return isAfter(value, new Date());
            },
            message: 'Event start date must be in the future',
        },
        set: function (value) {
            return parse(value, 'dd/MM/yyyy', new Date());
        },
    },
    endDate: {
        type: Date,
        required: [true, 'Event end date is required'],
        validate: {
            validator: function (value) {
                return isAfter(value, this.startDate);
            },
            message: 'Event end date must be after the start date',
        },
        set: function (value) {
            return parse(value, 'dd/MM/yyyy', new Date());
        },
    },
    price: {
        type: Number
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    }
});

const eventModel = mongoose.model("event", eventSchema, "Events");

module.exports = eventModel;