let queryDict = null;

const getUrlParams = () => {
    let url_params = {};

    location.search.substr(1).split("&").forEach(item => {
        url_params[item.split("=")[0]] = item.split("=")[1];
    });

    return url_params;
};

export const getUrlParam = (param_name) => {
    if (queryDict) {
        return queryDict[param_name];
    }

    queryDict = getUrlParams();
    
    return queryDict[param_name];
};