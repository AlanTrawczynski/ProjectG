<div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-md" role="form">
    <div class="modal-content">

        <div class="modal-header">
            <h5 class="modal-title">Log In</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>

        <div class="modal-body">
            <!-- Log in Form -->
            <form id="login-form" novalidate>

                <label>Email</label>
                <input id="login-email" type="email" class="form-control mb-3" required>

                <label>Password</label>
                <input id="login-password" type="password" minlength="5" maxlength="25" class="form-control mb-4" required>

                <div id="login-input-error" onclick="$(this).hide()" class="invalid-feedback pointer not-small-feedback">Incorrect email or password.</div>
                <div id="login-error" onclick="$(this).hide()" class="invalid-feedback pointer not-small-feedback">An error occurred. Please try again.</div>
                <button class="btn btn-pink btn-lg btn-block mt-2" type="submit">Log In</button>
                
            </form>
        </div>


    </div>
  </div>
</div>