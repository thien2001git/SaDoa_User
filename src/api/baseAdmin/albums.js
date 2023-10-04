import baseAdminAxios from '../../plugins/axios';
const baseRoute = 'albums/';
const albumsApis = {
    getByTitle: (title) => {
        return baseAdminAxios.get(baseRoute + 'get-by-title/' + title);
    },
};

export default albumsApis;
