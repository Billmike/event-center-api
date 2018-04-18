module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    phoneNumber: {
      type: DataTypes.INTEGER
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    }
  });
  User.associate = (models) => {
    User.hasMany(models.Center, {
      foreignKey: 'owner',
      as: 'centers'
    });

    User.hasMany(models.Event, {
      foreignKey: 'organizer',
      as: 'events'
    });
  };

  return User;
};
