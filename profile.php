<!DOCTYPE html>
<html>

<head>

    <?php include 'imports/headImports.php'?>
    <Title>Photo Gallery</Title>
    
</head>

<body>

    <?php include 'modals/photoModal.php'?>

    <div id='navbar-container' class='sticky-top'>
        <!-- navbar -->
    </div>

    <div class='custom-container'>
    
        <div class='profile-container'>

            <div class='profile-pic-container'>
                <img src="images/user.jpg" class='profile-pic' width='150px' height='150px'>
            </div>
            <div class='my-auto'>
                <div class='profile-data-container'>
                    <div class='profile-nf-container d-flex'>
                        <h2 id='profile-name'>Full name</h2>
                        <span id='profile-follow-btn'>
                            <button class='btn btn-pink' type='button'>Follow</button>
                        </span>
                    </div>
                    <h5 id='profile-email'>username@gmail.com</h5>
                    <h5 id='profile-username'>@username</h5>
                </div>
            </div>
        </div>   

        <ul class="nav nav-pink">
            <li id='profile-public-photos-link' class="nav-item">
                <a class="nav-link active pointer" onclick='showPublicPhotos()'>Public photos</a>
            </li>
            <li id='profile-private-photos-link' class="nav-item">
                <a class="nav-link pointer" onclick='showPrivatePhotos()'>Private photos</a>
            </li>
        </ul>

        <div id='profile-public-gal-container' class='py-4'>
            <div id='profile-no-public-photos-info' class='profile-no-photos-info'>No photos found.</div>
            <div id='profile-public-gal' class='gal'>
                <!-- public photos -->
            </div>
        </div>
        <div id='profile-private-gal-container' class='py-4'>
            <div id='profile-no-private-photos-info' class='profile-no-photos-info'>No photos found.</div>
            <div id='profile-private-gal' class='gal'>
                <!-- private photos -->
            </div>
        </div>


    </div>

    <?php include 'imports/bodyImports.php'?>
    <script src='js/profile.js'></script>

</body>

</html>