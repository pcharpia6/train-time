var config = {
    apiKey: "AIzaSyACRvX97cxEarRcZdnWENxquUL5u6TJlGw",
    authDomain: "rock-paper-scissors-fb335.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-fb335.firebaseio.com",
    projectId: "rock-paper-scissors-fb335",
    storageBucket: "rock-paper-scissors-fb335.appspot.com",
    messagingSenderId: "693363059042"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

$("#add-train").on("click", function(event) {
    event.preventDefault();

    // Grabbed values from text boxes
    name = $("#input-trainName").val().trim();
    dest = $("#input-destination").val().trim();
    first = $("#input-firstTrain").val().trim();
    freq = $("#input-frequency").val().trim();

    if (!name || !dest || !first || !freq) {
        alert("Please fill in all fields!");
        return;
    }
    // Code for handling the push
    var newTrain = {
        name: name,
        dest: dest,
        first: first,
        freq: freq,
    };
    database.ref().push({newTrain});

    // reset input values
    $("#input-trainName").val("");
    $("#input-destination").val("");
    $("#input-firstTrain").val("");
    $("#input-frequency").val("");
});
var format = 'hh:mm'
database.ref().on("child_added", function(snapshot) {
    // Grab database values
    var name = snapshot.val().newTrain.name;
    var dest = snapshot.val().newTrain.dest;
    var next = snapshot.val().newTrain.first;
    var freq = snapshot.val().newTrain.freq;
    // Format the database value for time
    displayNext = moment(next, format);
    // Difference between the times
    var diffTime = moment().diff(moment(displayNext), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % freq;


    // is the station running?

    var time = moment();
    var beforeTime = moment('22:00', format);
    var afterTime = moment('04:00', format);

if (time.isBetween(beforeTime, afterTime)) {
    // Minute Until Train
    displayMinTo = freq - tRemainder;

    // Next Train
    displayNext = moment(moment().add(displayMinTo, "minutes")).format(format);
    // create the new table row and add text
    var newRow = $("<tr>").append(
        
        $("<td class='text-center'>").text(name), //name
        $("<td class='text-center'>").text(dest), // destination
        $("<td class='text-center'>").text(freq), // frequency
        $("<td class='text-center'>").text(displayNext), // time of next arrival
        $("<td class='text-center'>").text(displayMinTo) // minutes until time of next arrival
      );

} else {
    // Time apart (remainder)
    var tRemainder = diffTime % freq;
    // Minute Until Train
    displayMinTo = freq - tRemainder;

    // Next Train
    displayNext = moment(moment().add(displayMinTo, "minutes")).format(format);
    // create the new table row and add text
    var newRow = $("<tr>").append(
        
        $("<td class='text-center'>").text(name), //name
        $("<td class='text-center'>").text(dest), // destination
        $("<td class='text-center'>").text(freq), // frequency
        $("<td class='text-center'>").text(snapshot.val().newTrain.first), // time of next arrival
        $("<td class='text-center'>").text(displayMinTo) // minutes until time of next arrival
      );

}

        // add new table row to the html
    $("#display-table > tbody").append(newRow);

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});