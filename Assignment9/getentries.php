<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

  //$path = getcwd() . '/data';
  $path="/home/fd2190/databases";

  $db = new SQLite3($path.'/convos.db');

  // id      INTEGER PRIMARY KEY AUTOINCREMENT
  // name  TEXT
  // message TEXT
  //chat Integer
  //time TEXT

  $sql = "SELECT id,name,message,chat,time FROM convos";
  $statement = $db->prepare($sql);
  $result = $statement->execute();

  $send_back = array();

  while ($row = $result->fetchArray()) {

    $record = array();
    $record['id'] = $row['id'];
    $record['name'] = $row['name'];
    $record['message'] = $row['message'];
    $record['chat'] = $row['chat'];
    $record['time'] = $row['time'];

    array_push($send_back, $record);
  }


  $db->close();
  unset($db);

  print json_encode($send_back);
  exit();

 ?>