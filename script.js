// Smooth entrance animation for center content
window.onload = () => {
    document.querySelector('.center-content').style.opacity = 1;
    document.querySelector('.center-content').style.transform = "translateY(0)";
};

// (Optional) Add interactive GFX or animation enhancements below
document.querySelector('.legacy-btn').addEventListener('click', () => {
    alert('The Coca-Cola legacy is just a click away!');
});
