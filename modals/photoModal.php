<div class="modal fade" id="photo-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-xl" role="photo">
    <div class="modal-content">


        <div class="modal-header">
            <div class='photo-modal-user'>
                <a href="profile.php">
                    <img class='profile-pic mr-2' src="images/user.jpg" width='35px'>
                    <span class='mr-4'>@username</span>
                <a>
                <button class='btn btn-pink btn-sm' type='button'>Follow</button>
            </div>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>


        <div class="modal-body">

            <div class='photo-modal-container'>
                <img src="https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260">
            </div>

            <div class='photo-modal-stats container mb-2'>
                <div class='row'>
                    <div class='col-1 p-0'>
                        <button type='button' class='btn pink-hover'>
                            <i class="fa fa-minus" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div class='col'>
                        <div class="progress" style='height: 100%'>
                            <div class="progress-bar custom-progress-bar" role="progressbar" style="width: 84.4%" aria-valuenow="25324" aria-valuemin="0" aria-valuemax="30000">25324/30000 (84,4%) positive votes</div>
                        </div>
                    </div>
                    <div class='col-1 p-0'>
                        <button type='button' class='btn pink-hover ml-auto'>
                            <i class="fa fa-plus" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>

            <ul class="nav nav-pink">
                <li class="nav-item">
                    <a class="nav-link active" href="#">Info</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Comments</a>
                </li>
            </ul>

            <div class='photo-modal-info'>
                <h5>Photo title</h5>
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id tortor eget diam molestie rhoncus. Pellentesque bibendum mauris non arcu venenatis lacinia. Morbi in feugiat erat, ut sodales quam. Phasellus gravida molestie mauris, sed mattis enim. Morbi bibendum arcu ligula, non ullamcorper urna laoreet sit amet. Fusce sem sapien, porttitor convallis neque a, facilisis porta nisl. Maecenas felis odio, pellentesque ut eros id, feugiat scelerisque dui. Sed cursus magna quis lacus viverra dictum.</span>
            </div>

        </div>


    </div>
  </div>
</div>
