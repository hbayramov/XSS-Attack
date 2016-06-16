

	listCookies();

	function listCookies() { 

		var theCookies = document.cookie.split(\';\'); 
		var aString = \'\'; 
		
		for (var i = 1 ; i <= theCookies.length; i++) { 
			aString += i + \' \' + theCookies[i-1] + \" \"; 
		} 
		
		console.Log(aString); 

	}
