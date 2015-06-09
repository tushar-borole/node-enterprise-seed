module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });


    return User;
};

/*{
        classMethods: {
            associate: function (models) {
                User.hasMany(models.Blog,{ foreignKey: 'user_id'});
            }
        },*/