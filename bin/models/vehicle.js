module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define(
    'Vehicle',
    {
      number: {
        type: DataTypes.STRING,
        allowNull: false
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      isParked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      classMethods: {}
    }
  );
  return Vehicle;
};
