
var page = require('page');
var empty = require('empty-element');
var template = require('./template')
var request = require('superagent');
var header = require('../header');
var axios = require('axios');
var webcam = require('webcamjs');

page('/', header, loading, asyncLoad, function (ctx, next) {
    document.title= 'Michigram';
    var main = document.getElementById('main-container');  

    empty(main).appendChild(template(ctx.pictures));

    $('.modal-trigger').leanModal({
      ready: function () { //cuando se habra el modal
        webcam.attach('#camara-input');

      },
      complete: function () { // cuando se cierre el modal
        webcam.reset()
      }
    })
  })

  function loading(ctx,next) {
    var el = document.createElement('div');
    el.classList.add('loader');
    document.getElementById('main-container').appendChild(el);
    next();
  }

  // opciones de respuestas de servidor - request - Axios - Fetch - Async
  function loadpicture(ctx, next){
    request
      .get('/api/pictures')
      .end(function (err,res) {
        if(err) return console.log(err);

        ctx.pictures = res.body;
        next();
      })
  }

  function loadpictureAxios (ctx, next){
    axios
      .get('/api/pictures')
      .then(function (res) {
        ctx.pictures = res.data;
        next();
      })
      .catch(function (err){
        return console.log(err);
      })
  }

  function loadpictureFetch (ctx, next) {
    fetch('/api/pictures')
    .then(function (res) {
      return res.json();
    })
    .then(function (pictures) {
      ctx.pictures = pictures;
      next();
    })
    .catch(function (err){
      return console.log(err);
    })
  }

  async function asyncLoad(ctx, next) {
    try {
      var pictures = await fetch('/api/pictures').then(res => res.json())
      ctx.pictures = pictures;
      next();
    } catch (err) {
      return console.log(err);
    }
  }