module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    }
  });
  Rating.associate = (models) => {
    models.Rating.belongsTo(models.Center, {
      foreignKey: 'centerId',
      onDelete: 'cascade'
    });
    models.Rating.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };
  return Rating;
};
