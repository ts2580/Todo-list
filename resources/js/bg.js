let getBackgroundImage = async () => {
	
	// 일단 bg-log 찍자.
	// 새로 이미지 뿌릴때 1. 만료시간 이후, 첨 들어올떄.
	let prevBackground = JSON.parse(localStorage.getItem('bg-log'));
	
	
	if(prevBackground && (prevBackground.expireOn > Date.now())){
		return prevBackground.imgInfo;
	}
	
	let response = await fetch('https://api.unsplash.com/photos/random/',{
		method:'get',
		headers:{Authorization: 'Client-ID NjOf2G5G_epNkkE7qr_AZqvhdqgdi3GB1Hf-PyQAafs'}
	});
	let obj = await response.json();
	
	
	
	let imageObj = {
		img :obj.urls.full,
		place: obj.location.title
	}
	// 이미지 하루에 한번만 바꾸도록 할꺼임.
	insertBackgroundLog(imageObj);
	
	return imageObj;
};


let requestBackground = async() => {
	
}


let insertBackgroundLog = imageObj =>{
	
	let expirationDate = new Date();
	expirationDate = expirationDate.setSeconds(expirationDate.getSeconds()+5);
	
	const backgroundLog = {
		expireOn : expirationDate,
		imgInfo : imageObj
	};
	
	localStorage.setItem('bg-log', JSON.stringify(backgroundLog));
	
}

let getCoords = () => {
	if(!navigator.geolocation) {
		return new Promise((resolve,reject)=>{
			reject();
		})
		} else {
			return new Promise((resolve, reject) => {
				navigator.geolocation.getCurrentPosition((position) => {
				resolve(position.coords);
			});
		})}
}

let getLocationTemp = async() => {
		const OPEN_WEATHER_API='c03f7ffee1d562f53ed8fcadfe5e83b8';
		
		let coords = await getCoords();
		
		let params = {
				lat:coords.latitude,
				lon:coords.longitude,
				appid:OPEN_WEATHER_API,
				units:'metric ',
				lang:'kr'
				
		}
		let queryString = createQueryString(params);
		let url = `https://api.openweathermap.org/data/2.5/weather${queryString}`;
		
		let response = await fetch(url);
		let obj = await response.json();
		
		return {
			temp : obj.main.temp,
			place : obj.name
		}
		
	};
	
(async () =>{
	
	// 배경이미지와 이미지의 위치정보 랜더링
	let background = await getBackgroundImage();
	console.dir(background.img);
	document.querySelector('body').style.backgroundImage = `url(${background.img})`;
	
	if(background.place){
		document.querySelector('.footer_text').innerHTML = background.place;
	}
	
	// 지역과 기온 랜더링
	let locationTemp = await getLocationTemp();
	document.querySelector('.location_text').innerHTML = parseInt(locationTemp.temp- 273.15) + 'º @ ' + locationTemp.place;
	
})();
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
