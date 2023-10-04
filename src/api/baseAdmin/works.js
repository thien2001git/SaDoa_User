import baseAdminAxios from '../../plugins/axios';
const baseRoute = 'works/';
const worksApis = {
    get: (params) => {
        return baseAdminAxios.get(baseRoute, {
            params: {
                ...params,
            },
        });
    },
    getById: (id) => {
        return baseAdminAxios.get(baseRoute + id, {});
    },
    getByAlbums: (albums) => {
        return baseAdminAxios.get(baseRoute + 'albums/' + albums);
    },
    getByRecommended: (id, params) => {
        return baseAdminAxios.get(baseRoute + 'recommended/' + id, { params });
    },
};

export default worksApis;
