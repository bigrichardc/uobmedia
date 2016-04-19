'use strict';

function UrlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status != 404;
}


var dataContact = new kendo.data.DataSource({
    transport: {
        read: {
            url: "http://www.birmingham.ac.uk/web_services/Staff.svc/4298",
            dataType: "json"
        }
    },
    schema: {
        data: function (response) {
            return [response]; // twitter's response is { "results": [ /* results */ ] }
        }
    }
});

/*var data;
console.log("test");
dataContact.fetch(function () {
    var data = this.data();
    //$("#quickTest").text = data[0].FirstName;
    
});
*/


app.expert = kendo.observable({
    title: "Media Contact",
    onShow: function (e) {

        var contentId = e.view.params.contentId;

        dataContact = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "testdata/expert_list.json",
                    dataType: "json"
                }
            },
            schema: {
                data: function (response) {
                    return [response]; // twitter's response is { "results": [ /* results */ ] }
                }
            }
        });

        //console.log(contentId);

        dataContact.fetch(function () {
            var data = this.data();

            var i = 0;
            for (i = 0; i < data[0].length; i++) {
                if (data[0][i].ContentId == contentId) {
                    break;
                }
            }


            $('#expert').data(data[0][i].contentID)
            $('#ex-image').attr('src', data[0][i].Picture);
            $('#ex-title').html(data[0][i].JobTitles);
            $('#ex-name').text(data[0][i].FullNameAndTitle);
            $('#ex-page-title').text(data[0][i].FullNameAndTitle);
            $('#ex-department').text(data[0][i].Department);
            $('#ex-mail-text').text(data[0][i].Email)
            $('#ex-mail').attr("href", "mailto:" + data[0][i].Email);
            if (data[0][i].Telephone1.length > 4) {
                $('#ex-phone1-text').html(data[0][i].Telephone1);
                $('#ex-phone1').attr("href", "tel:" + data[0][i].Telephone1);
            }
            else {
                $('#ex-phone1-text').html("<span class='message-small'>Please contact the Press office</span>");
                //$('#ex-phone1').attr("href", "#press-page").buttonMarkup({ icon: "link" });
            }

            $('#ex-expertise').html(data[0][i].MediaExpertise);

            var experience = data[0][i].MediaExperience;
            experience.trim();

            if (experience.length > 16) { // && !experience=="<br>") {
                $('#ex-mediaExperience').html(experience);
                $('#mediaExperience').show()
            }
            else {
                $('#mediaExperience').hide();
            }

            var url = "http://www.birmingham.ac.uk" + data[0][i].ImageUrl

            if (!(navigator.connection.type === Connection.NONE) && url.length > 28 && UrlExists(url)) {
                $('#ex-image').attr('src', url);
            }
            else {
                $('#ex-image').attr('src', 'images/prof.png');
            }



            //console.log(data[0].FirstName);
            //console.log(data[0].LastName);
        })
    },
        error: function (e) {
            console.log(e);
        }
    }
);
   


