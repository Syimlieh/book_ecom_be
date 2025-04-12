const Profile = require("../models/profile.models");
const { hashPassword } = require("./hash.utils");
const logger = require("../log/logger");
const { ROLES } = require("./constants");

// Only for development purpose and not for Production
// For testing Create Book
const seedAdminIfNotExists = async () => {
    const adminExists = await Profile.findOne({ role: ROLES.ADMIN });
    if (adminExists) {
        logger.info("Admin profile already exists. Skipping admin seed.");
        return;
    }

    const adminPayload = {
        fullName: process.env.ADMIN_NAME || "Admin User",
        email: process.env.ADMIN_EMAIL || "admin@booknest.com",
        phone: process.env.ADMIN_MOBILE || "9999999999",
        password: await hashPassword(process.env.ADMIN_PASSWORD || "Admin@123"),
        role: ROLES.ADMIN,
    };

    await Profile.create(adminPayload);
    logger.info("Admin profile created successfully.");
};

module.exports = {
    seedAdminIfNotExists,
};
