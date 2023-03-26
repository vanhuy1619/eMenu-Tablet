// {
//     const statusHelper = {
//         0: "Đã giao hàng",
//         1: "Đang xử lí",
//         2: "Đang giao hàng",
//         3: "Bị từ chối"
//     }

//     document.querySelectorAll(".status").forEach(status => {
//         const statusInner = parseInt(status.innerHTML.trim())

//         if (statusInner === 0) {
//             status.classList.add("text-success")
//             $(".update").addClass("text-success")
//         } else if (statusInner === 1) {
//             status.classList.add("text-warning")
//         } else if (statusInner === 2) {
//             status.classList.add("text-info")
//             $(".update").addClass("text-info")
//         } else if (statusInner === 3) {
//             status.classList.add("text-danger")
//             $(".update").addClass("text-danger")
//         }


//         if (statusHelper[statusInner])
//             status.innerHTML = statusHelper[statusInner]
//     })
// }

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
        const idZone = $(this).data("idzone")

        let data = {
            idtable: String(idtable),
            _id: _id,
            product_id: product_id,
            iditem: iditem,
            amountEdit: parseInt(amountEdit),
            price: parseInt(price),
            status: status,
            idZone: idZone
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
                        console.log(e.target.parentNode.parentNode.cells[6]);
                        e.target.parentNode.parentNode.cells[6].childNodes[1].style.display = 'none'
                        if(status == 3)
                        {
                            e.target.parentNode.parentNode.cells[5].style.display = 'none'
                        }
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

{
    let navLeft = document.querySelectorAll('.profile-main__left--item')
    let orderHtml = document.querySelector('.order')
    let oderHtmlPre = orderHtml.innerHTML
    navLeft.forEach((element) => {
        element.addEventListener("click", () => {
            if (!element.classList.contains("active")) {
                // Nếu phần tử chưa có class "active", xóa class "active" ở tất cả các phần tử khác
                navLeft.forEach((el) => {
                    el.classList.remove("active");
                });
                element.classList.add("active");
            }

            let navmenu = document.getElementById("navmenu");

            if (navmenu.classList.contains("active")) {

                $.ajax({
                    type: "GET",
                    url: "/chef/list-products",
                    success: function (res) {
                        if (res.code === 0) {
                            // console.log(res);
                            res.products.sort((a, b) => String(a.type).localeCompare(String(b.type)));
                            let htmlp = res.products.map(ele => {
                                return `<div class='col-md-3 mb-4'>
                                            <div style='box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;padding:6px;height:100%'>
                                                <div>
                                                    <img style='height:100px;object-fit:cover' src='${ele.image}' />
                                                </div>
                                                <div>
                                                    <p style ='text-align:center'>${ele.name}</p>
                                                    <div style='display:flex;justify-content:center'>
                                                        <label class="switch">
                                                            <input type="checkbox"  data-id="${ele.id}" ${ele.toggle == true ? 'checked' : ''}>
                                                            <span class="slider round"></span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`
                            })
                            orderHtml.innerHTML = htmlp.join('')

                            updateToggleFood()
                        }
                    },
                    error: function (err) {
                        console.log(err);
                    }
                })
            }
            else {
                orderHtml.innerHTML = oderHtmlPre
            }
        })
    });
}

function updateToggleFood() {
    let toggle
    let listToggle = document.querySelectorAll('input[type="checkbox"]')
    listToggle.forEach(ele => {
        ele.onclick = function (e) {
            if ($(this).is(':checked')) {
                toggle = true
            }
            else {
                toggle = false
            }

            let data = {
                id: $(this).data('id'),
                toggle: toggle
            }

            $.ajax({
                type: "PUT",
                url: "/chef/update-toggle-food",
                data: JSON.stringify(data),
                processData: false,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    console.log("Thành công");
                },
                error: function (err) {
                    console.log(err);
                }
            })

        }
    })
}