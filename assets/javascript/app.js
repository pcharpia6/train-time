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
    console.log("you submitted!");

    // Grabbed values from text boxes
    name = $("#input-trainName").val().trim();
    dest = $("#input-destination").val().trim();
    first = $("#input-firstTrain").val().trim();
    freq = $("#input-frequency").val().trim();

        // TODO = add type control
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
        // min: min
    };
    database.ref().push({newTrain});

});

function makeRow(input) {
    var row = $("<tr>");
    var data = $("<td class='text-center'>");
    $(data).text(input);
    $(row).append(data);
    // return row;
    console.log(row);
}

database.ref().on("value", function(snapshot) {

    var displayName = makeRow(snapshot.val().name);
    var displayDest = makeRow(snapshot.val().dest);
    var displayFirst = makeRow(snapshot.val().first);
    var displayFreq = makeRow(snapshot.val().freq);
    var displayMin = makeRow(snapshot.val().min);

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});