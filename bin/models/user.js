module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      number: {
        type: DataTypes.STRING,
        allowNull: false
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      classMethods: {}
    }
  );
  return User;
};
