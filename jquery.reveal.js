/*
 * jQuery Reveal Plugin 1.0
 * www.ZURB.com
 * Copyright 2010, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

(function ($) {
    "use strict";
    var defaults = {
        animation: 'fadeAndPop',                    // fade, fadeAndPop, none
        animationSpeed: 250,                        // how fast animations are
        closeOnBackgroundClick: true,               // if you click background will modal close?
        closeOnKey: 27,                             // close on a specific key (27 is the keycode for the escape key)
        closeOnTimeout: false,                      // close the modal after provided  milliseconds
        dismissModalClass: 'close-reveal-modal',    // the class of a button or element that will close an open modal
        revealedCallback: function () { },          // optional callback to run after the modal has revealed (loaded)
        dismissCallback: function () { },          // optional callback to run after the modal has closed
        contentUrl: false,
        contentId: false
    }, ajaxContent = 'reveal-ajax-content';

    $('a[data-reveal-id], a[data-content-url]').live('click', function (e) {
        e.preventDefault();
        $(this).blur();

        var modal = $('#' + $(this).data('reveal-id'));

        if ($(this).data('content-url') && modal.length === 0) {
            modal = $(document.createElement('div')).addClass('reveal-modal').attr('id', ajaxContent).appendTo($('body'));
        }

        modal.reveal($(this).data());
    });

    $.fn.reveal = function (args) {
        if (typeof args === 'object' || !args) {
            return this.each(function () {
                var modal = $(this),
                    topMeasure = parseInt(modal.css('top'), 10),
                    topOffset = modal.height() + topMeasure,
                    locked = false,
                    background = $('.reveal-modal-bg'),
                    timeout = null,
                    options = $.extend({}, defaults, args);

                function close() {
                    modal.trigger('reveal:close');
                }

                // open
                modal.bind('reveal:open', function () {
                    if (background.length === 0) {
                        background = $('<div class="reveal-modal-bg" />').insertAfter(modal);
                    }

                    if (!locked) {
                        locked = true;

                        var animations = { 'opacity': 1 };
                        modal.css({ 'opacity': 0, 'top': $(document).scrollTop() + topMeasure, 'visibility': 'visible' });

                        if (options.animation === 'fadeAndPop') {
                            modal.css('top', $(document).scrollTop() - topMeasure);
                            animations.top = $(document).scrollTop() + topMeasure + 'px';
                        } else if (options.animation === 'fade') {
                            // nothing
                        } else if (options.animation === 'none') {
                            modal.css('opacity', 1);
                            options.animationSpeed = 0;
                        }

                        background.fadeTo(options.animationSpeed, 0.8).fadeIn(options.animationSpeed / 2);
                        modal.delay(options.animationSpeed / 2).animate(animations, options.animationSpeed, function () {
                            if (typeof window[options.revealedCallback] === 'function') {
                                window[options.revealedCallback]();
                            }
                        });

                        if (options.closeOnBackgroundClick) {
                            background.css('cursor', 'pointer').bind('click', close);
                        }

                        if (options.closeOnKey) {
                            $(document).unbind('keyup').keyup(function (e) {
                                if (e.which === options.closeOnKey) {
                                    close();
                                }
                            });
                        }

                        modal.find('.' + options.dismissModalClass).live('click', close);
                    }

                    locked = false;
                    modal.unbind('reveal:open');
                });

                // close
                modal.bind('reveal:close', function () {
                    if (!locked) {
                        locked = true;

                        var animations = { 'opacity': 0 }, css = { 'top': topMeasure, 'visibility': 'hidden' };

                        if (options.animation === 'fadeAndPop') {
                            animations.top = $(document).scrollTop() - topOffset + 'px';
                        } else if (options.animation === 'fade') {
                            // nothing
                        } else if (options.animation === 'none') {
                            options.animationSpeed = 0;
                        }

                        modal.animate(animations, options.animationSpeed, function () { modal.css(css); });
                        background.delay(options.animationSpeed).fadeOut(options.animationSpeed, function () {
                            if (modal.attr('id') === ajaxContent) {
                                modal.remove();
                            }

                            if (typeof window[options.dismissCallback] === 'function') {
                                window[options.dismissCallback]();
                            }
                        });
                    }

                    clearTimeout(timeout);
                    locked = false;
                    modal.unbind('reveal:close');
                });

                if (options.contentUrl) {
                    if (options.contentId) {
                        options.contentUrl += ' #' + options.contentId;
                    }

                    modal.load(options.contentUrl, null, function () {
                        $(this).append($('<a class="close-reveal-modal">&#215;</a>'));
                    });
                }

                modal.trigger('reveal:open');

                if (options.closeOnTimeout) {
                    timeout = setTimeout(function () { modal.trigger('reveal:close'); }, options.closeOnTimeout);
                }
            });
        } else if (args === 'close') {
            return this.each(function () {
                $(this).trigger('reveal:close');
            });
        }
    };
})(jQuery);