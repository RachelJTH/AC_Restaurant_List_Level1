
// initiate and basic setting
const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000


// setting the main template
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars') // to set the template engine, handlebars

// setting external dataset
const restList = require('./restaurant.json')

// setting every routes to use the static file, 'public' which includes bootstrap and popper, etc.
app.use(express.static('public'))


// set the main page
app.get('/restaurants', (req, res) => {
    res.render('index', {rests:restList.results})
})

// show the details
app.get('/restaurants/:id', (req, res) => {
    const id = req.params.id
    const detail = restList.results.find(rest => rest.id.toString() === id)
    res.render('show', {detail: detail})
})

// req.query (of Express package)
app.get('/search', (req,res) =>{
    const keyword = req.query.keyword.toLowerCase().trim() // remove space
    const searchResult = restList.results.filter(rest =>  rest.name.toLowerCase().includes(keyword.toLowerCase()) || rest.category.toLowerCase().includes(keyword.toLowerCase()))
    if (searchResult.length === 0){
        const message = `查詢的關鍵字，無搜尋結果; 請重新搜尋其他關鍵字或點擊"確認"鍵，返回主畫面`
        res.render('index', {message, keyword})
    }else{
        res.render('index', {rests: searchResult, keyword: keyword})
    }
})

// start and listen on the Express Server
app.listen(port, () => {
    console.log(`Express is listened on localhost:${port}`)
})
