'use strict';


var dataStaff = new kendo.data.DataSource({
    transport: {
        type: 'json',
        read: function(options) {
            /*url: "http://www.birmingham.ac.uk/web_services/Staff.svc/",
            dataType: "json"*/

            expertsRepository.GetAllExperts().then(function (experts) {
                options.success(experts);
            }).catch(function (expertFetchError) {
                console.log(expertFetchError);
                options.error(expertFetchError);
            });
       }
    },
    schema: {
        parse: function (experts) {
            for (var i = 0; i < experts.data.length; i++) {
                experts.data[i].letter = experts.data[i].LastName.trim().toUpperCase().charAt(0);
            }
            return experts.data;
        }
    },
    filter: { field: "LastName", operator: "neq", value: "" },
    sort: {field: "LastName", dir: "asc"},
    group: { field: "letter" }
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

$("filterSearch").change(function () {
    alert('aaaa');
});

