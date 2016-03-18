'use strict';




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
                    url: "http://www.birmingham.ac.uk/web_services/Staff.svc/" + contentId,
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
            $('#expert').data(data[0].contentID)
            $('#ex-image').attr('src', data[0].Picture);
            $('#ex-title').html(data[0].JobTitles);
            $('#ex-name').text(data[0].FirstName + " " + data[0].LastName);
            $('#ex-page-title').text(data[0].FirstName + " " + data[0].LastName);
            $('#ex-department').text(data[0].Department);
            $('#ex-mail-text').text(data[0].Email)
            $('#ex-mail').attr("href", "mailto:" + data[0].Email);
            if (data[0].Telephone1.length > 4) {
                $('#ex-phone1-text').html(data[0].Telephone1);
                $('#ex-phone1').attr("href", "tel:" + data[0].Telephone1);
            }
            else {
                $('#ex-phone1-text').html("<span class='message-small'>Please contact the Press office</span>");
                //$('#ex-phone1').attr("href", "#press-page").buttonMarkup({ icon: "link" });
            }

            $('#ex-expertise').html(data[0].MediaExpertise);

            var experience = data[0].MediaExperience;
            experience.trim();

            if (experience.length > 16) { // && !experience=="<br>") {
                $('#ex-mediaExperience').html(experience);
                $('#mediaExperience').show()
            }
            else {
                $('#mediaExperience').hide();
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
   


