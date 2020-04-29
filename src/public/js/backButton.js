const backButton = document.getElementById('back-button')
if(window.location.pathname =='/menuppal' || window.location.pathname=='/usuarios/login' || window.location.pathname=='/'){
    backButton.style.display = 'none'
}else{
    backButton.style.display= 'block'
}