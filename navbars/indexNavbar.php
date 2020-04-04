<?php include 'signUpModal.php' ?>

<nav class='navbar sticky-top navbar-expand-md navbar-dark bg-dark'>
    
    <a class='navbar-brand' href="index.php">
        <img class='navbar-image' src="images/logo.png" alt="Logo" width='40px'>
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <form class="form-inline ml-auto">
            <input class="form-control mr-2" type="email" placeholder="email" aria-label="email">
            <input class="form-control mr-2" type="password" placeholder="password" aria-label="password">
            <button class="btn btn-light mr-4" id='navbar-login-button' type="submit">Log In</button>
            <button class="btn btn-outline-light" id='navbar-signup-button' type="button" data-toggle="modal" data-target="#navbar-signup-modal">Sign Up</button>
        </form>

    </div>

</nav>