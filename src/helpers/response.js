export function responseGenerator(
    responseData,
    responseStatusCode,
    responseStatusMsg,
) {
    const responseJson = {
        data: responseData,
        code: responseStatusCode,
        message: responseStatusMsg,
        timestamp: new Date().toLocaleString(),
    }

    return responseJson
}