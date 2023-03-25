//Tạo bàn
$(".item-table").click(function (e) {
    const idtable = e.target.dataset.id
    const status = e.target.getAttribute("status")
    if (status == "Đang dùng") {
        window.location.href = `/order/${idtable}`
    }
    if (status == "Trống") {
        swal({
            title: "Mở bàn",
            text: "Xác nhận mở bàn?",
            icon: "warning",
            buttons: true,
            dangerMode: false,
        })
            .then((willChangeDir) => {
                if (willChangeDir) {
                    let data = {
                        idtable: idtable,
                        status:"Đang dùng"
                    }
                    $.ajax({
                        type: "POST",
                        url: "/user/opentable",
                        data: JSON.stringify(data),
                        dataType: "json",
                        contentType: "application/json",
                        success: function (res) {
                            if(res.code==0)
                            window.location.href = `/order/${idtable}`
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    })
                }
            })
    }
})