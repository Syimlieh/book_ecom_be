const ORDER_DIRECTIONS = {
    DESC: "DESC",
    ASC: "ASC",
};

const COLLECTION = {
    BOOKS: "books",
    PROFILE: "profiles",
    ORDER: "orders",
}

const ROLES = {
    ADMIN: 'ADMIN',
    USER: 'USER',
}

const REGEX = {
    MOBILE: /^[0-9]{10}$/,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
};

const PAYMENT_METHOD = {
    UPI: "UPI",
    PAY_ON_DELIVERY: "PAY_ON_DELIVERY",
    CARD: "CARD"
};

const PURCHASED_STATUS = {
    PENDING: 'PENDING',
    PROCESSING: 'PROCESSING',
    SHIPED: 'SHIPED',
    DELIVERED: 'DELIVERED',
    CANCELLED: 'CANCELLED',
}

const AVAILABILITY_STATUS = {
    IN_STOCK: 'In stock',
    OUT_OF_STOCK: 'Out of stock',
}

module.exports = {
    ORDER_DIRECTIONS,
    COLLECTION,
    ROLES,
    REGEX,
    PAYMENT_METHOD,
    PURCHASED_STATUS,
    AVAILABILITY_STATUS,
}