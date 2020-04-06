<?php include 'signUpModal.php' ?>

<nav class='navbar sticky-top navbar-expand-md navbar-dark bg-dark'>
    
    <a class='navbar-brand' href="index.php">
        <img src="images/logo.png" alt="Logo" width='40px'>
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <form class="form-inline ml-auto mb-md-0 mb-2">
            <input class="form-control mr-2 mt-3 mt-md-0" type="email" placeholder="Email" aria-label="email">
            <input class="form-control mr-2 mt-3 mt-md-0" type="password" placeholder="Password" aria-label="password">
            <button class="btn btn-pink mr-4 mt-3 mt-md-0" id='navbar-login-button' type="submit">Log In</button>
            <button class="btn btn-outline-pink mt-3 mt-md-0" id='navbar-signup-button' type="button" data-toggle="modal" data-target="#navbar-signup-modal">Sign Up</button>
        </form>

    </div>

</nav>