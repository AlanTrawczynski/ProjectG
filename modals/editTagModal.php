<div class="modal fade" id="editTags-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-md" role="form">
    <div class="modal-content">


      <div class="modal-header">
        <h5 class="modal-title">Edit Tags</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>


      <div class="modal-body">
        <!-- Edit tag form -->
        <form id="editTag-form" novalidate>

            <div class="form-group">
                <label>Tag to be changed</label>
                <input id="editTag-oldTagName" type="text" class="form-control" required>
                <div class="invalid-feedback">Please provide a valid tag name.</div>
            </div>

            <div class="form-group">
                <label>New tag name</label>
                <input id="editTag-newTagName" type="text" class="form-control" required>
                <div class="invalid-feedback">Please provide a valid tag name.</div>
            </div>

            <div class="mt-2">
                <div id="editTag-error" onclick="$(this).hide()" class="invalid-feedback pointer not-small-feedback"></div>
                <div id="editTag-success" onclick="$(this).hide()" class="valid-feedback pointer not-small-feedback"></div>
                <button class="btn btn-pink btn-lg btn-block mt-2" type="submit">Save changes</button>
            </div>

        </form>
      </div>


    </div>
  </div>
</div>