status order:
0: Hủy
1: Chờ xác nhận
2: Đang chế biến (thực hiện)
3: Hoàn tất

***Connect string mongodb trước khi chạy
Mở project, bật cửa sửa terminal và gõ thứ tự các lệnh sau:
1. npm install express
2. npm start

*** Test API với Postman
Các bước thực hiện:
1. Lấy token
    Dùng method 'POST' với url ''
    Trong mục 'Body' paste đoạn mã sau: {"username":"admin","password":"123456"}
    Được kết quả trả về có dạng: 
    {
        "message": "authentication done ",
        "token": "......................."
    }
    Copy token đó, trong mục 'Headers', thêm Key 'access-token' với value là token ở vừa Copy
2. Thực hiện lấy API
    Url cho các API: http://localhost:3000/api/[params]    (được liệt kê trong file routes/api)
    Ví dụ:
    - Lấy danh sách sản phẩm: http://localhost:3000/api/list-products (GET)
    - Cập nhật trạng thái món ăn: http://localhost:3000/api/update-toggle-food (PUT)
        body {
                "id": "6ltjl0b3q9",
                "toggle": true
            }
        trong đó:  id là mã món ăn
                   toggle: true(còn món), fale(hết món)
                   
ROUTER:
1: nhân viên phục vụ
  email: vanhuy@gmail.com
  password: 123456

  email: phuc@gmail.com
  password: 123456

2. Nhân viên bếp
  email: thanhthuy@gmail.com
  password: 123456

3. Admin
  email: admin@gmail.com
  password: 123456