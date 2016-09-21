

var Channel = function(item) {
  this.name = item.name;
  this.video_url = item.video_url;
  this.channel_photo = item.channel_photo;
  this.badge_class = item.badge_class;
  this.channel_status = item.channel_status;
};

var channels = [];

var channelsList = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "sodapoppin", "moonducktv"];

for (var i=0; i < channelsList.length; i++) {
  // console.log(i);
  var channelUrl = 'https://api.twitch.tv/kraken/channels/' + channelsList[i];
  $.ajax({
   type: 'GET',
   url: channelUrl,
   dataType: 'json',
   headers: {
     'Client-ID': '4w6yeo2vveef3gnql5k2qeezykzzt3x'
   },
   success: function(data) {
     console.log(data);
     var channelInfo = {};
     channelInfo.name = data.display_name;
     channelInfo.video_url = data.url;
     channelInfo.channel_photo = data.logo;
     if (data.mature) {
       channelInfo.badge_class = "badge-success";
       channelInfo.channel_status = "On";
     } else {
       channelInfo.badge_class = "badge-danger";
       channelInfo.channel_status = "Off";
     }
     channels.push(new Channel(channelInfo));
     var addItem = '<div class="col-xs-12 channel-list ' +channelInfo.name.toLowerCase() + '"><figure class="col-xs-2"><img src="' + channelInfo.channel_photo + '" alt="channel photo" class="img-circle channel-photo center-block">'
     + '</figure><a href="' + channelInfo.video_url + '" target="_blank" class="col-xs-8 text-center vertical-center-text">'+ channelInfo.name + '</a>'

     + '<div class="col-xs-2 vertical-center-text"><span class="badge ' + channelInfo.badge_class + '">' + channelInfo.channel_status + '</span></div></div>';
     $("#all").append(addItem);
    //  不用append两遍啊少年，直接append给两个channel就好了

     if (data.mature) {
       var addItem = '<div class="col-xs-12 channel-list ' +channelInfo.name.toLowerCase() + '"><figure class="col-xs-2"><img src="' + channelInfo.channel_photo + '" alt="channel photo" class="img-circle channel-photo center-block">'
       + '</figure><a href="' + channelInfo.video_url + '" target="_blank" class="col-xs-8 text-center vertical-center-text">'+ channelInfo.name + '</a>'

       + '<div class="col-xs-2 vertical-center-text"><span class="badge ' + channelInfo.badge_class + '">' + channelInfo.channel_status + '</span></div></div>';
       $("#online").append(addItem);
     } else {
       var addItem = '<div class="col-xs-12 channel-list ' +channelInfo.name.toLowerCase() + '"><figure class="col-xs-2"><img src="' + channelInfo.channel_photo + '" alt="channel photo" class="img-circle channel-photo center-block">'
       + '</figure><a href="' + channelInfo.video_url + '" target="_blank" class="col-xs-8 text-center vertical-center-text">'+ channelInfo.name + '</a>'
       + '<div class="col-xs-2 vertical-center-text"><span class="badge ' + channelInfo.badge_class + '">' + channelInfo.channel_status + '</span></div></div>';
       $("#offline").append(addItem);
     }
   }
  });
}

// TODO: filter function
var filter = function() {
  var filterText = $("#search-bar").val().toLowerCase();
  // console.log("Hi");
  console.log(channels);
  for (var i=0; i < channels.length; i++) {
    channels[i].display = "show";
  }

  for (var i=0; i < channels.length; i++) {
    if (channels[i].name.toLowerCase().indexOf(filterText) === -1) {
      channels[i].display = "hidden";
      var item = document.getElementsByClassName(channels[i].name.toLowerCase());
      // var className =
      var item2 = $(channels[i].name.toLowerCase());
      console.log(item);
      console.log(item2);
      // item.addClass(channels[i].display);
    }
  }

  //
  // var kids = $("#all").children();
  // console.log(kids);
  // var filterText = $("#search-bar").val().toLowerCase();
  // console.log(filterText);
  //
  // if (item.title.toLowerCase().indexOf(filterWords) > -1) {

// }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
