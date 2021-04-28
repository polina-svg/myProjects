const toggleSwitchMode = document.querySelector('.header__switch');

toggleSwitchMode.addEventListener('click', (event)=>{
 const body = document.querySelector("body");
 body.dataset.theme = !JSON.parse(body.dataset.theme)
})