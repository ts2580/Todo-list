/**
 * 
 */
let $ =  (selector, text, styleFnc)  => {
		let e = document.querySelector(selector);
		
		if(text){
			 e.innerHTML += `${text}<br>`;
		 }
		
		if(styleFnc){
			 styleFnc(e);
		 }
		
		return e;
	};