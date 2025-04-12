const { fetchFilterPipeline } = require('./general.pipeline');

const getAllBooksPipeline = (filters) => {
    const { title = "", category = "", author = "" } = filters;

    const $match = {};
    if (category) {
        $match.category = category;
    }

    if (author) {
        $match.author = author;
    }

    if (title) {
        const regExp = new RegExp(`^${title}`, "i");
        $match.title = regExp;
    }

    const filterpipeline = fetchFilterPipeline(filters);
    return [
        { $match },
        ...filterpipeline
    ]
}

module.exports = {
    getAllBooksPipeline
}