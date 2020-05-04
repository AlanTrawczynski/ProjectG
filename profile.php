<!DOCTYPE html>
<html>

<head>

    <?php include 'imports/headImports.php'?>
    <Title>Photo Gallery</Title>
    
</head>

<body>

    <?php include 'navbars/navbar.php'?>

    <div class='custom-container'>

    
        <div class='profile-container'>

            <div class='profile-pic-container'>
                <img src="images/user.jpg" class='profile-pic' width='100%'>
            </div>

            <div class='profile-data-container'>
                <div class='profile-nf-container d-flex'>
                    <h1>Full name</h1>
                    <span id='profile-follow-btn'>
                        <button class='btn btn-pink' type='button'>Follow</button>
                    </span>
                </div>
                <h5>username@gmail.com</h5>
                <h5>@username</h5>
            </div>
            
        </div>   

        <ul class="nav nav-pink">
            <li class="nav-item">
                <a class="nav-link active" href="#">Public photos</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Private photos</a>
            </li>
        </ul>

        <div class='py-4'>
            <?php include 'gal/gal.php'?>
        </div>

    </div>

    <?php include 'imports/bodyImports.php'?>

</body>

</html>