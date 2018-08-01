var app = app || {};

app.callApi = (function () {

    function get(uri) {
        return coreCall(uri, 'GET', null);
    }

    function post(uri, data) {
        return coreCall(uri, 'POST', data);
    }

    function put(uri, data) {
        return coreCall(uri, 'PUT', data);
    }

    function deletE(uri) {
        return coreCall(uri, 'DELETE', null);
    }

    function coreCall(uri, httpMethod, data) {
        return $.ajax({
            type: httpMethod,
            dataType: "json",
            url: uri,
            data: data ? JSON.stringify(data) : null,
            contentType: 'application/json; charset=utf-8'
        })
            .done(function (response) { })
            .fail(function (jqXHR, textStatus, errorThrown) { });
    }

    return {
        get: get,
        post: post,
        put: put,
        deletE: deletE,
    };

})();

app.uriHelper = (function () {
    var apiUri = function (controller, action, parameters) {
        return uriCore(true, controller, action, parameters);
    };
    function uriCore(isApi, controller, action, parameters) {

        if (typeof parameters == 'object' && null != parameters) {
            parameters = '?' + $.param(parameters);
        }

        if (typeof parameters == 'undefined') {
            parameters = '';
        }

        var appRoot = getAppRoot();

        return appRoot
            + (isApi ? 'api/' : '')
            + (controller ? controller + '/' : '')
            + (action ? action + '/' : '')
            + parameters || '';
    }

    function getAppRoot() {
        var appRoot = QueryString['Demo-Root'];

        if (appRoot && appRoot.slice(-1) != '/') {
            appRoot += '/';
        }
        else
            appRoot = '';

        return appRoot;
    }

    var QueryString = function () {
        // This function is anonymous, is executed immediately and 
        // the return value is assigned to QueryString!
        var cookie_string = {};
        var cookie = document.cookie;
        var vars = cookie.split(";");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            // If first entry with this name
            if (typeof cookie_string[pair[0]] === "undefined") {
                cookie_string[pair[0]] = decodeURIComponent(pair[1]);
                // If second entry with this name
            } else if (typeof cookie_string[pair[0]] === "string") {
                var arr = [cookie_string[pair[0]], decodeURIComponent(pair[1])];
                cookie_string[pair[0]] = arr;
                // If third or later entry with this name
            } else {
                cookie_string[pair[0]].push(decodeURIComponent(pair[1]));
            }
        }
        return cookie_string;
    }();

    return {
        apiUri: apiUri
    };
})();

app.project = function (projectId) {
    $.when(
       app.callApi.get(app.uriHelper.apiUri('products', 'product/' + projectId), true)
   )
   .then(
       successfullLoad, failedToLoad
   )

    function failedToLoad() {
        //alert('lo oved!!!')
    }

    function successfullLoad(product) {
        if (!product)
            alert('products is null');
        else {
            console.log(product);
            var html = document.getElementById("productTemplate").innerHTML;

            var mainDiv = document.createElement('div');
            $(mainDiv).addClass("row");
            $(mainDiv).append(html);

            $(mainDiv).find('div[propName="ID"] p a').text(product.ID);
            $(mainDiv).find('div[propName="Name"] p').text(product.Name);
            $(mainDiv).find('div[propName="Description"] p').text(product.Description);
            $(mainDiv).find('div[propName="Price"] p').text(product.Price);

            $("#results").html(mainDiv);

            $("#results").append("<a href='javascript:void(0)' onclick='app.allProgects();'>viewall products</a>");
        }
    }
};

app.allProgects = function () {
    $.when(
       app.callApi.get(app.uriHelper.apiUri('products', 'getallproducts'), true)
   )
   .then(
       successfullLoad, failedToLoad
   )

    function failedToLoad() {
        //alert('lo oved!!!')
    }

    function successfullLoad(products) {
        if (!products)
            alert('products is null');
        else {
            console.log(products);
            var html = document.getElementById("productTemplate").innerHTML;
            $("#results").empty();
            $.each(products, function (index, product) {
                var mainDiv = document.createElement('div');
                $(mainDiv).addClass("row");
                $(mainDiv).append(html);

                $(mainDiv).find('div[propName="ID"] p a').text(product.ID);
                $(mainDiv).find('div[propName="ID"] p a').on('click', function () { app.project(product.ID) });
                $(mainDiv).find('div[propName="Name"] p').text(product.Name);
                $(mainDiv).find('div[propName="Description"] p').text(product.Description);
                $(mainDiv).find('div[propName="Price"] p').text(product.Price);
                $("#results").append(mainDiv);
            });
        }
    }
}

$(document).ready(function () {
    app.allProgects();
});