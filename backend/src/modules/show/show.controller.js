const Theater = require("../theater/Theater")
const Show = require("./Show")
const Seat = require("../../models/Seat")
const Screen = require("../../models/Screen")

const getShows = async (req, res) => {
    try {
        const { movieId, location, date } = req.query;

        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endTime = new Date(date);
        endTime.setHours(23, 59, 59, 999);

        const now = new Date();
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const startTime = startOfDay.getTime() === todayStart.getTime() ? now : startOfDay;

        const theaters = await Theater.find({ location: location }).select("_id");
        const shows = await Show.find({
            movie: movieId,
            theater: { $in: theaters.map(t => t._id) },
            startTime: { $gte: startTime, $lte: endTime }
        })
        
        res.json({ count: shows.length, shows });
    } catch (error) {
        res.status(500).json({ message: "Error fetching shows", error });
    }
};

const getSeatsForShow = async (req, res) => {
    try {
        const { showId } = req.query
        const show = await Show.findById(showId).populate('screen').lean()
        const seats = await Seat.find({ show: showId });

        res.json({ screenName: show.screen.name, seats: seats })
    } catch (error) {
        res.status(500).json({ message: "Error fetching seats", error })
    }

};

module.exports = { getShows, getSeatsForShow }