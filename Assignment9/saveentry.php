<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

  //$path = getcwd() . '/data';
  $path="/home/fd2190/databases";

  $db = new SQLite3($path.'/convos.db');

  // database contains a single table named 'messages' with the following properties:
  // id      INTEGER PRIMARY KEY AUTOINCREMENT
  // name  TEXT
  // message TEXT
  //chat Integer
  //time TEXT


  $text = $_POST['message'];
  $name = $_POST['username'];
  $chat = $_POST['chat'];
  $time = $_POST['time'];


  if ($text && $name && $chat) {

    $sql = "INSERT INTO convos (name, message,chat,time) VALUES (:name1, :text, :chat1, :time1)";
    $statement = $db->prepare($sql);
    $statement->bindParam(':name1', $name);
    $statement->bindParam(':text', $text);
    $statement->bindParam(':chat1', $chat);
    $statement->bindParam(':time1', $time);

    $statement->execute();

    $id = $db->lastInsertRowID();

    $db->close();
    unset($db);

    print ($id);
    exit();
  }

  print ("ERROR");
  exit();

 ?>
