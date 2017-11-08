export.getParamVal = function(str, name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = str.match(reg);
    if (r !== null) {
        return unescape(r[2]);
    }
    return '';
}