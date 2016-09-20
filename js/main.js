

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
  console.log(i);
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
     var addItem = '<figure class="col-xs-2"><img src="' + channelInfo.channel_photo + '" alt="channel photo" class="img-circle channel-photo center-block">'
     + '</figure><a href="' + channelInfo.video_url + '" target="_blank" class="col-xs-8 text-center vertical-center-text">'+ channelInfo.name + '</a>'
     + '<div class="col-xs-2 vertical-center-text"><span class="badge ' + channelInfo.badge_class + '">' + channelInfo.channel_status + '</span></div>';
     $("#all").append(addItem);

     if (data.mature) {
       var addItem = '<figure class="col-xs-2"><img src="' + channelInfo.channel_photo + '" alt="channel photo" class="img-circle channel-photo center-block">'
       + '</figure><a href="' + channelInfo.video_url + '" target="_blank" class="col-xs-8 text-center vertical-center-text">'+ channelInfo.name + '</a>'
       + '<div class="col-xs-2 vertical-center-text"><span class="badge ' + channelInfo.badge_class + '">' + channelInfo.channel_status + '</span></div>';
       $("#online").append(addItem);
     } else {
       var addItem = '<figure class="col-xs-2"><img src="' + channelInfo.channel_photo + '" alt="channel photo" class="img-circle channel-photo center-block">'
       + '</figure><a href="' + channelInfo.video_url + '" target="_blank" class="col-xs-8 text-center vertical-center-text">'+ channelInfo.name + '</a>'
       + '<div class="col-xs-2 vertical-center-text"><span class="badge ' + channelInfo.badge_class + '">' + channelInfo.channel_status + '</span></div>';
       $("#offline").append(addItem);
     }
   }
  });
}

if(channelsList.length === channels.length) {
  console.log("success");
  console.log(channels);
}








// for (var i=0; i < channelsList.length; i++) {
//   var channelUrl = 'https://api.twitch.tv/kraken/streams/' + channelsList[i];
//   // var channelUrl = 'https://api.twitch.tv/kraken/channels/' + channelsList[i];
//   console.log(channelUrl);
//
//   var video_url = "";
//   var name = channelsList[i];
//   var channel_photo = "";
//   var badge_class = "";
//   var channel_status = "";
//
//   $.ajax({
//    type: 'GET',
//    url: channelUrl,
//    dataType: 'json',
//    headers: {
//      'Client-ID': '4w6yeo2vveef3gnql5k2qeezykzzt3x'
//    },
//    success: function(data) {
//      console.log(data);
//
//      if(data && data.stream && data.stream.channel) {
//        console.log("Online");
//        video_url = data.stream.channel.url;
//        name = data.stream.channel.display_name;
//        channel_photo = data.stream.channel.logo;
//        channel_status = "On";
//        badge_class = "badge-success";
//      } else {
//        console.log("Offline");
//        channel_status = "Off";
//        badge_class = "badge-danger";
//        name = channelsList[i];
//       //  TODO: name无法读取呢？
//       //  console.log(channelsList[i]);
//
//      }
//      console.log(name);
//      console.log(video_url);
//      console.log(channel_photo);
//    },
//    error: function(data){
//      console.log(data);
//    }
//   });
// }

//
// var addItem = '<figure class="col-xs-2"><img src="' + channel_photo + '" alt="channel photo" class="img-circle channel-photo center-block">'
// + '</figure><a href="' + video_url + '" target="_blank" class="col-xs-8 text-center vertical-center-text">'+ name + '</a>'
// + '<div class="col-xs-2 vertical-center-text"><span class="badge ' + badge_class + '">' + channel_status + '</span></div>';
// $("#all").append(addItem);
