// Typing Animation Function
function typeWriter(text, elemId, speed = 36, cb = null) {
    let i = 0;
    const elem = document.getElementById(elemId);
    elem.innerHTML = '';
    function typing() {
        if (i < text.length) {
            elem.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        } else if (cb) {
            cb();
        }
    }
    typing();
}

window.onload = () => {
    // Animated typing for title and subdesc
    typeWriter("Open Happiness", "typeOpen", 62, () => {
        typeWriter(
            "Experience the timeless taste that has brought joy to billions across 200+ countries for over 138 years. From a small pharmacy in Atlanta to the world's most beloved beverage.",
            "typeDesc", 20
        );
    });

    // Animated Coca-Cola logo color cycling (if using PNG with transparency)
    const logo = document.getElementById('cocaLogo');
    let colors = [
        'drop-shadow(0 4px 20px #DD0404) brightness(1)',
        'drop-shadow(0 6px 30px #000) grayscale(1) brightness(2.2)',
        'drop-shadow(0 4px 40px #fff) grayscale(1) brightness(20)'
    ];
    let idx = 0;
    setInterval(() => {
        logo.style.filter = colors[idx];
        idx = (idx + 1) % colors.length;
    }, 1300);
};

// Optional: Add more GFX/animations as desired!
document.querySelector('.legacy-btn').addEventListener('click', () => {
    alert('The Coca-Cola legacy is just a click away!');
});
