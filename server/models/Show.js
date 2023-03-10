const { db, DataTypes } = require('../config/db')

const Show = db.define("shows", {
    title: DataTypes.STRING,
    genre: DataTypes.ENUM("Comedy", "Drama", "Horror", "Sitcom"),
    rating: DataTypes.INTEGER,
    status: DataTypes.STRING,
});

//exports
module.exports = {
    Show
}
