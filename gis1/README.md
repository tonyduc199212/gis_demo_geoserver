1. Tạo folder đặt tên "gis"
2. Dùng vscode để mở folder "gis"
3. copy 3 file từ trang ví dụ trang openlayer
(vô google gõ Openlayer -> vào Example -> vào Accessible Map)
4. Ấn phím "Ctr" + "j" để mở terminal
5. chạy lệnh "npm install"
6. sau đó chạy lệnh "npm start" để start web


BÀI TẬP
1. Chỉnh chiều cao của bản đồ thành full màn hình
2. Thay đổi mức zoom sang 15
3. Thay đổi tọa độ center sang trường đại học Bình Dương











=> Hệ tọa độ trên web 900913
khi dùng tọa độ hệ 4326 WGS84 đưa lên web nó ko hiểu 
=> convert dữ liệu sang 900913

https://epsg.io/transform#s_srs=4326&t_srs=3857&x=NaN&y=NaN


Khái niệm bbox:  tọa độ 4 góc của 1 tile (ảnh)
11873422.225706138,
1230941.9035044797,
11874033.721932419,
1231553.399730761


Thư viện chuyển đổi hệ tọa độ proj4

Kết thúc buổi học đạt được:
=> cách triển khai 1 ứng dụng web
=> Cách sử dụng thư viện Openlayer
=> Hiển thị dữ liệu Geoserver lên web
=> Chuyển đổi hệ tọa độ
=> Hiển thị popup 

Bài tập thực hành về nhà
Lấy source code từ git https://github.com/tonyduc199212/gis_demo_geoserver
Đọc hiểu source, thay đổi dữ liệu geoserver của mình vào, hiển thị nội dung lên popup, bật tắt lớp bản đồ