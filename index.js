const express = require('express');
const app = express();
const users = require("./user.json");
const port = process.env.PORT||4000;
const ejs = require('ejs')
const models = require('./models')
const {Op} = require('sequelize')
const fs = require('fs')

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(express.static(__dirname + '/public'));

const readJson = fs.readFileSync('user.json');
const players = JSON.parse(readJson);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/users', (req, res) => {
  res.send({username:players[0].username, password:'******'});
});

app.get('/login', (req, res) => {
  res.render('login');
});


app.post('/login', (req, res) => {
  const {username, password} = req.body;

  if (username == players[0].username && password == players[0].password) {
    res.redirect('/index-game');
  } else if(username == players[1].username && password == players[1].password ) { 
    res.redirect('/dashboard');
  } 
});

app.get('/dashboard', async (req, res) => {
    const users = await models.UserGame.findAll({
        include: models.UserGameBio
    })
    res.render('dashboard', {
        users: users,
        
    });
})


app.get('/create-user', (req, res) => {
    res.render('create-user')
})

app.post('/save', async (req, res) => {
    const {username, password} = req.body;
    await models.UserGame.create({
        username: username,
        password: password,
    })
    res.redirect('/dashboard')
})

app.get('/add-biodata/:id', async (req, res) => {
    const {id} = req.params;
    const user = await models.UserGame.findOne({ 
        where: { 
            id: id 
        } 
    });
    res.render('add-user-biodata', { 
        user : user
    });
});

app.post('/add-biodata/:id', async (req, res) => {
    const {id} = req.params;
    const {UserGameId, dob, pob, city, gender } = req.body;
    await models.UserGameBio.create({
      UserGameId: id,
      dob: dob,
      pob: pob,
      city: city,
      gender: gender,
    });
    res.redirect("/dashboard");
})

app.get('/details/:id', async (req, res) => {
    const {id} = req.params;
    const user = await models.UserGame.findOne({
      where: {id: id},
    }) 
    const histories = await models.UserGameHistory.findAll({
      where: {UserGameId: id},
    })
    const biodata = await models.UserGameBio.findOne({
      where: {UserGameId: id},
    })
    res.render('details', {user,histories,biodata});
});

app.get('/delete/:id', async (req, res) => {
    const {id} = req.params;
    await models.UserGame.destroy({
        where: {
            id:id
        }
    })
    res.redirect('/dashboard')
})

app.get('/edit-user/:id', async (req, res) => {
    const {id} = req.params;
    const user = await models.UserGame.findOne({
        where: {
            id:id
        }
    })
    const biodata = await models.UserGameBio.findOne({
        where: {
            UserGameId : id
        }
    })
    res.render('edit-user', {
        user: user,
        biodata: biodata
    })
})

app.post('/update/:id', async (req,res) => {
    const {id} = req.params 
    const user = await models.UserGame.findOne({
        where: {
            id:id
        }
    })
    const biodata = await models.UserGameBio.findOne({
        where: {
            UserGameId : id
        }
    })
    await user.update(req.body);
    await biodata.update(req.body);
    res.redirect('/dashboard');
})

app.get('/index-game', (req, res) => {
  res.render('index-game');
});

models.sequelize.authenticate().then(() => {
    app.listen(port, () => {
        console.log(`Server connected at http://localhost:${port}`)
    })
}).catch(console.log)

