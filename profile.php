<!DOCTYPE html>
<html>

<head>

    <?php include 'imports/headImports.php'?>
    <Title>Photo Gallery</Title>
    
</head>

<body>

    <?php include 'navbars/navbar.php'?>



        <div class='profile-info'>
            <img src="images/user.jpg" class='profile-pic mr-5' width='150px'>
            <div class='profile-data'>
                <h1>Full Name</h1>
                <h5>@username</h5>
                <h5>username@gmail.com</h5>
            </div>
        </div>   


    <ul class="nav nav-fill pink-profile-nav">
        <li class="nav-item">
            <a class="nav-link active" href="#">Public Photos</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Private Photos</a>
        </li>
    </ul>

    <?php include 'gal/gal.php'?>

    
    

    <?php include 'imports/bodyImports.php'?>

</body>

</html>