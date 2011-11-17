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
        closedCallback: function () { },             // optional callback to run after the modal has closed
        revealUrl: false,
        revealUrlId: false,
        revealLoading: 'We\'re just loading the content, hang on in there!',
        revealImage: false
    }, tempModal = 'reveal-temp-modal', closeIcon = $('<a class="close-reveal-modal">&#215;</a>');

    $('a[data-reveal-id], a[data-reveal-image], a[data-reveal-url]').live('click', function (e) {
        e.preventDefault();
        $(this).blur();

        var modal = $('#' + $(this).data('reveal-id'));

        if ($(this).data('reveal-image') || $(this).data('reveal-url')) {
            modal = $(document.createElement('div')).attr('id', tempModal).appendTo($('body'));
        }

        modal.append(closeIcon).addClass('reveal-modal').reveal($(this).data());
    });

    $.fn.reveal = function (args) {
        if (typeof args === 'object' || !args) {
            return this.each(function () {
                var modal = $(this),
                    topMeasure = parseInt(modal.css('top'), 10),
                    topOffset = modal.height() + topMeasure,
                    locked = false,
                    background = $('<div class="reveal-modal-bg" />').insertAfter(modal),
                    timeout = null,
                    o = $.extend({}, defaults, args);

                function close() {
                    modal.trigger('reveal:close');
                }

                // open
                modal.bind('reveal:open', function () {
                    if (!locked) {
                        locked = true;

                        var animations = { 'opacity': 1 };
                        modal.css({ 'opacity': 0, 'top': $(document).scrollTop() + topMeasure, 'visibility': 'visible' });

                        if (o.animation === 'fadeAndPop') {
                            modal.css('top', $(document).scrollTop() - topMeasure);
                            animations.top = $(document).scrollTop() + topMeasure + 'px';
                        } else if (o.animation === 'fade') {
                            // nothing
                        } else if (o.animation === 'none') {
                            modal.css('opacity', 1);
                            o.animationSpeed = 0;
                        }

                        background.fadeTo(o.animationSpeed, 0.8).fadeIn(o.animationSpeed / 2);
                        modal.delay(o.animationSpeed / 2).animate(animations, o.animationSpeed, function () {
                            if (o.revealImage) {
                                modal.append($('<img src="' + o.revealImage + '" />'));
                            } else if (o.revealUrl) {
                                modal.append($('<p class="reveal-ajax-loader">' + o.revealLoading + '</p>'))
                                     .load(((o.revealUrlId) ? o.revealUrl += ' #' + o.revealUrlId : o.revealUrl), null, function () {
                                         modal.find($('.reveal-ajax-loader')).remove();
                                         modal.append(closeIcon);
                                     });
                            }

                            if (typeof window[o.openedCallback] === 'function') {
                                window[o.openedCallback]();
                            }
                        });

                        if (o.closeOnBackgroundClick) {
                            background.css('cursor', 'pointer').bind('click', close);
                        }

                        if (o.closeOnKey) {
                            $(document).unbind('keyup').keyup(function (e) {
                                if (e.which === o.closeOnKey) {
                                    close();
                                }
                            });
                        }

                        modal.find('.' + o.dismissModalClass).live('click', close);
                    }

                    locked = false;
                    modal.unbind('reveal:open');
                });

                // close
                modal.bind('reveal:close', function () {
                    if (!locked) {
                        locked = true;

                        var animations = { 'opacity': 0 }, css = { 'top': topMeasure, 'visibility': 'hidden' };

                        if (o.animation === 'fadeAndPop') {
                            animations.top = $(document).scrollTop() - topOffset + 'px';
                        } else if (o.animation === 'fade') {
                            // nothing
                        } else if (o.animation === 'none') {
                            o.animationSpeed = 0;
                        }

                        modal.animate(animations, o.animationSpeed, function () {
                            if (o.revealImage || o.revealUrl) {
                                modal.remove();
                            }
                            modal.css(css);
                        });
                        background.delay(o.animationSpeed).fadeOut(o.animationSpeed, function () {
                            if (typeof window[o.closedCallback] === 'function') {
                                window[o.closedCallback]();
                            }
                            background.remove();
                        });
                    }

                    clearTimeout(timeout);
                    locked = false;
                    modal.unbind('reveal:close');
                });

                modal.trigger('reveal:open');

                if (o.closeOnTimeout) {
                    timeout = setTimeout(function () { modal.trigger('reveal:close'); }, o.closeOnTimeout);
                }
            });
        } else if (args === 'close') {
            return this.each(function () {
                $(this).trigger('reveal:close');
            });
        }
    };
})(jQuery);