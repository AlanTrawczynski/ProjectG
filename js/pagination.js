function updatePagination(nextPage = false) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const urlPage = urlParams.get('page');
    let currentPageNum = urlPage == null ? 1 : parseInt(urlPage, 10);
    let pageString = getPageString().split(".")[0];

    let prevIco = $(`#${pageString}-previous-page-ico`);
    let prev = $(`#${pageString}-previous-page`);
    let current = $(`#${pageString}-current-page`);
    let next = $(`#${pageString}-next-page`);
    let nextIco = $(`#${pageString}-next-page-ico`);

    if (currentPageNum === 1 && !nextPage) {
        $(`#${pageString}-pagination`).hide();
    }
    else {
        prev.children().text(currentPageNum - 1);
        current.children().text(currentPageNum);
        next.children().text(currentPageNum + 1);

        prevIco.children()[0].href = `${pageString}.php?page=${currentPageNum - 1}`;
        prev.children()[0].href = `${pageString}.php?page=${currentPageNum - 1}`;
        current.children()[0].href = `${pageString}.php?page=${currentPageNum}`;
        next.children()[0].href = `${pageString}.php?page=${currentPageNum + 1}`;
        nextIco.children()[0].href = `${pageString}.php?page=${currentPageNum + 1}`;

        if (currentPageNum == 1) {
            prevIco.addClass("disabled");
            prev.hide();
        }
        else {
            prevIco.removeClass("disabled");
            prev.show();
        }

        if (nextPage) {
            next.show();
            nextIco.removeClass("disabled");
        }
        else {
            next.hide();
            nextIco.addClass("disabled");
        }

        for (let i = currentPageNum - 2; i > currentPageNum - 10 && i > 0; i--) {
            tempPagHtml = `
                <li class="page-item temp-pagination">
                    <a class="page-link" href="${pageString}.php?page=${i}">${i}</a>
                </li>`
            prevIco.after(tempPagHtml);
        }
    }
}