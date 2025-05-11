const Movie = require('./Movie')
const fs = require('fs');
const csv = require('csv-parser');
const Papa = require('papaparse');


const uploadMovies = async (req, res) => {
    try {
        const path = req.file.path;

        const csvString = fs.readFileSync(path, 'utf8');
        const csvData = Papa.parse(csvString, {
            header: true,
            skipEmptyLines: true
        });

        fields = csvData.meta.fields
        const requiredFields = ['title', 'genre', 'actors', 'director', 'releaseDate', 'duration', 'language']

        const missingFields = requiredFields.filter(val => !fields.includes(val))
        if (missingFields.length) {
            res.status(400).json({ message: "Fields missing in sheet", missingFields: missingFields })
        }

        csvData.data.forEach(row => {
            row.title = row.title.trim()
            row.director = row.director.trim()
            row.genre = row.genre.split(',').map(x => (x.trim()))
            row.actors = row.actors.split(',').map(x => (x.trim()))
            row.language = row.language.split(',').map(x => (x.trim()))
            row.releaseDate = new Date(row.releaseDate)
            row.duration = parseInt(row.duration, 10)
        })
        const records = await Movie.insertMany(csvData.data)

        fs.unlinkSync(path);

        res.json({ count: records.length, data: records })
    } catch (error) {
        res.status(500).json({ message: "Error uploading file", error });
    }
};

module.exports = { uploadMovies }