export default function() { //Deve ser uma factory pois factory permite configuração antes mesmo de rodar a aplicação angular
    return {
        request: function(config) {
            var url = config.url;
            if (url.indexOf('view') > -1) return config;
            var timestamp = new Date().getTime();
            config.url = url + "?timestamp=" + timestamp;
            return config;
        }
    };
};
