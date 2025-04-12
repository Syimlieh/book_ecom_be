// utils/pipeline.util.js

const { ORDER_DIRECTIONS } = require("../utils/constants");

// Default pagination values
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

const fetchFilterPipeline = (filters = {}) => {
  const page = parseInt(filters.page) || DEFAULT_PAGE;
  const rawLimit = parseInt(filters.limit);
  const limit = rawLimit > 0 ? Math.min(rawLimit, MAX_LIMIT) : DEFAULT_LIMIT;

  const orderBy = filters.order_by || "updatedAt";
  const orderDirection = filters.order_direction?.toUpperCase() === ORDER_DIRECTIONS.DESC
    ? -1
    : 1;

  const $sort = { [orderBy]: orderDirection };
  const $skip = (page - 1) * limit;
  const $limit = limit;

  const $project = {
    __v: 0,
  };

  const $facet = {
    records: [{ $skip }, { $limit }],
    pagination: [{ $count: "totalRecords" }]
  };

  return [
    { $project },
    { $sort },
    { $facet }
  ];
};

module.exports = { fetchFilterPipeline };
