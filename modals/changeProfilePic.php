<div class="modal fade" id="changeProfilePic-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-md" role="form">
    <div class="modal-content">


      <div class="modal-header">
        <h5 class="modal-title">Change profile picture</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>


      <div class="modal-body">
        <!-- Edit tag form -->
        <form id="changeProfilePic-form" novalidate>

            <div class='profile-pic-container mx-auto mb-4'>
                <img id='changeProfilePic-preview' src="images/user.jpg" class='profile-pic' width='150px' height='150px'>
            </div>

            <div class="form-group">
                <label>Profile picture URL</label>
                <input id='changeProfilePic-url' type="text" autocomplete="off" pattern='(https?:\/\/.*\.(?:png|jpeg|jpg))' class="form-control" required>
                <div class="invalid-feedback">Please provide a valid url.</div>
                <small id='changeProfilePic-loading' class="form-text text-muted" style='display: none'>Loading...</small>
            </div>

            <div class="mt-2">
                <div id="changeProfilePic-error" onclick="$(this).hide()" class="invalid-feedback pointer not-small-feedback"></div>
                <button id="changeProfilePic-submit-btn" class="btn btn-pink btn-lg btn-block mt-2" type="submit" disabled>Save changes</button>
            </div>

        </form>
      </div>


    </div>
  </div>
</div>