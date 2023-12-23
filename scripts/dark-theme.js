var button = document.querySelector('.mode-tog');
button.addEventListener('click', function () {
    document.body.classList.toggle('dark-theme');
    button.classList.toggle('active');
});