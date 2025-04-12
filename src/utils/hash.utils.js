const bcrypt = require("bcrypt");

async function hashPassword(password) {
    const saltRounds = process.env.SALT_ROUNDS || 11;
    const hashedPassword = await bcrypt.hash(password, Number(saltRounds));
    return hashedPassword;
}

async function comparePassword(password, hashedPassword) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}

module.exports = {
    hashPassword,
    comparePassword,
};