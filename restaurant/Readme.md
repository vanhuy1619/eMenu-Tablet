<ul>
  <p>Status order:</p>
  <li>0: Hủy</li>
  <li>1: Chờ xác nhận</li>
  <li>2: Đang chế biến (thực hiện)</li>
  <li>3: Hoàn tất</li>
</ul>


<i style="font-weight: bold;">***Connect string mongodb trước khi chạy</i>
<p>Mở project, bật cửa sửa terminal và gõ thứ tự các lệnh sau:</p>
<ul>
  <li>1. npm install express</li>
  <li>2. npm start</li>
</ul>

<i style="font-weight: bold;">*** Test API với Postman</i>
<ul>Các bước thực hiện:
  <li>
    <p>1. Lấy token</p>
    <p>Dùng method 'POST' với url '' <br>
      Trong mục 'Body' paste đoạn mã sau: {"username":"admin","password":"123456"} <br>
      Được kết quả trả về có dạng: <br>
      {
      "message": "authentication done ",<br>
      "token": "......................."<br>
      }
    </p>
    <p>Copy token đó, trong mục 'Headers', thêm Key 'access-token' với value là token ở vừa Copy</p>
  </li>
  <li>
    <p>2. Thực hiện lấy API</p>
    <p>Url cho các API: http://localhost:3000/api/[params] (được liệt kê trong file routes/api)<br>
      Ví dụ:<br>
      - Lấy danh sách sản phẩm: http://localhost:3000/api/list-products (GET)<br>
      - Cập nhật trạng thái món ăn: http://localhost:3000/api/update-toggle-food (PUT)<br>
      body {<br>
      "id": "6ltjl0b3q9",<br>
      "toggle": true<br>
      }<br>
      trong đó: id là mã món ăn<br>
      toggle: true(còn món), fale(hết món)</p>
  </li>
</ul>

<i style="font-weight: bold;">*** ROUTER:</i>
<ul>
  <p>1: nhân viên phục vụ</p>
  <li>
    <p>email: vanhuy@gmail.com</p>
    <p>password: 123456</p>
  </li>
  <li>
    <p>email: phuc@gmail.com</p>
    <p>password: 123456</p>
  </li>
</ul>
<ul>
  <p>2. Nhân viên bếp</p>
  <li>
    <p>email: thanhthuy@gmail.com</p>
    <p>password: 123456</p>
  </li>
</ul>
<ul>
  <p>3. Admin</p>
  <li>
    <p>email: admin@gmail.com</p>
    <p>password: 123456</p>
  </li>
</ul>