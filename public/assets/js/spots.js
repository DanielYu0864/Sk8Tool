$(function(){
    //creat-form is from activity code. need to rename
    $('create-form').on('submit', function(event){
        event.preventDefault();

        var newSpot ={
            name: $('#spot-name').val().trim(),
            description: $('#spot_description').val().trim,
            city: $('#spot-city').val().trim(),
            crossStreets: $('#cross-street')
        };

        $.ajax('api/spots',{
            type: 'POST',
            data: newSpot
        }).then(function(){
            console.log('Adding new spot');
            location.reload();
        });
    });
    //this doesn't exist yet but I am coding it incase we want to add it
    $('.delete-spot').on('click', function(event){
        var id = $(this).data('id');

        $.ajax('/api/spots' + id, {
            type: 'DELETE'
        }).then(function(){
            console.log('Spot deleted', id);
            location.reload();
        });
    });
});