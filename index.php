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
        <div id='index-gal' class='gal'>
            <!-- photos -->
        </div>
    </div>

    <hr>

    <nav id='index-pagination' class='nav-pink pink-pagination'>
        <ul class="pagination justify-content-center my-4">
            <li id="index-previous-page-ico" class="page-item">
                <a class="page-link" href='#'>
                    <i class="fa fa-angle-left"></i>
                </a>
            </li>
            <li id="index-previous-page" class="page-item">
                <a class="page-link href='#"></a>
            </li>
            <li id="index-current-page" class="page-item active">
                <a class="page-link href='#"></a>
            </li>
            <li id="index-next-page" class="page-item">
                <a class="page-link href='#"></a>
            </li>
            <li id="index-next-page-ico" class="page-item">
                <a class="page-link href='#">
                    <i class="fa fa-angle-right"></i>
                </a>
            </li>
        </ul>
    </nav>

    <?php include 'imports/bodyImports.php'?>
    <script src='js/index.js'></script>

</body>

</html>