<div class="modal fade" id="signup-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" role="form">
    <div class="modal-content">


      <div class="modal-header">
        <h5 class="modal-title">Sign Up</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>


      <div class="modal-body">
        <!-- Sign up Form -->
        <form id="signup-form" class="needs-validation" novalidate>

          <div class="form-row">
            <div class="form-group col-md">
              <label>First name</label>
              <input id="signup-firstName" type="text" minlength="3" maxlength="25" class="form-control" required>
              <div class="invalid-feedback">First name must contain at least 3 characters.</div>
            </div>
            <div class="form-group col-md">
              <label>Last name</label>
              <input id="signup-lastName" type="text" minlength="3" maxlength="40" class="form-control" required>
              <div class="invalid-feedback">Last name must contain at least 3 characters.</div>
            </div>
          </div>

          <div class='form-row'>
            <div class="form-group col-md">
              <label>Email</label>
              <input id="signup-email" type="email" class="form-control" required>
              <div class="invalid-feedback">Email must contain "@".</div>
            </div>
            <div class="form-group col-md">
              <label>Username</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">@</span>
                </div>
                <input id="signup-username" type="text" minlength="5" maxlength="15" class="form-control" aria-describedby="inputGroupPrepend" required>
                <div class="invalid-feedback">Username must contain at least 5 characters.</div>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-md">
              <label>Password</label>
              <input id="signup-password" type="password" minlength="5" maxlength="25" class="form-control" required>
              <div class="invalid-feedback">Password must contain at least 5 characters.</div>
            </div>
            <div class="form-group col-md">
              <label>Phone Number</label>
              <input id="signup-phoneNum" type="tel" pattern="^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$" class="form-control" required>
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