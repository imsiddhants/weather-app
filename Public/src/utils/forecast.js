
const request=require('request')

const forecast = (latitude, longitude, callback) => {
    const url='http://api.weatherstack.com/current?access_key=a026542b3bc0c16e66afed08c9ef97b6&query='+ latitude + ','+ longitude
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to the weather services',undefined)
        }else if(body.error){
            callback('Unable to find the location',undefined)
        }else{
            callback(undefined,'It is currently '+body.current.temperature + ' degree out. And feels like  '+ body.current.feelslike )
        }
    })
}
module.exports=forecast