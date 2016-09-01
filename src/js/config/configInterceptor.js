export default ($httpProvider) => {
   'ngInject';
    console.log($httpProvider);
    $httpProvider.interceptors.push("timestampInterceptor");
    // $httpProvider.interceptors.push("errorInterceptor");
    $httpProvider.interceptors.push("loadingInterceptor");
}
