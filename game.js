let money = 2000000;

let day = 1;

let warehouse = 0;

let revenue = 0;

let customers = 0;

let shelf = [0, 0];

let onlineOrder = false;


// ======================
// CẬP NHẬT GIAO DIỆN
// ======================

function updateUI() {

    document.getElementById("money").textContent =
        money.toLocaleString("vi-VN");

    document.getElementById("day").textContent =
        day;

    document.getElementById("warehouse").textContent =
        warehouse;

    document.getElementById("revenue").textContent =
        revenue.toLocaleString("vi-VN");

    document.getElementById("customers").textContent =
        customers;


    document.getElementById("shelf1").textContent =
        shelf[0] > 0
            ? `🥤 Nước ngọt × ${shelf[0]}`
            : "Trống";


    document.getElementById("shelf2").textContent =
        shelf[1] > 0
            ? `🥤 Nước ngọt × ${shelf[1]}`
            : "Trống";
}


// ======================
// NHẬP HÀNG
// ======================

function buyProduct(amount = 1) {

    const price = 8000;

    const total = price * amount;


    if (money < total) {

        showMessage("❌ Không đủ tiền nhập hàng!");

        return;
    }


    money -= total;

    warehouse += amount;


    showMessage(
        `📦 Đã nhập ${amount} chai nước ngọt.`
    );


    updateUI();
}


// ======================
// ĐẶT HÀNG LÊN KỆ
// ======================

function putProductOnShelf(index) {

    const capacity = 20;


    if (warehouse <= 0) {

        showMessage(
            "❌ Kho không còn hàng!"
        );

        return;
    }


    if (shelf[index] >= capacity) {

        showMessage(
            "🗄️ Kệ đã đầy!"
        );

        return;
    }


    warehouse--;

    shelf[index]++;


    showMessage(
        "🗄️ Đã đặt một chai nước lên kệ."
    );


    updateUI();
}


// ======================
// PHỤC VỤ KHÁCH
// ======================

function serveCustomer() {

    const totalProducts =
        shelf[0] + shelf[1];


    if (totalProducts <= 0) {

        showMessage(
            "😐 Khách vào nhưng không có hàng để mua!"
        );

        return;
    }


    let index =
        shelf[0] > 0
            ? 0
            : 1;


    shelf[index]--;


    const sellPrice = 12000;


    money += sellPrice;

    revenue += sellPrice;

    customers++;


    showMessage(
        "🛍️ Khách đã mua 1 chai nước. +12.000đ"
    );


    updateUI();
}


// ======================
// ĐƠN ONLINE
// ======================

function createOnlineOrder() {

    if (onlineOrder) {

        showMessage(
            "📱 Bạn đang có một đơn chưa xử lý."
        );

        return;
    }


    onlineOrder = true;


    document.getElementById("online-order").textContent =
        "📱 Đơn mới: 2 chai nước ngọt";


    showMessage(
        "📱 Có đơn hàng online mới!"
    );
}


// ======================
// HOÀN THÀNH ĐƠN
// ======================

function completeOnlineOrder() {

    if (!onlineOrder) {

        showMessage(
            "📱 Chưa có đơn hàng."
        );

        return;
    }


    if (shelf[0] + shelf[1] < 2) {

        showMessage(
            "❌ Không đủ hàng để đóng đơn!"
        );

        return;
    }


    for (let i = 0; i < 2; i++) {

        if (shelf[0] > 0) {
            shelf[0]--;
        }

        else {
            shelf[1]--;
        }
    }


    const price = 24000;


    money += price;

    revenue += price;

    onlineOrder = false;


    document.getElementById("online-order").textContent =
        "Chưa có đơn hàng.";


    showMessage(
        "📦 Đã giao đơn online. +24.000đ"
    );


    updateUI();
}


// ======================
// KẾT THÚC NGÀY
// ======================

function endDay() {

    day++;


    customers = 0;

    revenue = 0;


    showMessage(
        `🌙 Ngày mới bắt đầu! Hôm nay là ngày ${day}.`
    );


    updateUI();
}


// ======================
// THÔNG BÁO
// ======================

function showMessage(text) {

    document.getElementById("message").textContent =
        text;
}


// CHẠY LẦN ĐẦU

updateUI();
