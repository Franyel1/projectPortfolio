<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

//$path = getcwd() . '/data';
$path="/home/fd2190/databases";


$db = new SQLite3($path.'/convos.db');

// Database contains a single table named 'messages' with the following properties:
// id      INTEGER PRIMARY KEY AUTOINCREMENT
// username  TEXT
// message TEXT
// chat Integer

$chat = $_POST['chat'];


$sql = "DELETE FROM convos WHERE chat = :chat1";

$statement = $db->prepare($sql);

$statement->bindValue(':chat1', $chat, SQLITE3_INTEGER);

$result = $statement->execute();

$db->close();
?>
