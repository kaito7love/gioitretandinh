const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const menuIcon = document.getElementById("menu-icon");

menuBtn.addEventListener("click", () => {
    // 1. Chuyển đổi trạng thái ẩn/hiện của menu
    mobileMenu.classList.toggle("hidden");
    mobileMenu.classList.toggle("flex");

    // 2. Đổi icon từ Menu sang Close (X)
    if (mobileMenu.classList.contains("hidden")) {
        menuIcon.innerText = "menu";
    } else {
        menuIcon.innerText = "close";
    }
});

// 3. Tự đóng menu khi bấm vào một link bất kỳ
const navLinks = mobileMenu.querySelectorAll("a");
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        mobileMenu.classList.remove("flex");
        menuIcon.innerText = "menu";
    });
});

const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const btnText = document.getElementById("btnText");
const btnSpinner = document.getElementById("btnSpinner");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // ====== bật loading ======
    submitBtn.disabled = true;
    submitBtn.classList.add("opacity-70", "cursor-not-allowed");
    btnText.textContent = "Đang gửi...";
    btnSpinner.classList.remove("hidden");

    const params = new URLSearchParams();
    params.append("name", document.getElementById("name").value);
    params.append(
        "phone",
        document.getElementById("phone").value.replace(/\D/g, "")
    );
    params.append("activity", document.getElementById("activity").value);
    params.append("message", document.getElementById("message").value);

    try {
        const res = await fetch(
            "https://script.google.com/macros/s/AKfycbyO7zIhvfaixc0a4V3N_zfBRZuB423_cz3oGV4iNsjw-3hJ3UURiss2oWBTw_tyPSdU/exec",
            {
                method: "POST",
                body: params,
            }
        );

        if (res.ok) {
            showToast(
                "Thông tin đã được ghi nhận. Tụi mình sẽ sớm liên hệ với bạn."
            );
            form.reset();
        } else {
            showToast("Có lỗi xảy ra, vui lòng thử lại.", true);
        }
    } catch (err) {
        showToast("Không thể gửi dữ liệu. Kiểm tra kết nối.", true);
    } finally {
        // ====== tắt loading ======
        submitBtn.disabled = false;
        submitBtn.classList.remove("opacity-70", "cursor-not-allowed");
        btnText.textContent = "Gửi thông tin";
        btnSpinner.classList.add("hidden");
    }
});

const phoneInput = document.getElementById("phone");
phoneInput.addEventListener("input", () => {
    phoneInput.value = phoneInput.value.replace(/\D/g, "");
});

// function showToast(message, isError = false) {
//     const toast = document.getElementById("toast");
//     const msg = document.getElementById("toastMessage");

//     msg.textContent = message;

//     toast.classList.remove("hidden");
//     toast.classList.remove("bg-green-500", "bg-red-500");
//     toast.classList.add(isError ? "bg-red-500" : "bg-green-500");

//     setTimeout(() => {
//         toast.classList.add("hidden");
//     }, 3000);
// }
function showToast(message, isError = false) {
    const toast = document.getElementById("toast");
    const msg = document.getElementById("toastMessage");

    msg.textContent = message;

    // màu
    toast.classList.remove("bg-green-500", "bg-red-500");
    toast.classList.add(isError ? "bg-red-500" : "bg-green-500");

    // ====== slide IN ======
    toast.classList.remove("translate-x-full", "opacity-0");
    toast.classList.add("translate-x-0", "opacity-100");

    // ====== slide OUT ======
    setTimeout(() => {
        toast.classList.remove("translate-x-0", "opacity-100");
        toast.classList.add("translate-x-full", "opacity-0");
    }, 3000);
}
