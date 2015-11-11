$('body').scrollspy({ target: '#navbar-example2' });

$('[data-spy="scroll"]').each(function () {
    var $spy = $(this).scrollspy('refresh')
});

$(document).ready(function() {
    var imgArray,
        inProgress = false,
        startFrom = 5;
        showInStep = 5;
    $.get('images.json').success(function (data) {
        imgArray = data;
        console.log(imgArray);
        return imgArray;
    }).error(function () {
        console.log('error');
    });
    $(window).scroll(function () {
        if ($('body').scrollTop() + $(window).height() >= $(document).height() && !inProgress) {
            $.ajax({
                url: "images.json",
                beforeSend: function(){
                    inProgress = true;
                } }).done(function(data){
                    inProgress = false;
                    console.log( "Прибыли данные: " + data.images );
                    imgArray = data.images;
                    if ((startFrom+showInStep)<imgArray.length){
                        for (var i = startFrom; i < (startFrom + showInStep); i++) {
                            $("#one .panel-body").append("<div class='img-wrapper'><img src='" + imgArray[i] + "' class='gallery-img just-added' alt='' ></div>");
                            setTimeout(500, $('.gallery-img').fadeIn().removeClass('just-added'));
                        }
                    }

                });

            startFrom = startFrom + showInStep;



        }
    });
});