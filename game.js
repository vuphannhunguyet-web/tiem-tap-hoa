let money = 2000000;
let day = 1;

let products = {
    "Nước ngọt": {
        buyPrice: 8000,
        sellPrice: 12000,
        stock: 0,
        shelf: 0,
        maxShelf: 20
    }
};

let customers = [
    "Bà Năm",
    "Chị Hồng",
    "Ông Tuân",
    "Bác Vy",
    "Chị Mai",
    "Anh Tuấn"
];

function updateScreen() {
    document.getElementById("money").textContent =
        money.toLocaleString("vi-VN") + "đ";

    document.getElementById("day").textContent = day;

    document.getElementById("warehouse").textContent =
        products["Nước ngọt"].stock;

    document.getElementById("shelf").textContent =
        products["Nước ngọt"].shelf;
}

function buyProduct() {
    const product = products["Nước ngọt"];
    const amount = 10;

    const cost = product.buyPrice * amount;

    if (money < cost) {
        addLog("💸 Không đủ tiền để nhập hàng!");
        return;
    }

    money -= cost;
    product.stock += amount;

    addLog(`📦 Đã nhập ${amount} chai nước ngọt.`);
    updateScreen();
}

function putOnShelf() {
    const product = products["Nước ngọt"];

    if (product.stock <= 0) {
        addLog("📦 Kho đang hết hàng!");
        return;
    }

    if (product.shelf >= product.maxShelf) {
        addLog("🗄️ Kệ đã đầy!");
        return;
    }

    product.stock--;
    product.shelf++;

    addLog("🗄️ Đã đặt 1 chai nước ngọt lên kệ.");
    updateScreen();
}

function customerBuy() {
    const product = products["Nước ngọt"];

    if (product.shelf <= 0) {
        addLog("😟 Khách vào nhưng kệ đang hết hàng.");
        return;
    }

    const customer =
        customers[Math.floor(Math.random() * customers.length)];

    product.shelf--;
    money += product.sellPrice;

    addLog(
        `🛒 ${customer} đã mua 1 chai nước ngọt. +${product.sellPrice.toLocaleString("vi-VN")}đ`
    );

    updateScreen();
}

function onlineOrder() {
    const product = products["Nước ngọt"];
    const amount = 2;

    if (product.stock < amount) {
        addLog("📱 Không đủ hàng để xử lý đơn online!");
        return;
    }

    product.stock -= amount;

    const revenue = product.sellPrice * amount;
    money += revenue;

    addLog(
        `📱 Đơn online: bán ${amount} chai nước ngọt. +${revenue.toLocaleString("vi-VN")}đ`
    );

    updateScreen();
}

function endDay() {
    day++;

    addLog(`🌙 Đã kết thúc ngày. Chào ngày ${day}!`);

    updateScreen();
}

function addLog(message) {
    const log = document.getElementById("log");

    const item = document.createElement("div");
    item.textContent = message;

    log.prepend(item);
}

updateScreen();

addLog("🏪 Chào mừng bạn đến với Tiệm Tạp Hóa Nhỏ!");
