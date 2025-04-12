const { statusMessage } = require("../constants/status.message.utils");
const logger = require("../../log/logger");

const formatResponse = (res, payload = {}, fallbackStatus = 200) => {
  const isDev = process.env.NODE_ENV !== "production";

  const status = payload?.statusCode || fallbackStatus;
  const isError = status >= 400;

  const parsedData = payload?.data ?? payload;
  const defaultMessage = statusMessage?.[status] ?? "Unknown status";

  const safeMessage =
    typeof payload === "string"
      ? payload
      : payload?.message || payload?.error || defaultMessage;

  const message =
    isError && isDev
      ? payload?.details?.message || safeMessage
      : safeMessage;

  const responseBody = {
    status,
    error: isError,
    count: 0,
    issues: [],
    data: {},
    message,
    timestamp: new Date().toISOString(),
    traceId: res.req?.correlationId || null,
  };

  if (!isError) {
    if (
      Array.isArray(parsedData) &&
      parsedData.length === 1 &&
      parsedData[0].records &&
      parsedData[0].pagination
    ) {
      responseBody.data = parsedData[0];
      responseBody.count = parsedData[0].records?.length ?? 0;
    } else if (Array.isArray(parsedData)) {
      responseBody.data = parsedData;
      responseBody.count = parsedData.length;
    } else {
      responseBody.data = parsedData ?? {};
      responseBody.count = parsedData ? 1 : 0;
    }

    logger.info(
      `API: ${res.req?.path} | STATUS: ${status} | COUNT: ${responseBody.count}`
    );
  } else {
    responseBody.issues = {
      error: safeMessage,
    };

    logger.error(
      `API: ${res.req?.path} | STATUS: ${status} | REASON: ${message}`
    );
  }

  return res.status(status).json(responseBody);
};

const roundToTwo = (num) => Math.round(num * 100) / 100;

module.exports = {
  formatResponse,
  roundToTwo
};
