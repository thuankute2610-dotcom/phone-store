const container = document.getElementById("cacLoaiHoa");
function formatVND(tien) { return Number(tien).toLocaleString("vi-VN", { style: "currency", currency: "VND" }); }
function hienThiHoa() {
    container.innerHTML = "";
    danhSachHoa.forEach(item => {
        const card = document.createElement("div");
        card.className = "flower-card";
        card.innerHTML = `
            <img src="${item.hinh}" onclick="window.location.href='detail.html?id=${item.id}'" style="cursor:pointer">
            <h3 onclick="window.location.href='detail.html?id=${item.id}'" style="cursor:pointer">${item.ten}</h3>
            <p>${formatVND(item.gia)}</p>
            <input type="number" value="1" min="1" id="sl-${item.id}">
            <p id="tien-${item.id}" style="color:#555; font-size:0.9rem">Thành tiền: ${formatVND(item.gia)}</p>
            <button onclick="themVaoGio(${item.id})">MUA NGAY</button>
        `;
        container.appendChild(card);
        const input = card.querySelector(`#sl-${item.id}`);
        input.addEventListener("input", () => {
            let sl = input.value < 1 ? 1 : input.value;
            card.querySelector(`#tien-${item.id}`).innerText = "Thành tiền: " + formatVND(sl * item.gia);
        });
    });
}