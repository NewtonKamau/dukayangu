import bcryptjs from 'bcryptjs';

const users = [
  {
    name: "Test Tester",
    email: "test@tester.com",
    password: bcryptjs.hashSync("1234567",10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@doe.com",
    password: bcryptjs.hashSync("1234567",10),
   
  },
  {
    name: "Jane Doe",
    email: "jane@tester.com",
    password: bcryptjs.hashSync("1234567",10),
   
  },
];
export default users