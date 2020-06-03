<!DOCTYPE html>
<html>

<head>

    <?php include 'imports/headImports.php'?>
    <Title>Photo Gallery</Title>
    
</head>

<body>

    <?php include 'modals/photoModal.php'?>
    <?php include 'modals/changeProfilePic.php'?>

    <div id='navbar-container' class='sticky-top'>
        <!-- navbar -->
    </div>

    <div class='custom-container'>
    
        <div class='profile-container'>

            <div class='profile-pic-container'>
                <a id='profile-avatar-link' href="#changeProfilePic-modal" data-toggle="modal">
                    <img id='profile-avatar' src="images/user.jpg" class='profile-pic' width='150px' height='150px'>
                </a>
            </div>
            <div class='my-auto'>
                <div class='profile-data-container'>
                    <div class='profile-nf-container d-flex'>
                        <h2 id='profile-name'>Full name</h2>
                        <span>
                            <button id='profile-follow-btn' class='btn btn-sm btn-pink' type='button' style='display: none' onmouseover='toggleFollowBtnText($(this), event)' onmouseout='toggleFollowBtnText($(this), event)'>Follow</button>
                        </span>
                    </div>
                    <div class='d-flex align-items-center mb-2'>
                        <i class="fa fa-envelope-o mr-2 profile-data-ico" aria-hidden="true"></i>
                        <h5 id='profile-email' class='mb-0 profile-data-text'>username@gmail.com</h5>
                    </div>
                    <div class='d-flex align-items-center mb-2'>
                        <i class="fa fa-user-o mr-2 profile-data-ico" aria-hidden="true"></i>
                        <h5 id='profile-username' class='mb-0 profile-data-text'>username</h5>
                    </div>
                </div>
            </div>
        </div>   

        <ul class="nav nav-pink">
            <li id='profile-public-photos-link' class="nav-item">
                <a class="nav-link active pointer" onclick='showPublicPhotos()'>Public photos</a>
            </li>
            <li id='profile-private-photos-link' class="nav-item" style='display: none'>
                <a class="nav-link pointer" onclick='showPrivatePhotos()'>Private photos</a>
            </li>
        </ul>

        <div id='profile-public-gal-container' class='py-4'>
            <div id='profile-no-public-photos-info' class='profile-no-photos' style='display: none'>No photos found.</div>
            <div id='profile-public-gal' class='gal'>
                <!-- public photos -->
            </div>
        </div>
        <div id='profile-private-gal-container' class='py-4'>
            <div id='profile-no-private-photos-info' class='profile-no-photos' style='display: none'>No photos found.</div>
            <div id='profile-private-gal' class='gal'>
                <!-- private photos -->
            </div>
        </div>


    </div>

    <?php include 'footer.php'?>

    <?php include 'imports/bodyImports.php'?>
    <script src='js/profile.js'></script>

</body>

</html>