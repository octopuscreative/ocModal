# set up
initializeModals = ->
  $('body').append('<div id="modal-bg" class="hidden"></div>')

  $('#modal-bg').on 'click', ->
    # hide modals when #modal-bg is clicked, unless they're "really" modal
    # (aka must be closed programmatically or with a close button)
    $('.modal').trigger('close') unless $('.modal.really:not(.hidden)').length

# the actual modal class
class Modal
  constructor: (@el, reallyModal = false, @onOpen, @onClose) ->
    initializeModals() unless $('#modal-bg').length

    # make sure @el is a jQuery object
    @el = $(@el)

    @bg = $('#modal-bg')
    @el.addClass('modal hidden')

    @el.addClass('really') if reallyModal

    @el.append('<div class="spacer"></div>')

    @el.on 'open', @opener
    @el.on 'close', @closer

    @close = @el.find '.close'
    if @close.length
      @close.on 'click', (e) =>
        e.preventDefault()
        @closer()

  opener: =>
    $('.modal:not(.hidden)').toggleClass 'hidden'

    @bg.removeClass('hidden')
    @el.removeClass('hidden').css
      marginTop: window.scrollY

    # Hide any popovers that may be open
    $('.popover:not(hidden)').addClass 'hidden'

    @onOpen?()

  closer: =>
    @el.addClass('hidden')
    @bg.addClass('hidden')

    @onClose?()

window.oc ||= {}
window.oc.Modal = Modal
