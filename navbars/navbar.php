<nav id='navbar' class='navbar sticky-top navbar-expand-md navbar-dark bg-dark'>
    
    <a class='navbar-brand' href="index.php">
        <img src="images/logo.png" alt="Logo" width='40px'>
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <div class="navbar-nav mt-3 mt-md-0">
            <a id='navbar-home' class="nav-item nav-link" href="index.php">Home</a>
            <a id='navbar-following' class="nav-item nav-link" href="following.php">Following</a>
            <a id='navbar-trending' class="nav-item nav-link" href="trending.php">Trending</a>
            <a id='navbar-profile' class="nav-item nav-link" href="profile.php">@username</a>
        </div>
        
        <form id='navbar-search-bar' class="form mx-auto mt-3 mt-md-0">
            <div class="input-group">
                <input id='navbar-search-bar-input' type="text" class="form-control" placeholder="Search photos by tag" autocomplete="off">
                <div class="input-group-append">
                    <button id='navbar-search-btn' class="btn pink-hover btn-default" type="submit">
                        <span class="fa fa-search" aria-hidden="true"></span>
                    </button>
                </div>
            </div>
        </form>

        <button type="button" class="btn btn-light collapse-ico-btn pink-hover mr-auto" title="upload photo" data-toggle="modal" data-target="#newPhoto-modal">
            <span class="fa fa-plus-square"></span>
        </button>
        <button type="button" class="btn btn-block btn-light pink-hover collapse-text-btn mt-3 mb-2" data-toggle="modal" data-target="#newPhoto-modal">Upload photo</button>

        <button type="button" onclick="logout()" class="btn btn-light collapse-ico-btn pink-hover" title="logout">
            <span class="fa fa-sign-out" aria-hidden="true"></span>
        </button>
        <button type="button" onclick="logout()" class="btn btn-block btn-light collapse-text-btn pink-hover mt-3 mb-2" data-toggle="modal" data-target="#newPhoto-modal">Logout</button>

    </div>

</nav>