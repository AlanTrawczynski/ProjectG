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
        <div id='search-results' class="search-info pb-3">
            <!-- search results -->
        </div>
        <div id='search-gal' class='gal'>
            <!-- photos -->
        </div>
    </div>

    <?php include 'imports/bodyImports.php'?>
    <script src='js/search.js'></script>

</body>

</html>