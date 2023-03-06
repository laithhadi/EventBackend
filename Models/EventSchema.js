const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Event name is required"],
        max: [100, "Event name must not exceed more than 100 characters"]
    },
    description: {
        type: String,
        required: [true, "Event description is required"],
        max: [500, "Event description must not exceed more than 500 characters"]
    },
    location: {
        type: String,
        required: [true, "Event location is required"],
        max: [58, "Event location must not exceed more than 58 characters"]
    },
    venue: {
        type: String,
        required: [true, "Event venue is required"],
        max: [85, "Event venue must not exceed more than 85 characters"]
    },
    photoUrl: {
        type: String,
        max: [500, "Event photo URL must not exceed more than 500 characters"]
    },
    startDate: {
        type: Date,
        required: [true, "Event start date is required"]
        //TODO: validation?
        // min: function(passedDate) {
        //     let currentDate = new Date()
        //     return passedDate >= currentDate
        // }
    },
    endDate: {
        type: Date,
        required: [true, "Event end date is required"],
        //TODO: validation?
        // min: function(passedDate) {
        //     let currentDate = new Date()
        //     return passedDate >= currentDate
        // }
    },
    price: {
        type: Number
    },
    rating: {
        type: Number
    }
});

const eventModel = mongoose.model("event", eventSchema);

module.exports = eventModel;