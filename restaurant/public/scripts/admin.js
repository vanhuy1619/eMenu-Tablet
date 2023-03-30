$(document).ready(function() {
    [a,b,c] = (new Date().toLocaleDateString()).split("/")
    if(b<10) b = '0'+b
    let today = [a,b,c].join("-")
    $('#demo-one-input').val(today)
    ajaxBill(today)
})

function searchByDateCheckin() {
    $('#demo-one-input').change(function () {
        let searchString = $('#demo-one-input').val().replaceAll('/', '-');
        [a, b, c] = searchString.split("-")
        searchString = [b, a, c].join("-")
        $('#demo-one-input').val(searchString)

        ajaxBill(searchString)
    })
}
searchByDateCheckin()

function ajaxBill(date)
{
    $.ajax({
        url: "/admin/get-bill-date/" + date,
        type: "GET",
        success: function (res) {
            if (res.code === 0) {
                let data = res.data;
                let html = data.map(ele => {
                    return `<div class='bill-item' style="margin-bottom:20px">
                    <div id="invoice-top">
                    <div class='info'>
                        <p class='emailStaffPay'><i>Nhân viên: </i>${ele.emailStaffPay}</p>
                    </div>
                    <div class="title">
                        <p><i>Mã hóa đơn: </i>${ele._id}</p>
                        <p><i>Thời gian: </i>${ele.timePay}</p>
                    </div>
                </div>
                <div id='invoice-bot' style='border-bottom:1px solid #ccc'>
                <div id='table'>
                    <table class='table'>
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
                                                <td>
                                                    <p class="itemtext">${item.productInfo.name}</p>
                                                </td>
                                                <td>
                                                    <p class="itemtext">${item.price}.000</p>
                                                </td>
                                                <td>
                                                    <p class="itemtext">${item.amount}</p>
                                                </td>
                                                <td>
                                                    <p class="itemtext">${item.price*item.amount}.000</p>
                                                </td>
                                            </tr>`
                                })
                                
                            }
                        
                        <tr class="tabletitle">
                            <td></td>
                            <td></td>
                            <td>
                                <p>Tổng tiền</p>
                            </td>
                            <td class="payment">
                                <p>${ele.totalPrice}.000</p>
                            </td>
                        </tr>
    
                    </table>
                </div>
                </div>
                    </div>`
                
                })
                document.querySelector('#invoice').innerHTML = html.join('')
            }
            paging()

            document.querySelectorAll('.emailStaffPay').forEach(ele=>{
                console.log(ele.innerText);
                ele.innerText.replaceAll(",,","")
            })
        },
        error: function (err) {
            console.log(err);
        }
    })
}

