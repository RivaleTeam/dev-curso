import bycrypt from 'bcryptjs';



async function hashPassword(password) {
    const SALT_ROUNDS = 1;
    return await bycrypt.hash(password, SALT_ROUNDS);
}

async function comparePassword(password, hash) {
    return await bycrypt.compare(password, hash);
}

const password = {
    hashPassword,
    comparePassword
};

export default password;