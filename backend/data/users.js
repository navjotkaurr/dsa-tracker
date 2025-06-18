import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'John Doe',
        email: 'john@email.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: false,
    },
   
];

export default users;