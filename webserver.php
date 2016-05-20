<?php

$host = "127.0.0.1";
$port = 6008;
set_time_limit(0);

$server = socket_create(AF_INET, SOCK_STREAM, 0) or die("Could not create socket\n");

$res = socket_bind($server,$host,$port) or die("Could not bind\n");
$res = socket_listen($server,3) or die("Could not listen\n");

while(true) {

$client = socket_accept($server) or die("Could not accept\n");
$input = socket_read($client, 1024*3);
$input = trim($input);

echo $input;
}

socket_close($client);
socket_close($server);

?>
