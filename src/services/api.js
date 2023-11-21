export function createApiService() {
  const service = {};

  service.defaultErrorMessage = 'Error';
  service.defaultErrorCode = 0;

  service.get = async (input) => {
    try {
      const response = await fetch(input);

      service.checkHttpError(response);

      const json = await response.json();

      return {
        data: json,
        error: null,
      };
    } catch (err) {
      return service.createErrorResponse(err);
    }
  };

  service.createErrorResponse = (err) => {
    return {
      data: null,
      error: service.parseError(err),
    };
  };

  service.parseError = (err) => {
    err = err || {};

    if (err.name === 'AbortError') {
      return {
        code: service.defaultErrorCode,
        message: service.defaultErrorMessage,
      };
    }

    return {
      code: asNumber(err.code) || service.defaultErrorCode,
      message: asString(err.message) || service.defaultErrorMessage,
    };
  };

  service.checkHttpError = (response) => {
    response = response || {};

    if (!response.ok) {
      throw {
        message: service.defaultErrorMessage,
        code: asNumber(response.status) || service.defaultErrorCode,
      };
    }
  };

  return service;
}

function asString(value) {
  if (typeof value === 'string') {
    return value;
  }

  return '';
}

function asNumber(value) {
  if (typeof value === 'number') {
    return value || 0;
  }

  return 0;
}
