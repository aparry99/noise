$(document).ready(function () {
  var loggedIn = localStorage.getItem("loggedIn");
  $("#tracksBtn").on("click", function () {
    console.log(loggedIn);
  });

  $("#logoutBtn").on("click", function () {
    loggedIn = "false";
    localStorage.setItem("loggedIn", loggedIn);
    console.log("Attempt to hide container");
    $("#logoutBtn").hide();
    $(".sideTrackContainer").hide();
    $(".credentialsContainer").show();
  });

  // loggedIn = current user state
  if (loggedIn == "true") {
    $(".credentialsContainer").hide();
    $(".sideTrackContainer").fadeIn(1000);
    $("#logoutBtn").fadeIn(1000);
    console.log("1 hiding container because of formID");
  } else if (loggedIn == "false") {
    $(".credentialsContainer").show();
    $(".sideTrackContainer").hide();
    $("#logoutBtn").hide();
    console.log("2 hiding container because of formID");
  }

  // formID = last form
  var formID = localStorage.getItem("formID");
  if (formID == "login-form") {
    $(".loginContainer").show();
    $(".registerContainer").hide();
  } else {
    $(".loginContainer").hide();
    $(".registerContainer").show();
  }

  $("#loginBtn").on("click", function () {
    $(".registerContainer").hide();
    $(".loginContainer").fadeIn(1000);
  });

  $("#registerBtn").on("click", function () {
    $(".loginContainer").hide();
    $(".registerContainer").fadeIn(1000);
  });

  // $("#modalSignup").modal({ backdrop: "static", keyboard: false });
  // $("#modalLogin").modal({ backdrop: "static", keyboard: false });

  // create random hex colour
  const rand_hex = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return "#" + n.slice(0, 6);
  };

  // init Wave()
  let wave = new Wave();

  optionsCircle = { type: "flower", stroke: "3", colors: ["#F20DE9"] };
  optionsCircle2 = { type: "flower", stroke: "4", colors: ["#0da7f2"] };

  //temp track gen
  // console.log(jsonPHP);
  // console.log(jsonPHP.length);
  // i = 0;
  // while (i < jsonPHP.length) {
  //   populateTracks();
  //   i++;
  // }

  // event listener for audio elements, sets volume, generates visuals and sets background cover image
  document.addEventListener(
    "play",
    function (e) {
      console.log(e);
      generateFlower(e.target.id);
      e.target.volume = 0.2;
      let trim1 = e.target.currentSrc.replace(
        "https://andrewparry.uosweb.co.uk/noise/choons/",
        "choonCovers/"
      );
      let trim2 = trim1.replace(".mp3", ".jpg");
      $("#bg").css("background-image", 'url("' + trim2 + '")');
      $(".container-viz").fadeIn(1000);
      var allChoons = document.getElementsByTagName("audio");
      for (var i = 0; i < allChoons.length; i++) {
        if (allChoons[i] != e.target) {
          allChoons[i].pause();
        }
      }
    },
    true
  );

  function generateFlower(id) {
    // console.log(id);
    wave.fromElement(id, "canvas-circle", optionsCircle);
    wave.fromElement(id, "canvas-circle2", optionsCircle2);
  }

  // loop over array for number of objects, append element with array information
  // this is initially pulled via PHP, then json_encoded
  for (i = 1; i < jsonPHP.length; i++) {
    // total elements added
    var total_element = $(".element").length;

    // last <div> with element class id
    var lastid = $(".element:last").attr("id");
    var split_id = lastid.split("_");
    var nextindex = Number(split_id[1]) + 1;
    var max = jsonPHP.length;
    // check total elements
    if (total_element < max) {
      // create container after last element
      $(".element:last").after(
        "<div class='element' id='div_" + nextindex + "'></div>"
      );
    }

    // append element
    $("#div_" + nextindex).append(
      "<div class='container-audio'>\
   <h4 class='text-center'>" +
        jsonPHP[i].choon_name +
        "</h3><canvas id='canvas_" +
        nextindex +
        "' height='100' width='900'></canvas><audio preload='none' id='musicPlayer_" +
        nextindex +
        "'controlslist='nodownload' controls>\
   <source id='src_" +
        nextindex +
        "' src='choons/" +
        jsonPHP[i].choon_name +
        ".mp3' type='audio/mp3'>Your browser dose not Support the audio Tag</audio</div>div>"
    );

    let player = document.getElementById("musicPlayer_" + nextindex);

    player.onplay = function () {
      console.log("The choon has started to play", $(this).attr("id"));
      // generateFlower($(this).attr("id"));

      // $(".container-viz").fadeIn(3000);
      // let choons = document.getElementsByTagName("audio");
      // for (let x = 0; x < choons.length; x++) {
      //   if ($(choons[x]).attr("id") !== $(this).attr("id")) {
      //     if (!choons[x].paused) {
      //       choons[x].pause();
      //     }
      //     console.log(
      //       "The choon has stopped ",
      //       $(choons[x]).attr("id"),
      //       "musicPlayer_" + nextindex
      //     );
      //   }
      // }
    };

    options = {
      type: "dualbars",
      colors: [rand_hex(), rand_hex(), rand_hex(), rand_hex()],
    };

    wave.fromElement(
      "musicPlayer_" + nextindex,
      "canvas_" + nextindex,
      options
    );
    wave.fromElement(
      "musicPlayer_" + nextindex,
      "canvas-circle",
      optionsCircle
    );
    wave.fromElement(
      "musicPlayer_" + nextindex,
      "canvas-circle2",
      optionsCircle2
    );
  }
  $("#scroll").css("display", "block");

  $(".container-audio").on("click", function () {
    let choons = this.getElementsByTagName("audio");
    let allChoons = document.getElementsByTagName("audio");

    for (let x = 0; x < allChoons.length; x++) {
      if ($(allChoons[x]).attr("id") !== $(choons).attr("id")) {
        if (!allChoons[x].paused) {
          allChoons[x].pause();
        }
      } else {
        if (!allChoons[x].paused) {
          allChoons[x].pause();
          $(".container-viz").fadeOut(500);
        } else {
          allChoons[x].play();
        }
      }
    }
  });

  $("#tracksBtn").on("click", function () {
    generateFlower();
  });

  $("#loginBtn").on("click", function () {});

  // Remove element
  $(".container").on("click", ".remove", function () {
    var id = this.id;
    var split_id = id.split("_");
    var deleteindex = split_id[1];

    // Remove <div> with id
    $("#div_" + deleteindex).remove();
  });
});

