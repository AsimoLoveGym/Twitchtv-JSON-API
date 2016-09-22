

var Channel = function(item) {
  this.channel_exist = item.channel_exist;
  this.channel = item.channel;
  this.name = item.name;
  this.video_url = item.video_url;
  this.channel_photo = item.channel_photo;
  this.game = item.game;
  this.stream_status = item.stream_status;
  this.views = item.views;
  this.followers = item.followers;
  this.badge_class = item.badge_class;
  this.channel_status = item.channel_status;
};

var channels_detail = [];
var channels_status = [];
var channels_complete = [];

var img_placeholder = "https://www.acspri.org.au/sites/acspri.org.au/files/profile-placeholder.png";
var url_placeholder = "https://www.twitch.tv/";
var status_placeholder = "Closed";

var channelsList = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "sodapoppin", "moonducktv","forTest","imaqtpie","etozhemad","amazhs","mushisgosu"];

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
    // console.log(channelsList[i]);
    // Why here can't access to outer function parameters.
    // It's different here, ajax is JSON format,
    //  console.log(data);
     var channelInfo = {};
     channelInfo.channel_exist = true;
     channelInfo.name = data.display_name;
     channelInfo.video_url = data.url;
     channelInfo.channel_photo = data.logo;
     channelInfo.game = data.game;
     channelInfo.stream_status = data.status;
     channelInfo.views = data.views;
     channelInfo.followers = data.followers;

     channelInfo.channel = data._links.self;

     if (data.mature) {
       channelInfo.badge_class = "badge-success";
       channelInfo.channel_status = "On";
     } else {
       channelInfo.badge_class = "badge-danger";
       channelInfo.channel_status = "Off";
     }
     channels_detail.push(new Channel(channelInfo));


    //  var addItem = '<div class="col-xs-12 channel-list ' +channelInfo.name.toLowerCase() + '"><figure class="col-xs-2"><img src="' + channelInfo.channel_photo + '" alt="channel photo" class="img-circle channel-photo center-block">'
    //  + '</figure><a href="' + channelInfo.video_url + '" target="_blank" class="col-xs-8 text-center vertical-center-text">'+ channelInfo.name + '</a>'
     //
    //  + '<div class="col-xs-2 vertical-center-text"><span class="badge ' + channelInfo.badge_class + '">' + channelInfo.channel_status + '</span></div></div>';
    //  $("#all").append(addItem);

    //  if (data.mature) {
    //    $("#online").append(addItem);
    //  } else {
    //    $("#offline").append(addItem);
    //  }
  },
  error: function(data) {
    // console.log(data.responseText);
    var responseText = data.responseText;
    var channel_name = responseText.substring(responseText.indexOf("'")+1,responseText.lastIndexOf("'"));

    var channelInfo = {};

    channelInfo.channel_exist = false;
    channelInfo.name = channel_name;

    channelInfo.channel = channel_name;
    channels_detail.push(new Channel(channelInfo));

    // console.log(channel_name);
    // var channel_name = responseText.split(/[\'\']/);
    // console.log(channel_name);


    // console.log(data);
  }
  });

  var streamUrl = 'https://api.twitch.tv/kraken/streams/' + channelsList[i];
  $.ajax({
   type: 'GET',
   url: streamUrl,
   dataType: 'json',
   headers: {
     'Client-ID': '4w6yeo2vveef3gnql5k2qeezykzzt3x'
   },
   success: function(data) {
    //  console.log(data);
     var channelInfo = {};
     channelInfo.channel = data._links.channel;
     if (data.stream) {
       channelInfo.badge_class = "badge-success";
       channelInfo.channel_status = "On";
     } else {
       channelInfo.badge_class = "badge-danger";
       channelInfo.channel_status = "Off";
     }
     channels_status.push(new Channel(channelInfo));
   }
  });
}

// TODO: filter function
// var filter = function() {
//   var filterText = $("#search-bar").val().toLowerCase();
//   // console.log("Hi");
//   console.log(channels);
//   for (var i=0; i < channels.length; i++) {
//     channels[i].display = "show";
//   }
//
//   for (var i=0; i < channels.length; i++) {
//     if (channels[i].name.toLowerCase().indexOf(filterText) === -1) {
//       channels[i].display = "hidden";
//       var item = document.getElementsByClassName(channels[i].name.toLowerCase());
//       // var className =
//       var item2 = $(channels[i].name.toLowerCase());
//       console.log(item);
//       console.log(item2);
//       // item.addClass(channels[i].display);
//     }
//   }
//
//   //
//   // var kids = $("#all").children();
//   // console.log(kids);
//   // var filterText = $("#search-bar").val().toLowerCase();
//   // console.log(filterText);
//   //
//   // if (item.title.toLowerCase().indexOf(filterWords) > -1) {
//
// // }
// }

