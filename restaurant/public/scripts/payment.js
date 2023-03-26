$("#pay").click(function () {
    let idtable = this.dataset.idtable
    $.ajax({
        url: "/payment/confirm-order/" + idtable,
        type: "POST",
        success: function (res) {
            if (res.code === 0) {
                swal("Good Job!", "Đặt hàng thành công!", "success")
                    .then(() => {
                        location.reload()
                    })
            } else if (res.code === 2) {
                swal({
                    title: "Error",
                    text: res.message,
                    icon: "warning",
                    buttons: true,
                    dangerMode: false,
                })
                    .then((willChangeDir) => {
                        if (willChangeDir) {
                            window.location.href = "/user/login"
                        }
                    })
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
})

$("#confirmpay").click(function () {
    let idtable = this.dataset.idtable
    $.ajax({
        url: "/payment/confirm-pay/" + idtable,
        type: "POST",
        success: function (res) {
            if (res.code === 0) {
                swal("Good Job!", "Thanh toán hóa đơn thành công!", "success")
                    .then(() => {
                        location.reload()
                    })
            }
            else {
                swal({
                    title: "Error",
                    text: res.message,
                    icon: "warning",
                    buttons: true,
                    dangerMode: false,
                })
                    .then((willChangeDir) => {
                        if (willChangeDir) {
                            window.location.href = "/user/login"
                        }
                    })
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
})

$("#close-btn").click(function () {
    $("#edit-modal").css("display", "none")
})

$("#overlay").click(function () {
    $("#edit-modal").css("display", "none")
})