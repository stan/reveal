<h1>Fork specific features</h1>
<p>Note - stuck with jQuery 1.6.4 and maintained support for the 'old' event bindings. Might branch jQuery 1.7 and use on/off.</p>
<ul>
  <li>Can load content via ajax in to a modal [contentUrl/data-content-url]
    <ul>
      <li>'data-content-url' loads the data at the url in to the specified modal (data-reveal-id)</li>
      <li>'data-content-id' loads the data from an element with the specified id at the url (requires data-content-url to be defined)</li>
      <li>Using 'data-content-url' DOES NOT require a modal (data-reveal-id) to be specified - a temporary modal will be created and destroyed on close</li>      
    </ul>
  </li>
  <li>Can close a modal using a function [$('#myModal').reveal('close');]</li>
  <li>Can specify a callback function that gets executed AFTER the OPEN animation (default NONE) [revealedCallback/data-revealed-callback]</li>
  <li>Can specify a callback function that gets executed AFTER the CLOSE animation (default NONE) [dismissCallback/data-dismiss-callback]</li>
  <li>Can specify a timeout value to close the modal after x milliseconds (default NONE) [closeOnTimeout/data-close-on-timeout]</li>
  <li>Can specify a custom key to close the modal (default ESCAPE) - or set it to FALSE to disable [closeOnKey/data-close-on-key]</li>
  <li>Optimized animation code - reduced by 10-20 lines</li>
  <li>Cleaned javascript and restructured to make it clearer</li>
  <li>Cleaned css and added 'x' close button hover effect</li>  
</ul>

<h1>Reveal: A jQuery Plugin For Modals</h1>
<p>Reveal is a jQuery plugin for dead simple modals that comes with some sexy base CSS and can be implemented programatically or with the new HTML5 custom data attributes (data-attribute).</p><br />
<h3>Download & Documentation </h3>
<p>All of the docs and the download link are on a playground page here: <a href="http://www.zurb.com/playground/reveal-modal-plugin">http://www.zurb.com/playground/reveal-modal-plugin</a></p>

<h3>Issues</h3>
<p>Have an issue - please post it here: <a href="https://github.com/zurb/reveal/issues">https://github.com/zurb/reveal/issues</a></p>

<h3>Comments?</h3>
<p>Visit the blog post for Reveal and make your comment :) <a href="http://www.zurb.com/article/557/reveal-jquery-modal-plugin-">http://www.zurb.com/article/557/reveal-jquery-modal-plugin-</a></p>
