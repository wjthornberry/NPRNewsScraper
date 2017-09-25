// Hide the articles div upon load
$('#articles').hide();

// Grab articles as JSON on click
$('#scrape').on('click', function() {
    // Show the articles div
    $('#articles').show();
    $.getJSON('/articles', function(data) {
        // For each one
        for (var i = 0; i < data.length; i++) {
            // Display the appropriate info on the page
            $('#articles').append(`<div class='newArticle'><p data-id=' ${data[i]._id} '><h3><a class='link' target='_blank' href=' ${data[i].title} </a></h3><button type='button' id='favorite' data-id=' ${data[i]._id} ' class='btn btn-default'>Add to Favorites</button></p></div>'`);
        }
    });
});

// On click, push the saved articles to the favorites page
$('#articles').on('click', '#addNote', function() {
    console.log('Clicked!');
});

// p tag click
$('thing').on('click', function() {
    // Empty the notes from the note section
    $('#notes').empty();
    // Save the id from the p tag
    let thisId = $(this).attr('data-id');

    // AJAX call for the article
    $.ajax({
        method: 'GET',
        url: '/articles/' + thisId
    })
    // Once that is done, add the note's info to the page
    .done(function(data) {
        console.log(data);
        // Article title
        $('#notes').append(`<h2> ${data.title} </h2>`);
        // Input to enter a new title
        $('#notes').append('<input id='titleinput' name='title' >');
        // Text area to add a new note body
        $('#notes').append('<textarea id='bodyinput' name='body'></textarea>');
        // A button to submit a new note with the iD of the article saved to it
        $('#notes').append(`<button data-id=' ${data._id} 'id='savenote'>Save Note</button`);

        // When/if there's a note in the artcle
        if (data.note) {
            // Put the note's body in the body textarea
            $('#titleinput').val(data.note.title);
            // Put teh body of the note into the body textarea
            $('#bodyinput').val(data.note.body);
        }
    });
});

// Save note button is clicked
$(document).on('click', '#savenote', function() {
    // Grab id connected with the article from the submit button
    let thisId = $(this).attr('data-id');

    // POST request to modify the note and use what's entered in the inputs
    $.ajax({
        method: 'POST',
        url: '/articles/' + thisId,
        data: {
            // Value taken from the title input
            title: $('#titleinput').val(),
            // Value taken from the note text area
            body: $('#bodyinput').val()
        }
})

    // Once complete
    .done(function(data)) {
        // Log the response
        console.log(data);
        // Empty notes section
        $('#notes').empty;
    }); 

    // Remove values entered in the input and text area for note entry
    $('#titleinput').val('');
    $('#bodyinput').val('');
})

// Modals
$('lpModal').on('shown.bs.modal', function () {
    $('#myInput').focus()
})

$('#scrapeModal').on('shown.bs.modal', function () {
    $('#myInput').focus()
})

$('#0').on('shown.bs.modal', function () {
    $('#myInput').focus()
})



        // Text area to add a new note body
        $('#notes').append(`<textarea id='bodyinput' name='body'></textarea>`);
        // A button to submit a new note, with the id of the article saved to it
        $('#notes').append(`<button data-id=' ${data._id} + ' id='savenote'>Save Note</button>`);

        // If there's already a note in the article
        if (data.note) {
            // Place the title of the note in the body textarea
            $('#bodyinput').val(data.note.body);
        }
    });
});

// When the savenote button is clicked
$(document).on('click', '#savenote', function() {
    // Grab the article's id from the submit button
    let thisId = $(this).attr('data-id');

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: 'POST',
        url: '/articles/' + thisId,
        data: {
            // Value from title input
            title: $('#titleinput').val(),
            // Value from note text area
            body: $('#bodyinput').val()
        }
    })
    // Once that is done
    .done(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $('#notes').empty();
    });

    // Remove the values entered into the input and text area for note entry
    $('#titleinput').val('');
    $('#bodyinput').val('');
});