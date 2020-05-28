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
    
    <div class='custom-container py-4'>

        <!-- top users -->
        <div id="trending-top-users-slider" class="carousel slide" data-ride="carousel">
            <ol id='trending-top-users-carousel-indicators' class="carousel-indicators">
                <li data-target="#trending-top-users-slider" data-slide-to="0" class="active"></li>
                <li data-target="#trending-top-users-slider" data-slide-to="1"></li>
                <li data-target="#trending-top-users-slider" data-slide-to="2"></li>
                <li data-target="#trending-top-users-slider" data-slide-to="3"></li>
                <li data-target="#trending-top-users-slider" data-slide-to="4"></li>
                <li data-target="#trending-top-users-slider" data-slide-to="5"></li>
                <li data-target="#trending-top-users-slider" data-slide-to="6"></li>
                <li data-target="#trending-top-users-slider" data-slide-to="7"></li>
                <li data-target="#trending-top-users-slider" data-slide-to="8"></li>
                <li data-target="#trending-top-users-slider" data-slide-to="9"></li>
            </ol>
            <div id='trending-top-users-carousel-inner' class="carousel-inner">
                <!-- inners -->
            </div>
            <a class="carousel-control-prev" href="#trending-top-users-slider" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#trending-top-users-slider" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>

        <!-- top photos -->
        <div id='trending-gal' class='gal mt-4'>
            <!-- photos -->
        </div>
    </div>   

    <?php include 'imports/bodyImports.php'?>
    <script src='js/trending.js'></script>

</body>

</html>