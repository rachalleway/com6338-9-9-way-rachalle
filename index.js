const API = "1f4dba8c56850c568cf9b904cf6c79ea"
const div = document.createElement('div')
const weather = document.getElementById('weather')
const form = document.querySelector('form')
const search = document.getElementById('weather-search')

//main function
form.onsubmit = async e => {
    e.preventDefault()
    weather.prepend(div)
    const input = document.querySelector('input')
    const location = input.value.trim()
    if ((!location) || (search.value = '')) {
        location = ''
        div.innerHTML = ''
        search.value = ''
    }try{
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${API}`)
//location not found
        if (res.status !== 200) throw new Error('Location not Found')
        const data = await res.json()
        showData(data)
    } catch (err) {
        div.innerHTML = err.message
    }
}

//display info 
//should have: city, country, location map, weather icon, temp, feeks like, time
function showData({
    dt,
    main: {
        temp,
        feels_like
    },
    name,
    sys: {
        country
    },
    coord: {
        lat,
        lon
    },
    weather: [{
        icon,
        description
    }]
}) 

{
    const locationMap = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`
    const date = new Date((dt) * 1000)
    const time = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    })

    search.value = ''
    div.innerHTML =
        `<h2> ${name}, ${country} </h2>
    <a href = "${locationMap}" target="_BLANK">Click to View Map</a>
    <img src= "https://openweathermap.org/img/wn/${icon}@2x.png" alt="${name}"> </img>
    <p style="text-transform: capitalize">${description} </p>
    <p> Current: ${temp} °F  </p>
    <p> Feelslike: ${feels_like} °F </p>
    <p> Last Updated:${time} </p>`
}