module.exports = (sequelize, Sequelize) => {
    const Waether = sequelize.define("weather", {
        date: {
            type: Sequelize.DATE,
            default:Date.now
        },
        MaxTemp: {
            type: Sequelize.FLOAT,
        },
        MinTemp: {
            type: Sequelize.FLOAT,
        },
        Rainfall: {
            type: Sequelize.FLOAT,
        },
        Evaporation: {
            type: Sequelize.FLOAT,
        },
        Sunshine: {
            type: Sequelize.FLOAT,
        },
        WindGustDir: {
            type: Sequelize.STRING,
        },
        WindGustSpeed: {
            type: Sequelize.FLOAT,
        },
        WindDir9am: {
            type: Sequelize.STRING,
        },
        WindDir3pm: {
            type: Sequelize.STRING,
        },
        WindSpeed9am: {
            type: Sequelize.FLOAT,
        }, 
        WindSpeed3pm: {
            type: Sequelize.FLOAT,
        }, 
        Humidity9am: {
            type: Sequelize.FLOAT,
        }, 
        Humidity3pm: {
            type: Sequelize.FLOAT,
        }, 
        Pressure9am: {
            type: Sequelize.FLOAT,
        }, 
        Pressure3pm: {
            type: Sequelize.FLOAT,
        }, 
        Cloud9am: {
            type: Sequelize.FLOAT,
        }, 
        Cloud3pm: {
            type: Sequelize.FLOAT,
        }, 
        Temp9am: {
            type: Sequelize.FLOAT,
        }, 
        Temp3pm: {
            type: Sequelize.STRING,
        }, 
        RainToday: {
            type: Sequelize.FLOAT,
        }, 
        RISK_MM: {
            type: Sequelize.FLOAT,
        }, 
        RainTomorrow: {
            type: Sequelize.STRING,
        },

    }, { timestamps: true, versionKey: false },

    );

    return Waether;
};

