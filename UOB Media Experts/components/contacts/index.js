'use strict';

var dataStaff = new kendo.data.DataSource({
    transport: {
        read: {
            url: "http://www.birmingham.ac.uk/web_services/Staff.svc/",
            dataType: "json"
        }
    },
    schema: {
        parse: function (data) {
            for (var i = 0; i < data.length; i++) {
                data[i].letter = data[i].LastName.trim().toUpperCase().charAt(0);
            }
            return data;
        }
    },
    filter: { field: "LastName", operator: "neq", value: "" },
    sort: {field: "LastName", dir: "asc"},
    group: {field: "letter"}
});


app.expertList = kendo.observable({
    title: "Media Experts",
    onShow: function () {

    },
    dataSource: dataStaff,

        error: function (e) {
            console.log(e);
        }

});