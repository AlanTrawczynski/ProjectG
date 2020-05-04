<!DOCTYPE html>
<html>

<head>

    <?php include 'imports/headImports.php'?>
    <Title>Photo Gallery</Title>
    
</head>

<body>

    <?php include 'navbars/navbar.php'?>
    
    <div class='custom-container py-4'>

        <ul class="nav nav-pink">
            <li class="nav-item">
                <a class="nav-link active" href="#">Trending users</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Trending photos</a>
            </li>
        </ul>


        <div class='container-fluid trending-top-users'>
            
            <div class='row'>
                <div class='col-md-auto my-auto text-center'>
                    <img src="images/user.jpg" class='profile-pic' width='150px'>
                </div>
                <div class='col container'>
                    <div class="row h-75">
                        <div class="col">
                            <div class='d-flex'>
                                <h3>Full name</h3>
                                <span class='ml-auto'>
                                    <button class='btn btn-pink' type='button'>Follow</button>
                                </span>
                            </div>
                            <h5>@username</h5>
                        </div>
                    </div>
                    <div class="row h-25">
                        <div class="col">
                            <div class="progress" style='height: 100%'>
                                <div class="progress-bar custom-progress-bar" style='width: 100%' role="progressbar" aria-valuenow="528704" aria-valuemin="0" aria-valuemax="528704">528704 followers</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class='row'>
                <div class='col-md-auto my-auto text-center'>
                    <img src="images/user.jpg" class='profile-pic' width='150px'>
                </div>
                <div class='col container'>
                    <div class="row h-75">
                        <div class="col">
                            ...
                        </div>
                    </div>
                    <div class="row h-25">
                        <div class="col">
                            <div class="progress" style='height: 100%'>
                                <div class="progress-bar custom-progress-bar" style='width: 91%' role="progressbar" aria-valuenow="481293" aria-valuemin="0" aria-valuemax="528704">481293 followers</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class='row'>
                <div class='col-md-auto my-auto text-center'>
                    <img src="images/user.jpg" class='profile-pic' width='150px'>
                </div>
                <div class='col container'>
                    <div class="row h-75">
                        <div class="col">
                            ...
                        </div>
                    </div>
                    <div class="row h-25">
                        <div class="col">
                            <div class="progress" style='height: 100%'>
                                <div class="progress-bar custom-progress-bar" style='width: 49%' role="progressbar" aria-valuenow="259064" aria-valuemin="0" aria-valuemax="528704">259064 followers</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class='row'>
                <div class='col text-center' style='font-size: 500%'>
                    ...
                </div>
            </div>
        
        </div>

    </div>   

    <?php include 'imports/bodyImports.php'?>

</body>

</html>