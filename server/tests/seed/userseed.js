import jwt from 'jsonwebtoken';

const adminUserID = '1';
const dummyUserID = '3';

const dummyUser = {
  id: dummyUserID,
  username: 'davyjones',
  email: 'davyjones@gmail.com',
  password: 'qwertyuiop',
  token: jwt.sign({
    id: dummyUserID,
    username: 'davyjones'
  }, process.env.SECRET).toString()
};


export const adminUser = {
  id: adminUserID,
  username: 'adminuser',
  email: 'admin@localhost.com',
  password: 'qwertyuiop',
  token: jwt.sign({
    id: adminUserID,
    username: 'adminuser'
  }, process.env.SECRET).toString()
};

export default dummyUser;
