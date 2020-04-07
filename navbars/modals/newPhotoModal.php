<div class="modal fade" id="navbar-new-photo-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
            <form class="needs-validation" novalidate>

                <div class="form-group">
                    <label>Title</label>
                    <input type="text"  class="form-control" required>
                    <div class="invalid-feedback">Please provide a title.</div>
                </div>

                <div class='form-group'>
                    <label>Description</label>
                    <textarea class="form-control" rows="3" maxlength='500'></textarea>
                </div>

                <div class="form-group">
                    <label>Custom URL</label>
                    <input type="text" maxlength='30' class="form-control" placeholder='Default'>
                </div>
                
                <div class="form-group">
                    <label>Tags</label>
                    <input type="text" class="form-control" placeholder='tag1, tag2...'>
                </div>

                <label>Visibility</label>
                <div class="form-group">
                    <div class="form-check form-check-inline ml-1">
                        <input class="form-check-input" type="radio" name="photoVisibility" id="publicVisibility" value="public" checked>
                        <label class="form-check-label" for="publicVisibility">Public</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="photoVisibility" id="privateVisibility" value="private">
                        <label class="form-check-label" for="privateVisibility">Private</label>
                    </div>
                </div>

                <div class="form-group">
                    <label>Choose file</label>
                    <input type="file" class="form-control-file ml-1" required>
                    <div class="invalid-feedback">Please provide a valid file.</div>
                </div>

                <button class="btn btn-pink btn-lg btn-block mt-4" type="submit">Upload photo</button>
            
            </form>

        </div>


    </div>
  </div>
</div>



<!-- Bootstrap validation script -->
<script>
(function() {
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();
</script>