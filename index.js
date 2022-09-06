const express = require('express');
const app = express();
const users = require("./user.json");
const port = process.env.PORT||4000;
const ejs = require('ejs')
const models = require('./models')
const {Op} = require('sequelize')

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/dashboard', async (req, res) => {
    // const searchUser = req.query.search_user;
    // let user;
    // if (!searchUser) {
    //     users = await models.UserGame.findAll()
    // } else {
    //    users = await models. UserGame.findAll({
    //     where: {
    //         username: {
    //             [Op.iLike]: `%${searchUser}%`
    //         }
    //     }
    //    })
    // }
    const users = await models.UserGame.findAll()
    res.render('dashboard', {
        users: users
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
      UserGameId: UserGameId,
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
    res.render('edit-user', {
        user: user
    })
})

app.post('/update/:id', async (req,res) => {
    const {id} = req.params 
    const user = await models.UserGame.findOne({
        where: {
            id:id
        }
    })
    await user.update(req.body);
    res.redirect('/dashboard');
})

models.sequelize.authenticate().then(() => {
    app.listen(port, () => {
        console.log(`Server connected at http://localhost:${port}`)
    })
}).catch(console.log)