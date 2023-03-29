$("#add-form").submit(e => {
    e.preventDefault()

    const data = new FormData($("#add-form")[0])

    $.ajax({
        type: "POST",
        url: "/admin/add-employee",
        data: data,
        processData: false,
        contentType: false,
        success: function (res) {
            if (res.code === 0) {
                swal("Good Job!", "Thêm Nhân viên thành công!", "success")
                    .then(() => {
                        $('#add-modal').modal('hide')
                        location.reload()
                    })
            } else {
                $("#error-text").css("visibility", "visible")
                $("#error-text").html(res.message)
            }
        }
    })
})

$("#edit-form").submit(e => {
    e.preventDefault()

    const data = new FormData($("#edit-form")[0])
    const id = $("#edit-save-btn").data("id")

    $.ajax({
        type: "PUT",
        url: "/admin/edit-employee/?_id=" + id,
        data: data,
        processData: false,
        contentType: false,
        success: function (res) {
            if (res.code === 0) {
                swal("Good Job!", "Sửa Nhân viên thành công", "success")
                    .then(() => {
                        $('#edit-modal').modal('hide')
                        location.reload()
                    })
            } else {
                $("#edit-error-text").css("visibility", "visible")
                $("#edit-error-text").html(res.message)
            }

        },
        error: function (err) {

        }
    })
})

function deleteEmployee(e) {
    const id = e.target.dataset.id
    const parent = e.target.parentNode.parentNode

    $.ajax({
        url: "/admin/delete-employee/?_id=" + id,
        type: "DELETE",
        success: function (res) {
            if (res.code === 0) {
                swal("Good Job!", "Xóa Nhân viên thành công!", "success")
                    .then(() => {
                        parent.remove()
                        updateIndex()
                    })
            }
        },
        error: function (err) {
        }
    })

    function updateIndex() {
        for (let i = 0; i < $("#table-body").children().length; i++) {
            $("#table-body").children()[i].children[0].innerHTML = i + 1//++i.toString()
        }
    }
}



helper()

function helper() {
    const positionHelper = {
        0: "Khách hàng",
        1: "Nhân viên chăm sóc khách hàng",
        2: "Nhân viên giao hàng",
        3: "Nhân viên bán hàng",
        4: "Nhân viên kỹ thuật",
        5: "Nhân viên kho",
        6: "Quản lí",
        7: "Kế toán",
    }

    const genderHelper = {
        male: "Nam",
        female: "Nữ",
        other: "Khác"
    }

    document.querySelectorAll(".position").forEach(pos => {
        const posHelper = parseInt(pos.innerHTML.trim())
        if (positionHelper[posHelper])
            pos.innerHTML = positionHelper[posHelper]
    })

    document.querySelectorAll(".gender").forEach(gender => {
        const genHelper = gender.innerHTML.trim()
        if (genderHelper[genHelper])
            gender.innerHTML = genderHelper[genHelper]
    })
}


function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=')

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1])
        }
    }
    return false
}

{
    const tab = getUrlParameter("tab")
    updateTab(tab)
}

function updateTab(tab) {
    // $(".tab").css("display", "none")
    $("#" + tab).css("display", "block")

    $(".profile-main__left--item").removeClass("active")

    $("." + tab).addClass("active")
}

$(".employee-manager").click(function () {
    const url = new URL(window.location)
    url.searchParams.set('tab', 'employee-manager')
    window.history.pushState({}, '', url)
    updateTab("employee-manager")
})

$(".request-manager").click(function () {
    const url = new URL(window.location)
    url.searchParams.set('tab', 'request-manager')
    window.history.pushState({}, '', url)
    updateTab("request-manager")
})

function searchByDateCheckin() {
    let x
    $('#demo-one-input').change(function () {
        let searchString = $('#demo-one-input').val().replaceAll('/', '-');
        [a, b, c] = searchString.split("-")
        searchString = [b, a, c].join("-")
        $('#demo-one-input').val(searchString)

        $.ajax({
            url: "/admin/get-bill-date/" + searchString,
            type: "GET",
            success: function (res) {
                if (res.code === 0) {
                    let data = res.data;
                    let html = data.map(ele => {
                        return `<div id="invoice-top">
                        <div class="logo"></div>
                        <div class="info">
                            <p>${ele.emailStaffPay}</p>
                        </div><!--End Info-->
                        <div class="title">
                            <p>${ele._id}</p>
                            <p>${ele.timePay}</p>
                        </div><!--End Title-->
                    </div><!--End InvoiceTop-->
                    <div id="invoice-bot">
                    <div id="table">
                        <table>
                            <tr class="tabletitle">
                                <td class="item">
                                    <p>Tên món ăn</p>
                                </td>
                                <td class="Hours">
                                    <p>Đơn giá</p>
                                </td>
                                <td class="Rate">
                                    <p>Số lượng</p>
                                </td>
                                <td class="subtotal">
                                    <p>Thành tiền</p>
                                </td>
                            </tr>
                            
                                ${
                                    ele.listOrder.map(item=>{
                                        return `<tr class="service">
                                                    <td class="tableitem">
                                                        <p class="itemtext">${item.productInfo.name}</p>
                                                    </td>
                                                    <td class="tableitem">
                                                        <p class="itemtext">${item.price}</p>
                                                    </td>
                                                    <td class="tableitem">
                                                        <p class="itemtext">${item.amount}</p>
                                                    </td>
                                                    <td class="tableitem">
                                                        <p class="itemtext">${item.price*item.amount}</p>
                                                    </td>
                                                </tr>`
                                    })
                                    
                                }
                            
                            <tr class="tabletitle">
                                <td></td>
                                <td></td>
                                <td class="Rate">
                                    <h2>Total</h2>
                                </td>
                                <td class="payment">
                                    <h2>${ele.totalPrice}</h2>
                                </td>
                            </tr>
        
                        </table>
                    </div>
                    </div>`
                    
                    })
                    document.querySelector('#invoice').innerHTML = html.join('')
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
    })
}
searchByDateCheckin()