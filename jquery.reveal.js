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
        openedCallback: function () { },            // optional callback to run after the modal has revealed (loaded)
        closedCallback: function () { },            // optional callback to run after the modal has closed
    }, imgModal = 'reveal-image-modal', ajaxModal = 'reveal-ajax-modal';

    $('a[data-reveal-id], a[data-reveal-image], a[data-reveal-url]').live('click', function (e) {
        e.preventDefault();
        $(this).blur();

        var modal = $('#' + $(this).data('reveal-id')),
            image = $(this).data('reveal-image'),
            url = $(this).data('reveal-url'),
            close = $('<a class="close-reveal-modal">&#215;</a>');

        if (image) {
            modal = $(document.createElement('div')).append($('<img src="' + image + '" />'))
                                                    .append(close).attr('id', imgModal).appendTo($('body'));
        } else if (url && modal.length === 0) {
            url = ($(this).data('reveal-url-id') ? url += ' #' + $(this).data('reveal-url-id') : url);
            var msg = ($(this).data('reveal-url-loading') ? $(this).data('reveal-url-loading') : 'We\'re just downloading the content, hang on in there!')
            modal = $(document.createElement('div')).append($('<p class="reveal-ajax-loader">' + msg + '</p>'))
                                                    .load(url, null, function () {
                                                        $(this).find($('.reveal-ajax-loader')).remove();
                                                        $(this).append(close); 
                                                    }).attr('id', ajaxModal).appendTo($('body'));
        }

        modal.addClass('reveal-modal').reveal($(this).data());
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
                            if (typeof window[options.openedCallback] === 'function') {
                                window[options.openedCallback]();
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
                            if (modal.attr('id') === ajaxModal || modal.attr('id') === imgModal) {
                                modal.remove();
                            }

                            if (typeof window[options.closedCallback] === 'function') {
                                window[options.closedCallback]();
                            }
                        });
                    }

                    clearTimeout(timeout);
                    locked = false;
                    modal.unbind('reveal:close');
                });

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