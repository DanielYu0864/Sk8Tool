module.exports = (sequelize, DataTypes) => {
    const Spot = sequelize.define('spots', {
        city: {
            type: DataTypes.STRING
        },
        latitude: {
            type: DataTypes.DECIMAL
        },
        longitude: {
            type: DataTypes.DECIMAL
        },
        cross_street: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        security_guards: {
            type: DataTypes.BOOLEAN
        }
    });
    return Spot;
};