import baseAdminAxios from '../../plugins/axios';
const baseRoute = 'category/';
const categoryApis = {
    get: () => {
        return baseAdminAxios.get(baseRoute);
    },
};

export default categoryApis;
