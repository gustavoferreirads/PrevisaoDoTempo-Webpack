export default function($q, $location) {
   'ngInject';
    return {
        responseError: function(rejection) {
            if (rejection.status === 404) {
                $location.path("/error");
            }
            return $q.reject(rejection);
        }
    };
};
