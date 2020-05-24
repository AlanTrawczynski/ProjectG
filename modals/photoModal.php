<div class="modal fade" id="photo-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-xl" role="photo">
    <div class="modal-content">


        <div class="modal-header">
            <div class='photo-modal-user'>
                <a id='photo-modal-profile-href' href="profile.php">
                    <img class='profile-pic mr-2' src="images/user.jpg" width='35px'>
                    <span id='photo-modal-username' class='mr-4'>@username</span>
                <a>
                <button class='btn btn-pink btn-sm photo-modal-show-when-logged' type='button'>Follow</button>
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
                    <span id='photo-modal-photo-id' hidden></span>
                    <div class='col-auto pl-0 photo-modal-show-when-logged'>
                        <button id='photo-modal-negative-vote-btn' type='button' class='btn pink-hover' onclick='downvote($(this).parent().parent().find("#photo-modal-photo-id").text())'>
                            <i class="fa fa-minus" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div class='col p-0'>
                        <div class="progress" style='height: 100%'>
                            <div id='photo-modal-votes-bar' class="progress-bar custom-positive-progress-bar" role="progressbar" style="width: 84.4%">25324/30000 (84,4%) positive votes</div>
                        </div>
                    </div>
                    <div class='col-auto pr-0 photo-modal-show-when-logged'>
                        <button id='photo-modal-positive-vote-btn' type='button' class='btn pink-hover ml-auto' onclick='upvote($(this).parent().parent().find("#photo-modal-photo-id").text())'>
                            <i class="fa fa-plus" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>


            <ul class="nav nav-pink">
                <li id='photo-modal-info-link' class="nav-item">
                    <a class="nav-link active pointer" onclick='switchPhotoModalTo(0)'>Info</a>
                </li>
                <li id='photo-modal-comments-link' class="nav-item">
                    <a class="nav-link pointer" onclick='switchPhotoModalTo(1)'>Comments</a>
                </li>
                <li id='photo-modal-edit-link' class="nav-item">
                    <a class="nav-link pointer" onclick='switchPhotoModalTo(2)'>Edit photo</a>
                </li>
            </ul>


            <div id='photo-modal-info' class='photo-modal-area'>
                <!-- info -->
                <h5 id='photo-modal-title'>Photo title</h5>
                <p id='photo-modal-description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id tortor eget diam molestie rhoncus. Pellentesque bibendum mauris non arcu venenatis lacinia. Morbi in feugiat erat, ut sodales quam. Phasellus gravida molestie mauris, sed mattis enim. Morbi bibendum arcu ligula, non ullamcorper urna laoreet sit amet. Fusce sem sapien, porttitor convallis neque a, facilisis porta nisl. Maecenas felis odio, pellentesque ut eros id, feugiat scelerisque dui. Sed cursus magna quis lacus viverra dictum.</p>
                <div id='photoModal-tags-container' class='my-2'></div>
                <div id='photo-modal-votes-and-date'  class='mt-1 d-sm-flex'>
                    <div>
                        Total votes: <span id='photo-modal-total-votes' class='mr-3'></span>
                        Positive votes: <span id='photo-modal-positive-votes' class='mr-3'></span>
                        Negative votes: <span id='photo-modal-negative-votes'></span>
                    </div>
                    <span id='photo-modal-date' class='ml-auto'></span>
                </div>
            </div>


            <div id='photo-modal-comments' class='photo-modal-area'>
                <!-- comment form -->
                <form id="photo-modal-comment-form" class='text-right mb-3' onsubmit='postComment(event)' novalidate>
                    <textarea id='photo-modal-comment-input' placeholder='Add new comment' autocomplete="off" class="form-control" rows="2" maxlength='500'></textarea>
                    <button class="btn btn-sm btn-pink mt-2" type="submit">Comment</button>
                </form>

                <div id='photo-modal-no-comments' class='photo-modal-no-comments'>No comments found.</div>
                <ul id='photo-modal-comments-container' class="list-unstyled">
                    <!-- comments -->
                </ul>

                <button id='photo-modal-load-more-btn' class="btn btn-pink btn-block" type="button" onclick='loadMoreComments()'>Load more comments</button>
            </div>


            <div id='photo-modal-edit' class='photo-modal-area'>
                <!-- edit form -->
                <form id="photo-modal-edit-form" novalidate>

                    <div class="form-row">
                        <div class="form-group col-lg-5">
                            <label>Title</label>
                            <input id='photo-modal-edit-title' type="text" autocomplete="off" class="form-control">
                        </div>
                        <div class="form-group col-lg">
                            <label style='max-height: 24px'>URL<span class='required-input ml-1'>*</span></label>
                            <input id='photo-modal-edit-url' type="text" autocomplete="off" pattern='(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png)' class="form-control" required>
                            <div class="invalid-feedback">Please provide a valid url.</div>
                        </div>
                    </div>

                    <div class='form-group'>
                        <label>Description</label>
                        <textarea id='photo-modal-edit-description' autocomplete="off" class="form-control" rows="3" maxlength='1000'></textarea>
                    </div>

                    <div class="form-group mb-0">
                        <label>Tags</label>
                        <input id='photo-modal-edit-tags-input' type="text" autocomplete="off" class="form-control">
                        <small class="form-text text-muted">Write a tag and press space to add it.</small>
                    </div>
                    <div id='photo-modal-edit-tags-container' class="mt-1"></div>

                    <label class='mt-2'>Visibility<span class='required-input ml-1'>*</span></label>
                    <div id='photo-modal-edit-visibility' class="form-group">
                        <div class="form-check form-check-inline ml-1">
                            <input id='photo-modal-edit-public' class="form-check-input" type="radio" name="photoVisibility" value="public">
                            <label class="form-check-label" for="publicVisibility">Public</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input id='photo-modal-edit-private' class="form-check-input" type="radio" name="photoVisibility" value="private">
                            <label class="form-check-label" for="privateVisibility">Private</label>
                        </div>
                    </div>

                    <div id="photo-modal-edit-error" onclick="$(this).hide()" class="invalid-feedback pointer not-small-feedback"></div>
                    <div class='d-flex'>
                        <button id='photo-modal-delete-photo-btn' class="btn btn-grey btn-block pink-hover mr-2" type="button">Delete Photo</button>
                        <button class="btn btn-pink btn-block ml-2 mt-0" type="submit">Save changes</button>
                    </div>
            
                </form>
            </div>

        </div>


    </div>
  </div>
</div>
