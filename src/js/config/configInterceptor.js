export default ($httpProvider) => {
    console.log($httpProvider);
    $httpProvider.interceptors.push("timestampInterceptor");
    $httpProvider.interceptors.push("errorInterceptor");
    //$httpProvider.interceptors.push("loadingInterceptor");
}
