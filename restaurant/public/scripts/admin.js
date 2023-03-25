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

clickDeleteEmployeeButton()

function clickDeleteEmployeeButton() {
    $(".delete-employee").click(e => {
        swal({
            title: "DELETE",
            text: `Xóa nhân viên này ?`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    deleteEmployee(e)
                }
            })
    })
}

clickEditEmployeeButton()

function clickEditEmployeeButton() {
    $(".edit-employee").click(e => {
        const id = e.target.dataset.id

        $.ajax({
            url: "/admin/" + id,
            type: "GET",
            success: function (res) {
                updateEditModal(res.user)
            },
            error: function (err) {
            }
        })

        $('#edit-modal').modal('show')
    })

    function updateEditModal(user) {
        $("#edit-name").val(user.name)

        if (user.gender === "male")
            $("#edit-male").attr("checked", "checked")
        else if ((user.gender === "female"))
            $("#edit-female").attr("checked", "checked")
        else
            $("#edit-other").attr("checked", "checked")

        $("#edit-position").val(user.position.toString()).change()

        $("#edit-email").val(user.email)

        $("#edit-save-btn").data("id", user._id)
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
    $(".tab").css("display", "none")
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




