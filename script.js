
document.getElementById('form').addEventListener('Submit', e => {
    e.prevetDefault();
    const comentario = document.getElementById('comentarios').value;
    const nuevoElemento = document.createElement('p');
    nuevoElemento.textContent = `comentarios: ${comentario}`;
    document.getElementById('resultado').appendChild(nuevoElemento);
    alert('hola')
});

document.querySelector('.linea').addEventListener('click', function(){
    const menu = document.querySelector('.nav-list li');
    menu.classList.toggle('active');
})