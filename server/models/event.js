module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    image: {
      defaultValue: 'https://pieceloveandchocolate.com/product/plc-dairy-freevegan-chocoholics-delight-gift-basket',
      type: DataTypes.TEXT
    },
    date: {
      allowNull: false,
      type: DataTypes.DATE
    },
    duration: {
      allowNull: false,
      type: DataTypes.STRING
    },
    startTime: {
      type: DataTypes.TIME
    },
    endTime: {
      type: DataTypes.TIME
    }
  });
  Event.associate = (models) => {
    Event.belongsTo(models.Center, {
      foreignKey: 'venue',
      onDelete: 'CASCADE'
    });

    Event.belongsTo(models.User, {
      foreignKey: 'organizer',
      onDelete: 'CASCADE'
    });
  };
  return Event;
};