// function addTrack(pID, elementTag, elementID, html) {
// 	var p = document.getElementById(pID);
// 	var newElement = document.createElement(elementTag);
// 	newElement.setAttribute("id", elementID);
// 	newElement.innerHTML = html;
// 	p.appendChild(newElement);
// }

// function removeElement(elementID) {
// 	var element = document.getElementById(elementID);
// 	element.parentNode.removeChild(element);
// }

// var html = '<div class="container-audio">\<h4 class="text-center">Let It Go - Erick the Architect</h3>\<canvas id="canvas" height="100" width="620"></canvas>\
//   			<audio id="musicPlayer" controlslist="nodownload" controls>\<source src="/choons/Let It Go.mp3" type="audio/mp3">\Your browser dose not Support the audio Tag\</audio>\</div>';

// $("#loginBtn").on("click", function() {
// 	addTrack(1, ".container-audio", 1, html);
// });

// y = 0;
// while (y != 1000) {
// 	wave.fromElement("musicPlayer"+z, "canvas"+z, options);
// 	y++
// 	z++
// }

// set opacity before draw/
// ctx.globalAlpha = 0.5
// optionsBackground = {type:"cubes", stroke:"1", colors:["white"]};
// wave.fromElement("musicPlayer", "canvas-background", optionsBackground);

//   let z = 0;
//   $("#tracksBtn").on("click", function() {
// 	let wave = new Wave();
// 	z++
// 	options = {
// 		type: "dualbars",
// 		colors: ["#ff0000", "#ffa500", "#ffff00", "#008000", "#0000ff"],
// 	};
// 	// console.log(options);
// 	console.log('"musicPlayer_'+z+'","' +  'canvas_'+z+''+'"'+ "," + options);
// 	console.log(options);
// 	wave.fromElement('musicPlayer_' + z, 'canvas_' + z, options);

//   })

//   let x = document.getElementById("musicPlayer");
//   x.onplay = function() {
// 	  if (x.duration > 0 && !x.paused) {
// 		  console.log("Go!");
// 		  let wave = new Wave();
// 		  options = {type:"dualbars", colors:["red", "blue", "green"]};
// 		  wave.fromElement("musicPlayer", "canvas", options);

// 		  optionsCircle = { type: "flower", stroke: "3", colors: ["#F20DE9"] };
// 		  optionsCircle2 = { type: "flower", stroke: "4", colors: ["#0da7f2"] };
// 		  wave.fromElement("musicPlayer_1", "canvas-circle", optionsCircle);
// 		  wave.fromElement("musicPlayer_1", "canvas-circle2", optionsCircle2);
// 	  }
//   };

// function populateTracks() {
//   // total elements added
//   var total_element = $(".element").length;
//   console.log($(".element").length);

//   // last <div> with element class id
//   var lastid = $(".element:last").attr("id");
//   console.log("lastid: - " + lastid);
//   var split_id = lastid.split("_");
//   console.log("split_id: - " + split_id);
//   var nextindex = Number(split_id[1]) + 1;
//   console.log("nextindex: - " + nextindex);

