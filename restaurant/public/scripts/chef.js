{
    const statusHelper = {
        0: "Đã giao hàng",
        1: "Đang xử lí",
        2: "Đang giao hàng",
        3: "Bị từ chối"
    }

    document.querySelectorAll(".status").forEach(status => {
        const statusInner = parseInt(status.innerHTML.trim())

        if (statusInner === 0) {
            status.classList.add("text-success")
            $(".update").addClass("text-success")
        } else if (statusInner === 1) {
            status.classList.add("text-warning")
        } else if (statusInner === 2) {
            status.classList.add("text-info")
            $(".update").addClass("text-info")
        } else if (statusInner === 3) {
            status.classList.add("text-danger")
            $(".update").addClass("text-danger")
        }


        if (statusHelper[statusInner])
            status.innerHTML = statusHelper[statusInner]
    })
}

$("#logout").click(function () {
    window.location.href = "/logout"
})

let btnCookingAll = document.querySelectorAll("#cooking")
btnCookingAll.forEach(item => {
    item.onclick = function (e) {
        const product_id = $(this).data("product_id")
        const idtable = $(this).data("idtable")
        const amountEdit = e.target.parentNode.parentNode.childNodes[5].childNodes[1].defaultValue
        const price = e.target.parentNode.parentNode.childNodes[5].childNodes[1].getAttribute("price")
        const status = parseInt(this.getAttribute("status"))
        const iditem = $(this).data("iditem")
        const _id = $(this).data("_id")

        let data = {
            idtable: String(idtable),
            _id: _id,
            product_id: product_id,
            iditem: iditem,
            amountEdit: parseInt(amountEdit),
            price: parseInt(price),
            status: status
        }

        console.log(data);   

        $.ajax({
            type: "PUT",
            url: "/chef/update-status",
            data: JSON.stringify(data),
            processData: false,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                if (res.code === 0) {
                    if (e.target.getAttribute("action") == 'huy') {
                        e.target.parentNode.parentNode.style.display = 'none'
                    }
                    else {
                        e.target.style.display = 'none';
                        e.target.parentNode.parentNode.cells[6].childNodes[1].style.display = 'none'
                        e.target.parentNode.parentNode.cells[2].childNodes[1].disabled = true
                    }
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
    }
})
changeAmount()
function changeAmount() {
    let amountEdit = document.querySelectorAll('#amountEdit')
    amountEdit.forEach(ele => {
        ele.onchange = function (e) {
            ele.setAttribute('value', ele.value)
        }
    })
}


{
    document.querySelectorAll(".date-modifier").forEach(date => {
        date.innerHTML = date.innerHTML.trim().replace("GMT+0700 (Indochina Time)", "")
    })
}