# ocModal

Nicer description coming soon(ish), probably. You can [download ocModal here](https://github.com/octopuscreative/ocModal/releases/latest). jQuery is required, but just about any version should do the trick; it's not using it for anything super fancy.


## Example

``` html
<div class="modal hidden" id="demo-modal">
	<p>This is a simple modal with just a paragraph and close button in it.</p>
	<button class="close">Close</button>
</div>
```

``` javascript
var demoModal = $('demo-modal');

new window.oc.Modal(demoModal);

// Tell the modal to open
demoModal.trigger('open');

// Later…
demoModal.trigger('close');
```


## Usage

To use ocModal, just run `new window.oc.Modal(yourModalHtmlElement);`. Once you've initialized your modal, you can tell it to open by triggering the `open` event on the element: `yourModalHtmlElement.trigger('open');`. By default, instances of ocModal will automatically close if you click off of them, but you can disable this behavior by passing a second `reallyModal` parameter: `new window.oc.Mocal(yourModalHtmlElement, true);`.

Even though ocModal will add the default `.modal.hidden` classes to the element you pass it, it's highly recommended that you also write them in your HTML to prevent FOUC.

If you need to trigger custom behavior when your modal is opened or closed, you can pass the third and fourth `onOpen` and `onClose` arguments, which are functions. If you're using Coffeescript, it might be easier (and cleaner-looking) to subclass ocModal instead, please read the "On Subclassing" section below.

``` javascript
new window.oc.Modal(yourModalHtmlElement, false, function() {
	// this will run when the modal is opened
}, function() {
	// this will run when the modal is closed
});
```


### On Subclassing

If you're using Coffeescript, it can be highly useful to subclass ocModal to provide custom behavior. This way you can have your custom `onOpen` and `onClose` behavior defined in one place, and add other functionality as needed. Here's an example subclass to give you some ideas:

``` coffeescript
class CustomModal extends window.oc.Modal
  constructor: (@el, reallyModal = false, @onOpen, @onClose, extraStuff)->
    unless extraStuff?
      throw new Error('CustomModal requires `extraStuff`')
      return

    @el.find('.some-element').text extraStuff
    @el.find('form').on 'submit', @handleSubmit

    super

  handleSubmit: (e) =>
    e.preventDefault()

    # do custom things with the form (validation or whatever else)

  opener: =>
    console.log('This is a CustomModal being opened')

    super

  closer: =>
    console.log('This is a CustomModal being closed')

    super

# now we can call `CustomModal` like normal
customModalElement = $('#some-modal')
new CustomModal(customModalElement, false, null, null, 'hello world')
```


## Meta Stuff

ocModal was created by [Paul Straw](https://github.com/paulstraw) for [Octopus Creative](http://octopuscreative.com). It's MIT-licensed (see the [license file](https://github.com/octopuscreative/ocModal/blob/master/LICENSE) for more info). Any contribution is absolutely welcome, but please review the [contribution guidelines](https://github.com/octopuscreative/ocModal/blob/master/CONTRIBUTING.md) before getting started.