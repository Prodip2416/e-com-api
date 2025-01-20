const responseMiddleware = (req, res, next) => {
  // Intercept the response object and overwrite res.json to format it consistently
  const originalJson = res.json;

  res.json = function (data) {
    console.log({data})
    // Check if data has a 'status' field, to distinguish between errors and normal responses
    if (data?.status === "error") {
      return originalJson.call(this, {
        status: data?.status || "error",
        message: data?.message || "Something went wrong",
        errors: data?.errors || [data?.message],
      });
    }

    // For successful responses (status: success)
    return originalJson.call(this, {
      status: data?.status || "success",
      message: data?.message || "Operation successful",
      data: data?.data,
    });
  };

  next();
};

module.exports = responseMiddleware;
