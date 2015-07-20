$('.playList li').on('click', function (event) {
    $('#defaultAnim').toggle('scale', function () {
        $('.playAnim').hide().load("lyrics.html #loaded").fadeIn('500');
    });
});


$('.playList li').on('click', function () {
    $('.footer').animate({bottom: "0px"}, 1000);
});



$('.playList li').on('click', function() {
    $(this).find('.hideBoxHide').show('slide',{direction: 'up'}, 'fast');
    $('.playList li').not(this).find('.hideBoxHide').hide();
});

$('.playList li .hideBoxHide .download').on('click', function () {
    event.stopPropagation();
    $(this).css({'opacity': 0.2});
});


$('.download a').attr( "href", function() {
    return "http://invisibleglue.com/audio/" + this.title + ".mp3";
});


$("video").prop('muted', true);

$("#videoMuteIcon").click( function (){
    $('#videoMuteIcon').toggleClass('fa-volume-up');

    if( $("video").prop('muted') ) {
        $("video").prop('muted', false);
    } else {
        $("video").prop('muted', true);
    }
});

//return a DOM object
var video = document.getElementById('wayOutSplash'); //or
var video = $('#wayOutSplash').get(0); //or
var video = $('#wayOutSplash')[0];

//return a jQuery object
var video = $('#wayOutSplash');

    video.on('loadedmetadata', function() {
        $('.duration').text(video[0].duration);
    });
    video.on('timeupdate', function() {
        $('.current').text(video[0].currentTime);
    });

    $("#videoPlayPause").click(function () {
        $('#videoPpIcon').toggleClass('fa-pause', 'fa-play'); //Adds 'a', removes 'b' and vice versa
        var video = $('#wayOutSplash')[0];
            if(video.paused) {
                video.play();
            } else {
                video.pause();
            }
        return false;
    });

    //get HTML5 video time duration
    video.on('loadedmetadata', function() {
        $('.duration').text(video[0].duration);
    });

    //update HTML5 video current play time
    video.on('timeupdate', function() {
        var currentPos = video[0].currentTime; //Get currenttime
        var maxduration = video[0].duration; //Get video duration
        var percentage = 100 * currentPos / maxduration; //in %
        $('.timeBar').css('width', percentage+'%');
    });
    var timeDrag = false;   /* Drag status */
    $('.progressBar').mousedown(function(e) {
        timeDrag = true;
        updatebar(e.pageX);
    });
    $(document).mouseup(function(e) {
        if(timeDrag) {
            timeDrag = false;
            updatebar(e.pageX);
        }
    });
    $(document).mousemove(function(e) {
        if(timeDrag) {
            updatebar(e.pageX);
        }
    });

    //update Progress Bar control
    var updatebar = function(x) {
        var progress = $('.progressBar');
        var maxduration = video[0].duration; //Video duraiton
        var position = x - progress.offset().left; //Click pos
        var percentage = 100 * position / progress.width();

        //Check within range
        if(percentage > 100) {
            percentage = 100;
        }
        if(percentage < 0) {
            percentage = 0;
        }

        //Update progress bar and video currenttime
        $('.timeBar').css('width', percentage+'%');
        video[0].currentTime = maxduration * percentage / 100;
    };

    //loop to get HTML5 video buffered data
    var startBuffer = function() {
        var maxduration = video[0].duration;
        var currentBuffer = video[0].buffered.end(0);
        var percentage = 100 * currentBuffer / maxduration;
        $('.bufferBar').css('width', percentage+'%');

        if(currentBuffer < maxduration) {
            setTimeout(startBuffer, 500);
        }
    };
    setTimeout(startBuffer, 500);

$('#fullScreen').on('click', function() {
    //For Webkit
    video[0].webkitRequestFullscreen();

    //For Firefox
    video[0].mozRequestFullScreen();

    return false;
});

$('#btnLight').click(function() {
    if($(this).hasClass('on')) {
        $(this).removeClass('on');
        $('html').prepend('<div class="overlay"></div>');
        $('.overlay').animate({
            'opacity': 0.8
        }, 1200);
        $('.videoCenter').css({
            'z-index':1000
        });
        $('.buttonCenter').css({
            'z-index': 1001
        });
        $('#btnLightIcon').removeClass('fa-inverse', 1000).addClass('fa-reverse', 1000);
        $('video').animate({
           'width': '60%',
            'height': '60%'
        }, 1000);
        $('.buttonCenter').animate({
            'width': '60%',
            //'height': '60%',
            'left': '50%',
            'margin-left': '-405px',
            'top': '-50px'
        }, 1000);

    } else {
        $(this).addClass('on');
        $('.overlay').animate({
            'opacity': 0
        }, 1200);
        $('#btnLightIcon').removeClass('fa-reverse', 1000).addClass('fa-inverse', 1000);
        $('video').animate({
            'width': '640px',
            'height': '360px'
        }, 1000);

        $('.buttonCenter').animate({
            'width': '640px',
            'height': '48px'
        }, 1000);
    }
    return false;
});