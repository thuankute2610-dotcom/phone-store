let gioHang = JSON.parse(localStorage.getItem("gioHang")) || [];
function formatVND(t) { return Number(t).toLocaleString("vi-VN", { style:"currency", currency:"VND" }); }
function luuGioHang() { localStorage.setItem("gioHang", JSON.stringify(gioHang)); }

function themVaoGio(id) {
    const sl = Number(document.getElementById(`sl-${id}`).value);
    const item = gioHang.find(i => i.id === id);
    if (item) item.soLuong += sl;
    else {
        const p = danhSachHoa.find(x => x.id === id);
        gioHang.push({ ...p, soLuong: sl });
    }
    luuGioHang();
    alert("Đã thêm vào giỏ hàng!");
}

function hienThiGioHang() {
    const body = document.getElementById("gioHangBody");
    if(!body) return;
    body.innerHTML = "";
    let tong = 0;
    gioHang.forEach(item => {
        let thanhTien = item.gia * item.soLuong;
        tong += thanhTien;
        body.innerHTML += `
            <tr>
                <td><img src="${item.hinh}" width="50"> ${item.ten}</td>
                <td>${formatVND(item.gia)}</td>
                <td><input type="number" value="${item.soLuong}" min="1" onchange="doiSL(${item.id}, this.value)"></td>
                <td>${formatVND(thanhTien)}</td>
                <td><button onclick="xoaItem(${item.id})">❌</button></td>
            </tr>`;
    });
    document.getElementById("tongTien").innerText = "Tổng tiền: " + formatVND(tong);
}

function doiSL(id, sl) {
    const item = gioHang.find(i => i.id === id);
    if(item) item.soLuong = Number(sl);
    luuGioHang(); hienThiGioHang();
}

function xoaItem(id) {
    gioHang = gioHang.filter(i => i.id !== id);
    luuGioHang(); hienThiGioHang();
}

function thanhToan() {
    if (gioHang.length === 0) return alert("Giỏ hàng đang trống!");

    // Tính tổng tiền
    const tongTien = gioHang.reduce((s, i) => s + i.soLuong * i.gia, 0);
    
    // THÔNG TIN NGÂN HÀNG CỦA BẠN (Thay đổi ở đây)
    const BANK_ID = "vcb"; // Ví dụ: vcb, mbbank, techcombank...
    const ACCOUNT_NO = "9975348611"; // Số tài khoản của bạn
    const ACCOUNT_NAME = "NGUYEN VAN THUAN"; // Tên chủ tài khoản
    const DESCRIPTION = "Thanh toan don hang Smartphone";

    // Tạo link QR từ VietQR (Tự động điền số tiền)
    const qrUrl = `https://img.vietqr.io/image/${'vcb'}-${'9975348611'}-compact2.jpg?amount=${tongTien}&addInfo=${encodeURIComponent('Thanh toan don hang Smartphone')}&accountName=${encodeURIComponent('NGUYEN VAN THUAN')}`;

    // Hiển thị Modal và nạp ảnh QR
    document.getElementById("qrImage").src = qrUrl;
    document.getElementById("qrAmount").innerText = "Số tiền: " + formatVND(tongTien);
    document.getElementById("qrModal").style.display = "block";
}

function hoanTatThanhToan() {
    alert("Cảm ơn bạn! Hệ thống đang xác nhận giao dịch.");
    gioHang = [];
    luuGioHang();
    window.location.href = "index.html";
}