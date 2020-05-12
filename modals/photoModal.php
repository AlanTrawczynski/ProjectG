<div class="modal fade" id="photo-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-xl" role="photo">
    <div class="modal-content">


        <div class="modal-header">
            <div class='photo-modal-user'>
                <a class='able-when-logged' href="profile.php">
                    <img class='profile-pic mr-2' src="images/user.jpg" width='35px'>
                    <span id='photo-modal-username' class='mr-4'>@username</span>
                <a>
                <button class='btn btn-pink btn-sm show-when-logged' type='button'>Follow</button>
            </div>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>


        <div class="modal-body">

            <div class='photo-modal-container'>
                <img id='photo-modal-img' src="https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260">
            </div>

            <div class='photo-modal-stats container mb-4'>
                <div class='row'>
                    <div class='col-auto pl-0 show-when-logged'>
                        <button id='photo-modal-negative-vote-btn' type='button' class='btn pink-hover'>
                            <i class="fa fa-minus" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div class='col p-0'>
                        <div class="progress" style='height: 100%'>
                            <div id='photo-modal-votes-bar' class="progress-bar custom-positive-progress-bar" role="progressbar" style="width: 84.4%">25324/30000 (84,4%) positive votes</div>
                        </div>
                    </div>
                    <div class='col-auto pr-0 show-when-logged'>
                        <button id='photo-modal-positive-vote-btn' type='button' class='btn pink-hover ml-auto'>
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
                <h5 id='photo-modal-title'>Photo title</h5>
                <p id='photo-modal-description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id tortor eget diam molestie rhoncus. Pellentesque bibendum mauris non arcu venenatis lacinia. Morbi in feugiat erat, ut sodales quam. Phasellus gravida molestie mauris, sed mattis enim. Morbi bibendum arcu ligula, non ullamcorper urna laoreet sit amet. Fusce sem sapien, porttitor convallis neque a, facilisis porta nisl. Maecenas felis odio, pellentesque ut eros id, feugiat scelerisque dui. Sed cursus magna quis lacus viverra dictum.</p>
                <div id='photoModal-tags-container' class='my-2'></div>
                <div id='photo-modal-votes-info'  class='mt-1'>
                    Total votes: <span id='photo-modal-total-votes' class='mr-3'></span>
                    Positive votes: <span id='photo-modal-positive-votes' class='mr-3'></span>
                    Negative votes: <span id='photo-modal-negative-votes'></span>
                </div>
            </div>

        </div>


    </div>
  </div>
</div>
