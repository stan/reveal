<h1>Fork specific features</h1>
<p>Note - stuck with jQuery 1.6.4 and maintained support for the 'old' event bindings. Demo.html contains demos of all the below features.</p>
<ul>
  <li>Can load an image directly into an on-the-fly modal (currently basic, no resizing) <strong>[data-reveal-image]</strong></li>
  <li>Can load content via ajax in to an on-the-fly modal <strong>[revealUrl/data-reveal-url, revealUrlId/data-reveal-url-id, revealLoading/data-reveal-loading]</strong>
    <ul>
      <li>'data-reveal-url' loads the data at the url (data-reveal-id)</li>
      <li>'data-reveal-url-id' loads the data from an element with the specified id at the url (requires data-reveal-url to be defined)</li>
      <li>'data-reveal-loading' is a message displayed to the user while their content is downloading (default - "We're just downloading the content, hang on in there!")</li>
    </ul>
  </li>
  <li>Can close a modal using a function <strong>[$('#myModal').reveal('close');]</strong></li>
  <li>Can specify a callback function that gets executed AFTER the OPEN animation (default NONE) <strong>[openedCallback/data-opened-callback]</strong></li>
  <li>Can specify a callback function that gets executed AFTER the CLOSE animation (default NONE) <strong>[closedCallback/data-closed-callback]</strong></li>
  <li>Can specify a timeout value to close the modal after x milliseconds (default NONE) <strong>[closeOnTimeout/data-close-on-timeout]</strong></li>
  <li>Can specify a custom key to close the modal (default 27 (ESCAPE)) - or set it to FALSE to disable <strong>[closeOnKey/data-close-on-key]</strong></li>
  <li>Optimized animation code - reduced by 10-20 lines</li>
  <li>Cleaned javascript and restructured to make it clearer</li>
  <li>Cleaned css and added 'x' close button hover effect</li>  
</ul>
<p>I won't be updating jQuery to 1.7 using on/off. Using live provides backward compatibility down to jQuery 1.4, and 1.7 feels like an in-the-middle version, containing past and future features. Perhaps when 1.8 or later is released I will branch.</p>
<h1>Reveal: A jQuery Plugin For Modals</h1>
<p>Reveal is a jQuery plugin for dead simple modals that comes with some sexy base CSS and can be implemented programatically or with the new HTML5 custom data attributes (data-attribute).</p><br />
<h3>Download & Documentation </h3>
<p>All of the docs and the download link are on a playground page here: <a href="http://www.zurb.com/playground/reveal-modal-plugin">http://www.zurb.com/playground/reveal-modal-plugin</a></p>

<h3>Issues</h3>
<p>Have an issue - please post it here: <a href="https://github.com/zurb/reveal/issues">https://github.com/zurb/reveal/issues</a></p>

<h3>Comments?</h3>
<p>Visit the blog post for Reveal and make your comment :) <a href="http://www.zurb.com/article/557/reveal-jquery-modal-plugin-">http://www.zurb.com/article/557/reveal-jquery-modal-plugin-</a></p>
