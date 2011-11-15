/*
 * jQuery Reveal Plugin 1.0
 * www.ZURB.com
 * Copyright 2010, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

(function ($) {
    $('a[data-reveal-id]').live('click', function (event) {
        event.preventDefault();
        var modalLocation = $(this).attr('data-reveal-id');
        $('#' + modalLocation).reveal($(this).data());
    });

    $.fn.reveal = function (options) {
        var defaults = {
            animation: 'fadeAndPop',                // fade, fadeAndPop, none
            animationSpeed: 300,                    // how fast animtions are
            closeOnBackgroundClick: true,           // if you click background will modal close?
            closeOnKey: 27,                         // close on a specific key (27 is the keycode for the escape key)
            dismissModalClass: 'close-reveal-modal' // the class of a button or element that will close an open modal
        };
        var options = $.extend({}, defaults, options);

        return this.each(function () {
            var modal = $(this),
            topMeasure = parseInt(modal.css('top')),
            topOffset = modal.height() + topMeasure,
            locked = false,
            background = $('.reveal-modal-bg');

            // open
            modal.bind('reveal:open', function () {
                if (background.length == 0)
                    background = $('<div class="reveal-modal-bg" />').insertAfter(modal).fadeTo('fast', 0.8);

                background.unbind('click.modalEvent');
                $('.' + options.dismissModalClass).unbind('click.modalEvent');

                if (!locked) {
                    lock();
                    if (options.animation == "fadeAndPop") {
                        modal.css({ 'top': $(document).scrollTop() - topOffset, 'opacity': 0, 'visibility': 'visible' });
                        background.fadeIn(options.animationSpeed / 2);
                        modal.delay(options.animationSpeed / 2).animate({
                            "top": $(document).scrollTop() + topMeasure + 'px',
                            "opacity": 1
                        }, options.animationSpeed, unlock);
                    } else if (options.animation == "fade") {
                        modal.css({ 'opacity': 0, 'visibility': 'visible', 'top': $(document).scrollTop() + topMeasure });
                        background.fadeIn(options.animationSpeed / 2);
                        modal.delay(options.animationSpeed / 2).animate({
                            "opacity": 1
                        }, options.animationSpeed, unlock);
                    } else if (options.animation == "none") {
                        modal.css({ 'visibility': 'visible', 'top': $(document).scrollTop() + topMeasure });
                        background.css({ "display": "block" });
                        unlock();
                    }
                }
                modal.unbind('reveal:open');
            });

            // close
            modal.bind('reveal:close', function () {
                if (!locked) {
                    lock();
                    if (options.animation == "fadeAndPop") {
                        background.delay(options.animationSpeed).fadeOut(options.animationSpeed);
                        modal.animate({
                            "top": $(document).scrollTop() - topOffset + 'px',
                            "opacity": 0
                        }, options.animationSpeed / 2, function () {
                            modal.css({ 'top': topMeasure, 'opacity': 1, 'visibility': 'hidden' });
                            unlock();
                        });
                    } else if (options.animation == "fade") {
                        background.delay(options.animationSpeed).fadeOut(options.animationSpeed);
                        modal.animate({
                            "opacity": 0
                        }, options.animationSpeed, function () {
                            modal.css({ 'opacity': 1, 'visibility': 'hidden', 'top': topMeasure });
                            unlock();
                        });
                    } else if (options.animation == "none") {
                        modal.css({ 'visibility': 'hidden', 'top': topMeasure });
                        background.css({ 'display': 'none' });
                    }
                }
                modal.unbind('reveal:close');
            });

            modal.trigger('reveal:open');

            // close if the background is clicked
            if (options.closeOnBackgroundClick) {
                background.css({ 'cursor': 'pointer' });
                background.bind('click.modalEvent', function () {
                    modal.trigger('reveal:close');
                });
            }

            // close if the specified key is pressed (default escape)
            $('body').keyup(function (e) {
                if (e.which === options.closeOnKey) {
                    modal.trigger('reveal:close');
                }
            });

            // close if the x is clicked
            modal.find('.' + options.dismissModalClass).live('click.modalEvent', function () {
                modal.trigger('reveal:close')
            })

            function unlock() {
                locked = false;
            }

            function lock() {
                locked = true;
            }
        });
    };
})(jQuery);
