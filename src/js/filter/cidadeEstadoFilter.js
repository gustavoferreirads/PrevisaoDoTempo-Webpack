module.exports = function() {
    return function(input, estado) {
        if (input && estado)
            return input + " - " + estado;
        return input;
    };
};
