module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    date: {
      allowNull: false,
      type: DataTypes.DATE
    },
    duration: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  });
  Event.associate = models => {
    Event.belongsTo(models.Center, {
      foreignKey: 'venue',
      onDelete: 'CASCADE'
    });

    Event.belongsTo(models.User, {
      foreignKey: 'organizer',
      onDelete: 'CASCADE'
    });
  };
};
