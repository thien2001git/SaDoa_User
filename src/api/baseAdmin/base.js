import baseAdminAxios from '../../plugins/axios';
const baseRoute = 'base/';
const authApis = {
    base: (data) => {
        return baseAdminAxios.post(baseRoute, data);
    },
};

export default authApis;
