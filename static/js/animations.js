function animateUp(proj) {
    // In: jQuery object
    // Animates object in an upward quadratic arc, then calls the corresponding function to set the downward arc.
    if (!proj) {
        var proj = $(this);
    }

    var target = Math.floor(Math.random() * proj.parent().width());
    var left = (proj.position().left + target) / 2;
    var peak = Math.floor(Math.random() * (proj.parent().height() - 150) + 150) - 50;
    var time = Math.floor(Math.random() * 2 + 5) * 300;
    proj.animate({
        top: [peak+'px', 'easeOutQuad'],
        left: [left+'px', 'linear']
    }, time, 'easeOutQuad', animateDown)

    // Assign some tracking attributes.
    proj.attr('ani-time', time);
    proj.attr('ani-target', target);
}

function animateDown(proj) {
    if (!proj) {
        var proj = $(this);
    }
    var peak = proj.parent().height();
    var left = proj.attr('ani-target');
    var time = parseInt(proj.attr('ani-time'));
    proj.animate({
        top: [peak + 'px', 'easeInQuad'],
        left: [left + 'px', 'linear']
    }, time, animateUp);
    //console.log('DN Time:', proj.attr('ani-time'), 'Target:', proj.attr('ani-target'), '\nActual --', time, peak, left);
}

$(document).ready(function() {
    $('.project').each(function() {
        animateUp($(this));
        $(this).popover({placement: 'top', content: $(this).attr('popover-text'), trigger: 'manual'});
        $(this).hover(function () {
            $(this).pause();
            $(this).toggleClass('grow');
            $(this).popover('show');
        }, function() {
            $(this).resume();
            $(this).toggleClass('grow');
            $(this).popover('hide');
        });
    });

    $('.nav-item button').click(function() {
        $(this).parent().toggleClass('active');
        $(this).parent().siblings().removeClass('active');
    })
});