//   console.log("jsonPHP.length: " + jsonPHP.length);
//   var max = jsonPHP.length;
//   console.log("max: " + max);
//   // check total elements
//   if (total_element < max) {
//     console.log("total_element: " + total_element);
//     // create container after last element
//     $(".element:last").after(
//       "<div class='element' id='div_" + nextindex + "'></div>"
//     );

//     for (let i = 0; i < jsonPHP.length; i++) {
//       tracks = jsonPHP[i];
//       console.log(tracks);
//       // console.log(jsonPHP[i]);

//       // append element
//       $("#div_" + nextindex).append(
//         "<div class='container-audio'>\
//  <h4 class='text-center'>" +
//           jsonPHP[i].choon_name +
//           "</h3><canvas id='canvas_" +
//           nextindex +
//           "' height='100' width='580'></canvas><audio preload='none' id='musicPlayer_" +
//           nextindex +
//           "'controlslist='nodownload' controls>\
//  <source id='src_" +
//           nextindex +
//           "' src='choons/" +
//           jsonPHP[i].choon_name +
//           ".mp3' type='audio/mp3'>Your browser dose not Support the audio Tag</audio</div>div>"
//       );

//       // console.log(jsonPHP[i].choon_name);
//       // console.log(jsonPHP[i].choon_name + ".mp3");
//       console.log(i);
//       console.log("musicPlayer_" + nextindex);
//       console.log("player is currently: " + player);
//       // if (player == null) {
//       //   setTimeout(createPlayer, 250);

//       // } else {
//       //   createPlayer();
//       // }
//       console.log("player: " + player);
//       player.onplay = function () {
//         console.log("The choon has started to play", $(this).attr("id"));
//         generateFlower($(this).attr("id"));

//         var choon = document.getElementsByTagName("audio");
//         $(".container-viz").fadeIn(3000);
//         // $(".container-viz").css("display", "block");
//         for (let x = 0; x < choon.length; x++) {
//           if ($(choon[i]).attr("id") !== "musicPlayer_" + nextindex) {
//             choon[i].pause();
//             console.log("The choon has stopped ", $(choon[i]).attr("id"));
//           }
//         }
//       };

//       wave.fromElement(
//         "musicPlayer_" + nextindex,
//         "canvas_" + nextindex,
//         options
//       );
//       wave.fromElement(
//         "musicPlayer_" + nextindex,
//         "canvas-circle",
//         optionsCircle
//       );
//       wave.fromElement(
//         "musicPlayer_" + nextindex,
//         "canvas-circle2",
//         optionsCircle2
//       );
//       var player = document.getElementById("musicPlayer_" + nextindex);

//       // nextindex++;
//     }

// var player = document.getElementById("musicPlayer_" + nextindex);
// // console.log(player);
// // console.log("player" + nextindex);
// player.onplay = function () {
//   // console.log("The choon has started to play", $(this).attr("id"));
//   // console.log("!!!" + $(this).attr("id"));
//   generateFlower($(this).attr("id"));

//   var audios = document.getElementsByTagName("audio");
//   function isPlaying(audios) {
//     console.log("......" + isPlaying);
//     return !audios.paused;
//   }

//   // $("audio").each(function () {
//   //   this.pause();
//   //   this.currentTime = 0;
//   // });

//   console.log(audios);
//   // console.log("hyhyhy" + $(audios[i]).attr("id"));
//   // for (let i = 0; i < audios.length; i++) {
//   if (isPlaying) {
//     console.log("The choon has started to play", $(this).attr("id"));
//   } else if (!isPlaying) {
//     audios[i].pause();
//     console.log("The choon has stopped ", $(audios[i]).attr("id"));
//   }
//   // }
// };

//$(audios[i]).attr("id") !== $(this).attr("id") &&

// console.log(jsonPHP[i].choon_name);
// console.log(jsonPHP[i].choon_name + ".mp3");
// console.log(i);
// console.log("musicPlayer_" + nextindex);
// console.log("player is currently: " + player);

// console.log("player: " + player);
// player.onplay = function () {
//   console.log("The choon has started to play", $(this).attr("id"));
//   generateFlower($(this).attr("id"));

//   var choon = document.getElementsByTagName("audio");
//   $(".container-viz").fadeIn(3000);
//   // $(".container-viz").css("display", "block");
//   for (let x = 0; x < choon.length; x++) {
//     if ($(choon[i]).attr("id") !== "musicPlayer_" + nextindex) {
//       choon[i].pause();
//       console.log("The choon has stopped ", $(choon[i]).attr("id"));
//     }
//   }
// };
