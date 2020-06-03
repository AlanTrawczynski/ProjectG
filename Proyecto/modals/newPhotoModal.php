<div class="modal fade" id="newPhoto-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-md" role="form">
    <div class="modal-content">


        <div class="modal-header">
          <h5 class="modal-title">Upload photo</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
          </button>
        </div>


        <div class="modal-body container">

            <!-- New photo Form -->
            <form id="newPhoto-form" novalidate>

                <div class="form-group">
                    <label>Title</label>
                    <input id='newPhoto-title' type="text" autocomplete="off" class="form-control">
                </div>

                <div class='form-group'>
                    <label>Description</label>
                    <textarea id='newPhoto-description' autocomplete="off" class="form-control" rows="3" maxlength='1000'></textarea>
                </div>

                <div class="form-group">
                    <label>URL<span class='required-input ml-1'>*</span></label>
                    <input id='newPhoto-url' type="text" autocomplete="off" pattern='(https?:\/\/.*\.(?:png|jpeg|jpg))' class="form-control" required>
                    <div class="invalid-feedback">Please provide a valid url.</div>
                </div>
                
                <div class="form-group mb-0">
                    <label>Tags</label>
                    <input id='newPhoto-tags-input' type="text" autocomplete="off" class="form-control">
                    <small class="form-text text-muted">Write a tag and press space to add it.</small>
                </div>
                <div id='newPhoto-tags-container' class="mt-1"></div>

                <label class='mt-2'>Visibility<span class='required-input ml-1'>*</span></label>
                <div id='newPhoto-visibility' class="form-group">
                    <div class="form-check form-check-inline ml-1">
                        <input class="form-check-input" type="radio" name="photoVisibility" value="public" checked>
                        <label class="form-check-label" for="publicVisibility">Public</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="photoVisibility" value="private">
                        <label class="form-check-label" for="privateVisibility">Private</label>
                    </div>
                </div>

                <div id="newPhoto-error" onclick="$(this).hide()" class="invalid-feedback pointer not-small-feedback"></div>
                <button class="btn btn-pink btn-lg btn-block mt-4" type="submit">Upload photo</button>
            
            </form>

        </div>


    </div>
  </div>
</div>