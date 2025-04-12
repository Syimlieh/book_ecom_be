
const BookRoutes = require("./routes/book.routes");
const AuthRoutes = require("./routes/authentication.route");
const OrderRoutes = require("./routes/order.routes");

module.exports = (server) => {
    server.use("/api/v1/books", BookRoutes);

    server.use("/api/v1/auth", AuthRoutes);

    server.use("/api/v1/order", OrderRoutes);
};
