import jwt from 'jsonwebtoken';

const adminUserID = '1';
const dummyUserID = '5';
const secondDummyUserId = '6';
const nonExistentUserID = '100';

const dummyUser = {
  id: dummyUserID,
  username: 'davyjones',
  email: 'davyjones@gmail.com',
  phoneNumber: '08012345678',
  password: 'qwertyuiop',
  token: jwt.sign({
    id: dummyUserID,
    username: 'davyjones'
  }, process.env.SECRET).toString()
};

export const secondDummyUser = {
  id: secondDummyUserId,
  username: 'secondDummyUser',
  email: 'secondDummyUserEmail@gmail.com',
  password: 'qwertyuiop',
  phoneNumber: '08012345678',
  token: jwt.sign({
    id: secondDummyUserId,
    username: 'secondDummyUser'
  }, process.env.SECRET).toString()
};

export const nonExistentUser = {
  id: nonExistentUserID,
  username: 'secondDummyUser',
  email: 'secondDummyUserEmail@gmail.com',
  password: 'qwertyuiop',
  phoneNumber: '08012345678',
  token: jwt.sign({
    id: nonExistentUserID,
    username: 'secondDummyUser'
  }, process.env.SECRET).toString()
};

export const adminUser = {
  id: adminUserID,
  username: 'adminuser',
  email: 'admin@localhost.com',
  password: 'qwertyuiop',
  phoneNumber: '08012345678',
  token: jwt.sign({
    id: adminUserID,
    username: 'adminuser'
  }, process.env.SECRET).toString()
};

export default dummyUser;
