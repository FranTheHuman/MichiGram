import page from 'page'
import header from '../header'
import empty from 'empty-element'//para vaciar la pagina del contenido que tenia antes
import template from './template'


page('/:username', header, loadUser, function(ctx,next) {
    document.title= ctx.params.user;
    var main = document.getElementById('main-container');  
    empty(main).appendChild(template(ctx.user)) /* El atributo params de ctx 
    lo setea Page.js con un objeto en el que carga todo lo que matchee con la ruta.
    En este caso la ruta tenía el parámetro :username así que ese es el nombre que va 
    a tener dentro de ctx.params.*/
    $('.modal-trigger').leanModal()
});

page('/:username/:id', loadUser, function(ctx, next){
	var main = document.getElementById('main-container');
    document.title= ctx.params.user;
    empty(main).appendChild(template(ctx.user));	
	 $(`#modal${ctx.params.id}`).openModal({
        dismissible: true,
        complete: function () {
          page(`/${ctx.params.username}`)
        }
      });
    });

async function loadUser(ctx, next) {
    try{
        ctx.user = await fetch('/api/user/${ctx.params.username}').then(res => res.json())
        next()
    }
    catch (err){
        console.log(err)
    }
} 