var express = require('express');
var multer  = require('multer');
var ext = require('file-extension');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, + Date.now() + '.' + ext(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage }).single('picture')


var app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));  // la carpeta publica siempre va a estar disponible

app.get('/', function(req, res) {
    res.render('index', { title: 'Michigram'});
})

app.get('/signup', function(req, res) {
    res.render('index', { title: 'Michigram - Signup'});
})

app.get('/signin', function(req, res) {
    res.render('index', { title: 'Michigram - Signin'});
})

app.get('/api/pictures', function (req, res) {
    var pictures = [
        {
          user: {
            username: 'Francisco',
            avatar: 'https://scontent.faep9-1.fna.fbcdn.net/v/t1.0-9/26815039_10204312378005877_2939536829102324426_n.jpg?_nc_cat=0&_nc_eui2=v1%3AAeFYklwJEsp8GAveRa8faln0mKDwefD8NIbIwyf5JELgtPG2kuab5GgegSlsl-B-WjpfckDWW8FjuCASvBylIj-fGqKX8lJzB3CKoMEfuTEeUQ&oh=2c559d22c3a2913e8f5d755046719a4c&oe=5B3F44B7'
          },
          url: 'https://scontent.faep9-1.fna.fbcdn.net/v/t31.0-8/28946985_10204609040782261_4970723639834855034_o.jpg?_nc_cat=0&_nc_eui2=v1%3AAeF-XxQw-xfaNCRgod8pRkVf0uBNNeqp2zbhXxzbYpXnSEzFtS_X9cjKQplmjBIkzkzHVi_uzuR2sfP7OYfA-yBzgjQbAQl4hXouCdAWld7bTQ&oh=d17df864ead479fec1c7b82b7bb06b22&oe=5B4AC227',
          likes: 0,
          liked: false,
          createdAt: new Date().getTime()
        },
        {
          user: {
            username: 'Francisco',
            avatar: 'https://scontent.faep9-1.fna.fbcdn.net/v/t1.0-9/26815039_10204312378005877_2939536829102324426_n.jpg?_nc_cat=0&_nc_eui2=v1%3AAeFYklwJEsp8GAveRa8faln0mKDwefD8NIbIwyf5JELgtPG2kuab5GgegSlsl-B-WjpfckDWW8FjuCASvBylIj-fGqKX8lJzB3CKoMEfuTEeUQ&oh=2c559d22c3a2913e8f5d755046719a4c&oe=5B3F44B7'
          },
          url: 'https://scontent.faep9-1.fna.fbcdn.net/v/t31.0-8/28954060_10204609041502279_3681249533660906147_o.jpg?_nc_cat=0&_nc_eui2=v1%3AAeH5Eik3IHOyv_0tsOrzUQe6aqrUAdwVPLhDL0Enwqs2BUyb43vX0oBHOAUkVLr-SBOfO75jF1dj9RaSI2vYb4jBvbj7Nz25gCjhWuUZbEjKDA&oh=02959447307d3b91ce781a7386a32450&oe=5B36B2B0',
          likes: 1,
          liked: true,
          createdAt: new Date().getTime()
        }
      ];
      setTimeout( () => res.send(pictures), 2000) 
});

app.post('/api/pictures', function (req, res) {
    upload(req, res, function(err) {
        if(err) {
            res.send(500, "Error uploading file");
        }
        res.send("file uploaded");
    })
})

app.get('/api/user/:username', function (req, res){
    const user = {
        username: 'Francisco',
        avatar: 'https://scontent.faep9-1.fna.fbcdn.net/v/t1.0-9/26815039_10204312378005877_2939536829102324426_n.jpg?_nc_cat=0&_nc_eui2=v1%3AAeFYklwJEsp8GAveRa8faln0mKDwefD8NIbIwyf5JELgtPG2kuab5GgegSlsl-B-WjpfckDWW8FjuCASvBylIj-fGqKX8lJzB3CKoMEfuTEeUQ&oh=2c559d22c3a2913e8f5d755046719a4c&oe=5B3F44B7',
        description: 'Siempre crei que los gatos eran para maricas que viven en departamentos. Hasta que mi vida fue salvada por este adorable gatito.',
        pictures: [ 
            {
                id: 1,
                src: 'https://scontent.faep9-1.fna.fbcdn.net/v/t31.0-8/28954060_10204609041502279_3681249533660906147_o.jpg?_nc_cat=0&_nc_eui2=v1%3AAeH5Eik3IHOyv_0tsOrzUQe6aqrUAdwVPLhDL0Enwqs2BUyb43vX0oBHOAUkVLr-SBOfO75jF1dj9RaSI2vYb4jBvbj7Nz25gCjhWuUZbEjKDA&oh=02959447307d3b91ce781a7386a32450&oe=5B36B2B0',
                likes: 8,
            },
            {
                id: 2,
                src: 'https://scontent.faep9-1.fna.fbcdn.net/v/t31.0-8/28946985_10204609040782261_4970723639834855034_o.jpg?_nc_cat=0&_nc_eui2=v1%3AAeF-XxQw-xfaNCRgod8pRkVf0uBNNeqp2zbhXxzbYpXnSEzFtS_X9cjKQplmjBIkzkzHVi_uzuR2sfP7OYfA-yBzgjQbAQl4hXouCdAWld7bTQ&oh=d17df864ead479fec1c7b82b7bb06b22&oe=5B4AC227',
                likes: 4,
            },
            {
                id: 3,
                src: 'https://scontent.faep9-1.fna.fbcdn.net/v/t1.0-9/29595460_1786770638057215_6893713652254214256_n.jpg?_nc_cat=0&_nc_eui2=v1%3AAeFFQo88TG3d3il4E9dDcec55t94CHOOZ1oU1Prr9eir7jm7cvRCfc0Z8mT5IDFHiqtJvrmZivfkno8nWvfy9ofs8w0R6TChMBs81NKKh0g7JA&oh=69820d5b1140eba22f7fa2090663298a&oe=5B6F7FD3',
                likes: 7,
            },
            {
                id: 4,
                src: 'https://scontent.faep9-1.fna.fbcdn.net/v/t1.0-9/29542304_1932305396793401_7932047361494931671_n.jpg?_nc_cat=0&_nc_eui2=v1%3AAeFPaOn83o7W38g-Gn-3SzxHvv8u-2UIyIrFbTteLByToFh8N46dMufay6XPeoFvFYX6P6qHfwuCc12Fc8SpFF2iP0zPBfwlAXYCAbL-fXt41g&oh=65cabb2588fffb92760e891152db10f9&oe=5B40C9B6',
                likes: 6,
            }
        ]
    }
    res.send(user);
})

app.get('/:username', function (req, res) {
    res.render('index', { title: 'Michigram - ${req.params.username}'});
})

app.listen(3000, function(err) {
    if(err) return console.log("Hubo un error"), process.exit(1);

    console.log('Escuchando en el puerto 3000')
})