const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));
const product = danhSachHoa.find(p => p.id === productId);
function formatVND(t) { return Number(t).toLocaleString("vi-VN", { style:"currency", currency:"VND" }); }

if (product) {
    document.getElementById("product-detail").innerHTML = `
        <div class="detail-image"><img src="${product.hinh}"></div>
        <div class="detail-info">
            <h1>${product.ten}</h1>
            <h2 style="color:#d70018">${formatVND(product.gia)}</h2>
            <div class="description">${product.moTa}</div>
            <input type="number" id="sl-${product.id}" value="1" min="1" style="width:60px; padding:10px; margin: 20px 0;">
            <button class="btn-add" onclick="themVaoGio(${product.id})">THÊM VÀO GIỎ HÀNG</button>
        </div>
    `;
}