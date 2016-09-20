// $.getJSON('https://api.twitch.tv/kraken/streams/freecodecamp?callback=?', function(data) {
//   console.log(data);
// });
// https://api.twitch.tv/kraken/channels/test_channel

// $.getJSON('https://api.twitch.tv/kraken/channels/ESL_SC2?callback=?', function(data) {
//   console.log(data);
// });
var channelsList = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "sodapoppin", "moonducktv"];

// https://www.twitch.tv/sodapoppin
// https://www.twitch.tv/moonducktv

for (var i=0; i < channelsList.length; i++) {
  var channelUrl = 'https://api.twitch.tv/kraken/streams/' + channelsList[i];
  // var channelUrl = 'https://api.twitch.tv/kraken/channels/' + channelsList[i];
  console.log(channelUrl);

  $.ajax({
   type: 'GET',
   url: channelUrl,
   dataType: 'json',
   headers: {
     'Client-ID': '4w6yeo2vveef3gnql5k2qeezykzzt3x'
   },
   success: function(data) {
     console.log(data);
     var video_url = data.stream.channel.url;
     var name = data.stream.channel.display_name;
     var channel_photo = data.stream.channel.logo;
     console.log(name);
     console.log(video_url);
     console.log(channel_photo);
     var badge_class = "badge-danger";
     var channel_status = "Off";
     if(data && data.stream && data.stream.channel) {
       channel_status = "On";
       badge_class = "badge-success";
     }

     var addItem = '<figure class="col-xs-2"><img src="' + channel_photo + '" alt="channel photo" class="img-circle channel-photo center-block">'
     + '</figure><a href="' + video_url + '" target="_blank" class="col-xs-8 text-center vertical-center-text">OgamingSC2</a>'
     + '<div class="col-xs-2 vertical-center-text"><span class="badge' + badge_class + '">' + channel_status + '</span></div>';
     $("#all").append(addItem);
   }
  });

}
