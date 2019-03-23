const baseUrl = "http://localhost:8080/api",
    loginUrl = `${baseUrl}/auth/login`,
    userUrl = `${baseUrl}/auth/create`,
    dataUrl = `${baseUrl}/data`,
    logoutUrl = `${baseUrl}/auth/logout`,
    verifyUserUrl = `${baseUrl}/reset/verifyUser`,
    resetPasswordUrl = `${baseUrl}/reset/password`;

export {
    baseUrl, loginUrl, userUrl,
    dataUrl, logoutUrl, verifyUserUrl, resetPasswordUrl
};
