module.exports = function(sequelize, DataTypes) {
    const Spot = sequelize.define('spots', {
        city: {
            type: DataTypes.STRING
        },
        first_cross_street :{
            type: DataTypes.STRING
        },
        second_cross_street: {
            type: DataTypes.STRING
        },
        latitude: {
            type: DataTypes.DECIMAL
        },
        longitude: {
            type: DataTypes.DECIMAL
        },
        description: {
            type: DataTypes.STRING
        },
        security_guards: {
            type: DataTypes.BOOLEAN
        }
    });
    return Spot;
}