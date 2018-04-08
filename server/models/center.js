module.exports = (sequelize, DataTypes) => {
  const Center = sequelize.define('Center', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    state: {
      allowNull: false,
      type: DataTypes.STRING
    },
    location: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    image: {
      defaultValue:
        'https://pieceloveandchocolate.com/product/plc-dairy-freevegan-chocoholics-delight-gift-basket',
      type: DataTypes.TEXT
    },
    capacity: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    equipments: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    availability: {
      allowNull: false,
      type: DataTypes.STRING
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  });
  Center.associate = models => {
    Center.belongsTo(models.User, {
      foreignKey: 'owner'
    });

    Center.hasMany(models.Event, {
      foreignKey: 'venue',
      as: 'events'
    });
  };
};
