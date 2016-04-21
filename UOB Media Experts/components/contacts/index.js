'use strict';

$(function () {

    fetchExpertList();
    console.log("did something");
    populateExpertList();

});


function fetchExpertList() {
    $.ajax({
        dataType: "json",
        url: 'testdata/expert_list.json',
        success: function (data) {
            //console.log("success");

            $('body').data('eList', data)
        }
    })
};

function populateExpertList() {
    //var eList = $('body').data('eList');

}





