import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db';

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_name: {
    type: DataTypes.STRING,
  },
  user_email: {
    type: DataTypes.STRING
  },
  user_password: {
    type: DataTypes.STRING
  },
  user_img: {
    type: DataTypes.STRING
  },
})

User.prototype.toJSON = function () {
  const { user_password, ...user } = this.dataValues;
  return user;
}

export default User;