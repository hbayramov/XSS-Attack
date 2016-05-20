# XSS-Attack
Cross-Site Scripting Attack

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