// for numbers display with comma
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var show = function() {
  // Hidden Channels Loading Button after one click
  $("#load-button").addClass("hidden");

  // console.log(channels_detail);
  // console.log(channels_status);
  for (var i = 0; i < channels_detail.length; i ++) {
    var channel_name = channels_detail[i].channel;
    // console.log(channels_detail[i].channel);
    for (var j = 0; j < channels_status.length; j ++) {
      if(channels_status[j].channel.toLowerCase() === channels_detail[i].channel.toLowerCase()) {
        // console.log(channels_status[j].channel);
        // console.log(channels_detail[i].channel);
        // console.log("It works");
        channels_detail[i].badge_class = channels_status[j].badge_class;
        channels_detail[i].channel_status = channels_status[j].channel_status;
      }
    }
  }

  console.log(channels_detail);

  for (var i = 0; i < channels_detail.length; i ++) {
    displayContent(channels_detail[i]);
  }
  // for (var j = 0; j < channels_status.length; j ++) {
  //   console.log(channels_status[j].channel);
  // }


}

var displayContent = function (channelInfo) {
  if (channelInfo.channel_exist) {
    if (channelInfo.channel_status === "On") {
      var addItem = '<div class="col-xs-12 channel-list ' + channelInfo.name.toLowerCase() +'"><figure class="col-xs-2"><img src="'+ channelInfo.channel_photo + '" alt="channel photo" class="img-circle channel-photo center-block">'
       + '</figure><a href="'+ channelInfo.video_url + '" target="_blank" class="col-xs-6 text-center vertical-center-text">' + channelInfo.name + '</a>'
       + '<span class="col-xs-2 fa fa-info-circle fa-2x text-center vertical-center-text text-info" data-toggle="collapse" data-target="#' + channelInfo.name.toLowerCase() + '"></span>'
       + '<div class="col-xs-2 vertical-center-text"><span class="badge ' + channelInfo.badge_class + '">' + channelInfo.channel_status + '</span></div>'
       + '<div class="col-xs-12 vertical-center-text collapse" id="' + channelInfo.name.toLowerCase() + '">'
       + '<div class="col-xs-12 panel panel-primary"><div class="panel-heading">Game: ' + channelInfo.game + '</div>'
       + '<div class="panel-body bg-info text-center"><h5 class="text-center">' + channelInfo.stream_status + '</h5>'
       + '<h6 class="text-right">' + numberWithCommas(channelInfo.followers) + ' Followers</h6><h6 class="text-right">' + numberWithCommas(channelInfo.views) + ' Watching</h6>'
       + '<a href="' + channelInfo.video_url + '" target="_blank" class="btn btn-primary" role="button">Watch</a></div></div></div></div>';
       // $("#online").append(addItem);
       // id using limitation for collapse targeting, use a special one for online case
    } else if (channelInfo.channel_status === "Off") {
      var addItem = '<div class="col-xs-12 channel-list ' +channelInfo.name.toLowerCase() + '"><figure class="col-xs-2"><img src="' + channelInfo.channel_photo + '" alt="channel photo" class="img-circle channel-photo center-block">'
      + '</figure><a href="' + channelInfo.video_url + '" target="_blank" class="col-xs-8 text-center vertical-center-text">'+ channelInfo.name + '</a>'
      + '<div class="col-xs-2 vertical-center-text"><span class="badge ' + channelInfo.badge_class + '">' + channelInfo.channel_status + '</span></div></div>';
      $("#offline").append(addItem);
    }
    $("#all").append(addItem);

    // id using limitation for collapse targeting, treat online case specially
    if (channelInfo.channel_status === "On") {
      var addItem = '<div class="col-xs-12 channel-list ' + channelInfo.name.toLowerCase() +'"><figure class="col-xs-2"><img src="'+ channelInfo.channel_photo + '" alt="channel photo" class="img-circle channel-photo center-block">'
       + '</figure><a href="'+ channelInfo.video_url + '" target="_blank" class="col-xs-6 text-center vertical-center-text">' + channelInfo.name + '</a>'
       + '<span class="col-xs-2 fa fa-info-circle fa-2x text-center vertical-center-text text-info" data-toggle="collapse" data-target="#' + channelInfo.name.toLowerCase() + channelInfo.channel_status + '"></span>'
       + '<div class="col-xs-2 vertical-center-text"><span class="badge ' + channelInfo.badge_class + '">' + channelInfo.channel_status + '</span></div>'
       + '<div class="col-xs-12 vertical-center-text collapse" id="' + channelInfo.name.toLowerCase() + channelInfo.channel_status + '">'
       + '<div class="col-xs-12 panel panel-primary"><div class="panel-heading">Game: ' + channelInfo.game + '</div>'
       + '<div class="panel-body bg-info text-center"><h5 class="text-center">' + channelInfo.stream_status + '</h5>'
       + '<h6 class="text-right">' + numberWithCommas(channelInfo.followers) + ' Followers</h6><h6 class="text-right">' + numberWithCommas(channelInfo.views) + ' Watching</h6>'
       + '<a href="' + channelInfo.video_url + '" target="_blank" class="btn btn-primary" role="button">Watch</a></div></div></div></div>';
       $("#online").append(addItem);
    }
  } else {
    var addItem = '<div class="col-xs-12 channel-list"><figure class="col-xs-2"><img src="' + img_placeholder + '" alt="channel photo" class="img-circle channel-photo center-block">'
        + '</figure><a href="' + url_placeholder + '" target="_blank" class="col-xs-8 text-center vertical-center-text">' + channelInfo.name + '</a><div class="col-xs-2 vertical-center-text">'
        + '<span class="badge badge-danger">' + status_placeholder + '</span></div></div>';

    $("#all").append(addItem);
  }
}
