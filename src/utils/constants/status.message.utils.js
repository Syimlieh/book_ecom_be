const statusMessage = {
    200: "OK",
    201: "Resource created successfully",
    204: "Successfully logged out",
    400: "There are some missing or invalid values in your request.",
    401: "Your token has expired or you are unauthorized.",
    403: "You don't have permission to access this resource.",
    409: "Resource already exists.",
    404: "Resource not found.",
    422: "Unprocessable entity.",
    500: "Server Error.",
    502: "Database connection failed.",
};

module.exports = {
    statusMessage
}
