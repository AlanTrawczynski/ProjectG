<!DOCTYPE html>
<html>

<head>

    <?php include 'imports/headImports.php'?>
    <Title>Photo Gallery</Title>
    
</head>

<body>

    <?php include 'navbars/indexNavbar.php'?>
    <?php include 'modals/photoModal.php'?>
    
    <div class='custom-container py-4'>
        <div id='index-gal' class='gal'>
            <!-- photos -->
        </div>
    </div>   

    <?php include 'imports/bodyImports.php'?>
    <?php include 'footer.php'?>

    <script src='js/photoModal.js'></script>
    <script src='js/gal.js'></script>

</body>

</html>