document.querySelector('.busca').addEventListener('submit', async (event) => { // Pegando o evento submit do Id .busca, e executa função que previne que o formulario seja enviado,  
    event.preventDefault();
    let input = document.querySelector('#searchInput').value;

    if (input !== '') {
        clearInfo();
        showWarning('Carregando..')

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=f8ebbd84ba6ea9a96de90aeae209da16&units=metric&lang=pt_br`;
        let results = await fetch(url);
        let json = await results.json(); // pega o resultado e transforma em Json, await é para aguardar 

        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
            console.log(json)
        }
        else {
            clearInfo();
            showWarning('não encontramos esta localização')
        }
    }
});

function showInfo(json) {
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>°C</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>Km/h</Span>`
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`;

    document.querySelector('.resultado').style.display = 'block';
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}