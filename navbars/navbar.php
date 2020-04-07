<?php include 'modals/newPhotoModal.php' ?>

<nav class='navbar sticky-top navbar-expand-md navbar-dark bg-dark'>
    
    <a class='navbar-brand' href="index.php">
        <img src="images/logo.png" alt="Logo" width='40px'>
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <div class="navbar-nav mr-auto">
            <a class="nav-item nav-link active" href="index.php">Global Timeline</a>
            <a class="nav-item nav-link" href="#">My Timeline</a>
            <a class="nav-item nav-link" href="#">Trending</a>
        </div>
        
        <form class="form-inline ml-auto mr-4 mb-2 mb-md-0">
            <input id='navbar-search-bar' class="form-control mr-2" type="search" placeholder="Search" aria-label="Search">
            <button type="submit" class="btn btn-light">
                <span class="fa fa-search" aria-hidden="true"></span>
            </button>
        </form>

        <span class='mr-auto ml-auto'>
            <button type="button" class="btn btn-light mr-auto ml-auto" data-toggle="modal" data-target="#navbar-new-photo-modal">
                <span class="fa fa-plus-square"></span>
            </button>
        </span>
        
        <a class='ml-4' href="#" >
            <img class='profile-pic' src="images/user.jpg" alt="Profile picture" title='Profile' width='40px'>
        </a>

    </div>

</nav>