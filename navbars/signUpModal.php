<div class="modal fade" id="navbar-signup-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" role="form">
    <div class="modal-content">


      <div class="modal-header">
        <h5 class="modal-title">Sign Up</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>


      <div class="modal-body">
        <!-- SignUp Form -->
        <form class="needs-validation" novalidate>

          <div class="form-row">
            <div class="col-md mb-3">
              <label>First name</label>
              <input type="text" class="form-control" required>
              <div class="invalid-feedback">Please provide a first name.</div>
            </div>
            <div class="col-md mb-3">
              <label>Last name</label>
              <input type="text" class="form-control" required>
              <div class="invalid-feedback">Please provide a last name.</div>
            </div>
          </div>

          <div class='form-row'>
            <div class="col-md mb-3">
              <label>Email</label>
              <input type="email" class="form-control" required>
              <div class="invalid-feedback">Please provide a valid email.</div>
            </div>
            <div class="col-md mb-3">
              <label>Username</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">@</span>
                </div>
                <input type="text" class="form-control" aria-describedby="inputGroupPrepend" required>
                <div class="invalid-feedback">
                  Please choose a username.
                </div>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="col-md mb-3">
              <label>Password</label>
              <input type="password" class="form-control" required>
              <div class="invalid-feedback">Please provide a password.</div>
            </div>
            <div class="col-md mb-3">
              <label>Phone Number</label>
              <input type="tel" pattern="[0-9]{9}" class="form-control" required>
              <div class="invalid-feedback">Please provide a valid phone number.</div>
            </div>
          </div>

          <div class="form-row mt-2">
            <div class="col-md">
              <button class="btn btn-pink btn-lg btn-block" type="submit">Sign Up</button>
            </div>
          </div>

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