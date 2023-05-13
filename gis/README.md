1. Tạo folder "gis"
2. Dùng vscode để mở folder "gis"
3. copy 3 file từ trang ví dụ openlayer
4. Ấn phím "Ctr" + "j" để mở terminal
5. chạy lệnh "npm install"
6. sau đó chạy lệnh "npm start" để start web

=> Hệ tọa độ trên web 900913
khi dùng tọa độ hệ 4326 WGS84 đưa lên web nó ko hiểu 
=> convert dữ liệu sang 900913

https://epsg.io/transform#s_srs=4326&t_srs=3857&x=NaN&y=NaN


Khái niệm bbox:  tọa độ 4 góc của 1 tile (ảnh)
11873422.225706138,
1230941.9035044797,
11874033.721932419,
1231553.399730761


proj4

=> cách triển khai 1 ứng dụng web
=> Cách sử dụng thư viện Openlayer
=> Hiển thị dữ liệu Geoserver lên web
=> Chuyển đổi hệ tọa độ