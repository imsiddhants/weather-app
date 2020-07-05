const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const { error } = require('console')


console.log(__dirname)
console.log(path.join(__dirname),'../public')


const app=express()

//define paths to express config
const publicDirPath='../public'
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Set up static Directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:'Sid'
    })
})

app.get('/Help',(req,res)=>{
    res.render('help',{
        title:'Help section',
        name:'Sid'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About section',
        name:"Sid"
    })    
})

app.get('/Weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provide an address'
        })
    }
geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
    if(error){
        return res.send({error})
    }

    forecast(latitude,longitude,(error,forecastData)=>{
        if(error){
            return res.send({error})
        }
 
    res.send({
        forecastData,
        location
    })
})
})
})


app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
            
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send
        
    }
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Sid',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'4040',
        name:'Sid',
        errorMessage:'Page not found'
    
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})