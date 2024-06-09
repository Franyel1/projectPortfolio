<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Macro 8</title>
    <style>
        .tab{
            border: 1px black solid;
            color:blueviolet;
            padding: 10px;
            width:fit-content;
            float:inline-start;
            margin-right: 10px;
            cursor: pointer;
        }
        .selected{
            background-color: lightgray;
        }
        .error{
            width:270px;
            border: 1px black solid;
            height: 30px;
            background-color: #FF7769;
            display:flex;
            align-items: center;
            justify-content:center;
            margin: 10px;
            color: white;
        }
    </style>
</head>
<body>
    <h1>My Movie Database</h1>
    <a href="index.php"><div class="tab">View All</div></a>
    <a href="add_form.php"><div class="tab">Add Movie</div></a>
    <a href="search_form.php"><div class="tab selected">Search Movies</div></a>
    <br><br><br>
    <?php
        if ($_GET['msg'] == 'notFound') {
            print "<div class='error'>Movie not found</div>";
        }
    ?>
    
    <form action="search_form.php" method="post">
        Title:<input type="text" id="searchTitle" name="searchTitle"></input><br>
        <br>
        Year:<input type="number" id="searchYear" name="searchYear"></input><br>
        <br>
        <input type="submit"></input>
        <br><br>
    </form>
    <?php

        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $searchTitle = $_POST['searchTitle'];
            $searchYear = $_POST['searchYear'];

            //$path = getcwd() . '/databases';
            $path = "/home/fd2190/databases";

            // open database
            $db = new SQLite3($path.'/movies.db');
            // database contains a single table named 'movies' with the following properties:
            // id      INTEGER PRIMARY KEY AUTOINCREMENT
            // title  TEXT
            // year INTEGER
        
            if (!$db) {
                die("Connection failed: " . $db->lastErrorMsg());
            }
            $sql = "SELECT title, year,id FROM movies";

            $result = $db->query($sql);

            if (!$result) {
                die("Error executing query: " . $db->lastErrorMsg());
            }


            $once2 = true;
            $found = false;
            if($searchTitle !="" && $searchYear != "") {
                while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
                    if (strpos($row['title'], $searchTitle) !== false && $searchYear == $row['year']){
                        if ($once2)
                        {
                            print "<h3>Movie Search:</h3>";
                            $once2 = false;
                        }
                        print"<li>".$row['title']."(".$row['year'].")</li>";
                        $found = true;
                    }

                }
                if (!$found) {
                    $db->close();
                    header("Location:search_form.php?msg=notFound");
                }
            }

            else{
                if ($searchTitle !=""){
                    $once1 = true;
                    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
                        if (strpos($row['title'], $searchTitle) !== false){//str_contains($row['title'],$searchTitle)){
                            if ($once1)
                            {
                                print "<h3>Title Search:</h3>";
                                $once1 = false;
                            }
                            print"<li>".$row['title']."(".$row['year'].")</li>";
                        } 

                    }
                }
                print"<br>";
                if ($searchYear !=""){
                    $once = true;
                    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
                        if ($searchYear == $row['year']){
                            if ($once)
                            {
                                print "<h3>Year Search:</h3>";
                                $once = false;
                            }
                            print"<li>".$row['title']." (".$row['year'].")</li>";
                        } 

                    }
                }
            }

            $db->close();

         }
         
    ?>


</body>
</html>