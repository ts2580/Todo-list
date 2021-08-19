let renderCurrentTime= () => {
	let now = new Date;
	let hour =  now.getHours();
	let minutes = now.getMinutes();
	let seconds = now.getSeconds();
	
	hour = hour < 10 ? "0"+ hour:hour;
	minutes = minutes < 10 ? "0"+ minutes:minutes;
	seconds = seconds < 10 ? "0"+ seconds:seconds;
	
	document.querySelector('.clock_text').innerHTML = `${hour}시 ${minutes}분 ${seconds}초`
};


let renderUser = e => {
	e.preventDefault;
	let inpName = document.querySelector('.inp_name');
	let username = inpName.value;
	localStorage.setItem('username',username);
	convertMainDiv(username);
}

let convertMainDiv = username =>{
	let inpName = document.querySelector('.inp_name');
		document.querySelector('.frm_name').className = 'frm_todo';
		document.querySelector('.username').innerHTML = username;
		inpName.value = '';
		inpName.placeholder = '할 일을 입력하세요';
		inpName.className = 'inp_todo';
	
		document.querySelector('.todo-list').style.display = 'flex';
		document.querySelector('.main').style.justifyContent= 'space-between';
		document.querySelector('.wrap_user').className= 'wrap_todo';
}

let registSchdule = () => {
	let todoList = JSON.parse(localStorage.getItem('todo'));
	let input = document.querySelector('.inp_todo').value;
	document.querySelector('.inp_todo').value = '';
	
	if(todoList){
		todoList.push({work:input});
		localStorage.setItem('todo',JSON.stringify(todoList));
	}else{
		todoList = [{work:input}];
		localStorage.setItem('todo',JSON.stringify(todoList));
	}
	
	renderSchedule(todoList.slide(0,7));
}

let renderSchedule = (todoList) => {
	document.querySelectorAll('.todo-list>div').forEach(e=>{
		e.remove();
	});
	
	todoList.forEach(e => {
		let workDiv = document.createElement('div');
		workDiv.innerHTML = e.work;
		document.querySelector('.todo-list').appendChild(workDiv);
	})
}

let renderPrevPage = () => {
	//현재 페이지 
	let curPage = document.querySelector('.current-page').textContent;
	let todoList = JSON.parse(localStorage.getItem('todo'));
	
	if(curPage < 2){
		alert("First Page");
		return;
	}
	
	let renderPage = Number(curPage) - 1;
	let end = renderPage*8;
	let begin = end - 8;
	
	renderSchedule(todoList.slice(begin,end));
	document.querySelector('.current-page').textContent = renderPage;
	
}

let renderNextPage = () => {
	//현재 페이지
	let curPage = document.querySelector('.current-page').textContent;
	let todoList = JSON.parse(localStorage.getItem('todo'));
	let lastPage = math.ceil(todoList.length/8);
	
	if(curPage >= lastPage){
		alert("Last Page");
		return;
	}
	
	let renderPage = Number(curPage)+ 1;
	let end = renderPage*8;
	let begin = end - 8;

	
	renderSchedule(todoList.slice(begin,end));
	document.querySelector('.current-page').textContent = renderPage;
	
}



(()=>{
	let username = localStorage.getItem('username');
	let todoList =JSON.parse(localStorage.getItem('todo'));
	
	if(username){
		convertMainDiv(username);
		document.querySelector('.frm_todo').addEventListener('submit',registSchdule);
		document.querySelector('#leftArrow').addEventListener('click',renderPrevePage)
		document.querySelector('#rightArrow').addEventListener('click',renderNextPage)
	}else{
		document.querySelector('.frm_name').addEventListener('submit',renderUser);
	}
	
	if(todoList){
		renderSchedule(todoList);
	}
	
	setInterval(renderCurrentTime,1000);
	
})();

