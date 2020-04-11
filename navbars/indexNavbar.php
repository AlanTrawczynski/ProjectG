<?php include 'modals/signUpModal.php'?>

<nav class='navbar sticky-top navbar-expand-md navbar-dark bg-dark'>
    
    <a class='navbar-brand' href="home.php">
        <img src="images/logo.png" alt="Logo" width='40px'>
    </a>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        
        <form id='indexNavbar-login-form' class="form-inline ml-auto">
            <input class="form-control mr-md-2 mt-3 mt-md-0" type="email" placeholder="Email" aria-label="email">
            <input class="form-control mr-md-2 mt-3 mt-md-0" type="password" placeholder="Password" aria-label="password">
            <button class="btn btn-pink mr-md-4 mt-3 mt-md-0" type="submit">Log In</button>
        </form>

        <button id='indexNavbar-signup-btn' class="btn btn-outline-pink mt-3 mt-md-0 mb-md-0 mb-2" type="button" data-toggle="modal" data-target="#navbar-signup-modal">Sign Up</button>

    </div>

</nav>