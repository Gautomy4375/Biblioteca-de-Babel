let boton = document.getElementById('volver');
let cargadorCon = document.getElementById('cargadorCon');

boton.addEventListener('click', function(event){
    event.preventDefault();

    if(boton){
        cargadorCon.style.display = 'block';
        setTimeout(() => {
            window.location.replace("../user_dashboard/user_dashboard.html"); 
        }, 3000);
        
    }

})