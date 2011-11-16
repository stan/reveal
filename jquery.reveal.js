/*
 * jQuery Reveal Plugin 1.0
 * www.ZURB.com
 * Copyright 2010, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

(function ($) {
    var defaults = {
        animation: 'fadeAndPop',                    // fade, fadeAndPop, none
        animationSpeed: 300,                        // how fast animtions are
        closeOnBackgroundClick: true,               // if you click background will modal close?
        closeOnKey: 27,                             // close on a specific key (27 is the keycode for the escape key)
        closeOnTimeout: false,                      // close the modal after provided given milliseconds
        dismissModalClass: 'close-reveal-modal',    // the class of a button or element that will close an open modal
        revealedCallback: null,                     // optional callback to run after the modal has revealed (loaded)
        dismissCallback: null                       // optional callback to run after the modal has closed
    };

    $('a[data-reveal-id]').live('click', function (e) {
        e.preventDefault();
        $('#' + $(this).attr('data-reveal-id')).reveal($(this).data());
    });

    $.fn.reveal = function (args) {
        return this.each(function () {
            var modal = $(this),
            topMeasure = parseInt(modal.css('top')),
            topOffset = modal.height() + topMeasure,
            locked = false,
            background = $('.reveal-modal-bg'),
            timeout = null,
            options = $.extend({}, defaults, args);

            // open
            modal.bind('reveal:open', function () {
                if (background.length == 0)
                    background = $('<div class="reveal-modal-bg" />').insertAfter(modal).fadeTo('fast', 0.8);

                if (!locked) {
                    locked = true;
                    modal.css({ 'opacity': 0, 'top': $(document).scrollTop() + topMeasure, 'visibility': 'visible' });

                    var animations = { 'opacity': 1 };

                    if (options.animation == 'fadeAndPop') {
                        modal.css('top', $(document).scrollTop() - topMeasure);
                        animations.top = $(document).scrollTop() + topMeasure + 'px';
                    } else if (options.animation == 'fade') {
                        // nothing
                    } else if (options.animation == 'none') {
                        modal.css('opacity', 1);
                        options.animationSpeed = 0;
                    }

                    modal.delay(options.animationSpeed / 2).animate(animations, options.animationSpeed, function () {
                        eval(options.revealedCallback);
                    });
                    background.fadeIn(options.animationSpeed / 2);
                }

                // close if the background is clicked
                if (options.closeOnBackgroundClick) {
                    background.css({ 'cursor': 'pointer' }).bind('click.modalEvent', function () {
                        modal.trigger('reveal:close');
                    });
                }

                // close if the specified key is pressed (default escape)
                if (options.closeOnKey) {
                    $('body').keyup(function (e) {
                        if (e.which === options.closeOnKey)
                            modal.trigger('reveal:close');
                    });
                }

                // close if the x is clicked
                modal.find('.' + options.dismissModalClass).live('click.modalEvent', function () {
                    modal.trigger('reveal:close')
                });

                locked = false;
                modal.unbind('reveal:open');
            });

            // close
            modal.bind('reveal:close', function () {
                if (!locked) {
                    locked = true

                    var animations = { 'opacity': 0 };
                    var css = { 'top': topMeasure, 'visibility': 'hidden' };

                    if (options.animation == 'fadeAndPop') {
                       animations.top = $(document).scrollTop() - topOffset + 'px';
                    } else if (options.animation == 'fade') {
                      // nothing
                    } else if (options.animation == 'none') {
                        options.animationSpeed = 0;
                    }

                    modal.animate(animations, options.animationSpeed, function () { modal.css(css); });
                    background.delay(options.animationSpeed).fadeOut(options.animationSpeed, function () { eval(options.dismissCallback); });
                }

                clearTimeout(timeout);
                locked = false;
                modal.unbind('reveal:close');
            });

            modal.trigger('reveal:open');

            if (options.closeOnTimeout)
                timeout = setTimeout(function () { modal.trigger('reveal:close'); }, options.closeOnTimeout);
        });
    };
})(jQuery);