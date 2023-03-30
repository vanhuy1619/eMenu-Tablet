function searchFood() {
    $('#search').on('keyup', function () {
        var value = $(this).val();
        var patt = new RegExp(value, "i");

        $('.list-product').find(".product").each(function () {
            var $data = $(this);

            if (!($data.text().search(patt) >= 0)) {
                $data.not('.t_head').hide();
            }
            if (($data.text().search(patt) >= 0)) {
                $(this).show();
            }

        });
    });
}
searchFood()

function paging() {
    var items = $('.bill-item');
    numItems = $('.bill-item').length;
    console.log(numItems);
    var perPage = 5;

    items.slice(perPage).hide();
    console.log($('#pagination-container'));
    $('#pagination-container').pagination({
        items: numItems,
        itemsOnPage: perPage,
        prevText: "&laquo;",
        nextText: "&raquo;",
        onPageClick: function (pageNumber) {
            var showFrom = perPage * (pageNumber - 1);
            var showTo = showFrom + perPage;
            items.hide().slice(showFrom, showTo).show();
        }
    });
}

