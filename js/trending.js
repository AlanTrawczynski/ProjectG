$(function () {
    // Trending photos
    axios.get(`http://localhost:3000/votes`)
        .then(function (response) {
            let votes = response.data;
            let votesByPhotoId = {};    // {photoId : {upvotes: int, downvotes: int}}
            let trendingPhotosIds;

            // Filter votes (remove votes from more than a week ago)
            /*
            let now = new Date();
            votes = votes.filter(function (vote) {
                let voteDate = new Date(vote.date);
                let daysDif = (now - voteDate) / (1000*60*60*24);

                return daysDif < 7;
            });
            //*/

            // Populate votesByPhotoId
            for (vote of votes) {
                let photoId = vote.photoId;

                if (votesByPhotoId.hasOwnProperty(photoId)) {
                    if (vote.positive) {
                        votesByPhotoId[photoId].upvotes++;
                    } else {
                        votesByPhotoId[photoId].downvotes++;
                    }
                }
                else {
                    if (vote.positive) {
                        votesByPhotoId[photoId] = { upvotes: 1, downvotes: 0 };
                    } else {
                        votesByPhotoId[photoId] = { upvotes: 0, downvotes: 1 };
                    }
                }
            }

            // Convert votesByPhotoId to an array like [[photoId, upvotes, downvotes], ...]
            votesByPhotoId = Object.keys(votesByPhotoId).map(function (photoId) {
                let upvotes = votesByPhotoId[photoId].upvotes;
                let downvotes = votesByPhotoId[photoId].downvotes;

                return [photoId, upvotes, downvotes];
            });

            // Sort votesByPhotoId by highest score or by number of votes
            votesByPhotoId.sort(function (a, b) {
                let x = getPhotoScore(b[1], b[2]) - getPhotoScore(a[1], a[2]);
                return x !== 0 ? x : (b[1] + b[2]) - (a[1] + a[2]);
            });

            // Get first 12 photoIds
            trendingPhotosIds = votesByPhotoId.slice(0, 12).map(a => a[0]);

            // Append trending photos
            getPhotos(trendingPhotosIds).then(function (photos) {
                appendPhotos($("#trending-gal"), photos);
            });

        })
        .catch(function (error) {
            console.log(`Error al pedir las fotos: ` + error);
        });


    // Trending users
    axios.get(`http://localhost:3000/users`)
        .then(function (response) {
            let users = response.data;
            let usersIndex = {};           // {userId: int (index of user Object in users array)}
            let followersByUserId = {};    // {userId: int}

            // Populate usersIndex
            for (let i = 0; i < users.length; i++) {
                usersIndex[users[i].id] = i;
            }

            // Populate followersByUser
            for (user of users) {
                for (userId of user.following) {
                    if (followersByUserId.hasOwnProperty(userId)) {
                        followersByUserId[userId]++;
                    }
                    else {
                        followersByUserId[userId] = 1;
                    }
                }
            }

            // Convert followersByUser to an array like [[userId, userFollowers], ...]
            followersByUserId = Object.entries(followersByUserId);

            // Sort followersByUserId by highest number of followers
            followersByUserId.sort((a, b) => b[1] - a[1]);

            // Append first 10 users
            for (let i = 0; i < 10; i++){
                let userId = followersByUserId[i][0];
                let followers = followersByUserId[i][1];
                let user = users[usersIndex[userId]];

                appendTrendingUser(user, followers);
            }
        })
        .catch(function (error) {
            console.log(`Error al pedir los usuarios: ` + error);
        });
});


async function appendTrendingUser(user, followers) {
    await getUserBestPhoto(user.id).then(function (photo) {
        let innersContainer = $("#trending-top-users-carousel-inner");
        let first = innersContainer.children().length === 0;

        let inner = generateInner(user, photo, followers, first);

        innersContainer.append(inner);
    });
}

async function getUserBestPhoto(userId) {
    let bestPhoto = null;

    await getUserPhotos(userId).then(function (response) {
        let photos = response.data;

        photos.sort(function (p1, p2) {
            let x = (p2.upvotes + p2.downvotes) - (p1.upvotes + p1.downvotes);
            return x !== 0 ? x : p2.upvotes - p1.upvotes;
        })

        bestPhoto = photos[0];
    });

    return bestPhoto;
}

function generateInner(user, photo, followers, active) {
    let activeString = active ? "active" : "";
    let profileLink = `profile.php?userId=${user.id}`;

    return `
        <div class="carousel-item ${activeString}">
            <img src="${photo.url}" class="d-block w-100">
            <div class="carousel-caption">
                <p class='m-0'>${followers} followers</p>
                <a href='${profileLink}'>
                    <h5 class='m-0'>@${user.user}</h5>
                </a>
            </div>
        </div>`
}