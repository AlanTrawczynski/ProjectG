if (isLogged()) {
    $("#navbar-container").load("navbars/navbar.php");

    $.get("modals/uploadPhotoModal.php", function(data){
        $("body").append(data);
    });
} 
else {
    $("#navbar-container").load("navbars/indexNavbar.php");

    $.get("modals/signupModal.php", function(data){
        $("body").append(data);
    });
}