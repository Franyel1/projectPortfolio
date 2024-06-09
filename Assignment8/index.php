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
        .message{
            width:270px;
            border: 1px black solid;
            height: 30px;
            background-color: #9ACEDC;
            display:flex;
            align-items: center;
            justify-content:center;
            margin: 10px;
        }
    </style>
</head>
<body>
    <h1>My Movie Database</h1>
    <a href="index.php"><div class="tab selected">View All</div></a>
    <a href="add_form.php"><div class="tab">Add Movie</div></a>
    <a href="search_form.php"><div class="tab">Search Movies</div></a>

    <?php
    //change this later
    //$path = getcwd() . '/databases';
    //$path = "/home/fd2190/databases";


    $db = new SQLite3($path.'/movies.db');
    // database contains a single table named 'movies' with the following properties:
    // id      INTEGER PRIMARY KEY AUTOINCREMENT
    // title  TEXT
    // year INTEGER

    if (!$db) {
        die("Connection failed: " . $db->lastErrorMsg());
    }

    
    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['delete_id'])) {
        $delete_id = $_POST['delete_id'];

        $sql_delete = "DELETE FROM movies WHERE id = :delete_id";
        $statement_delete = $db->prepare($sql_delete);

        $statement_delete->bindValue(':delete_id', $delete_id, SQLITE3_INTEGER);
        $result_delete = $statement_delete->execute();

        if (!$result_delete) {
            die("Error deleting movie: " . $db->lastErrorMsg());
        }

        header("Location: index.php?del=success");
        exit();
    }
    if ($_GET['del']=='success'){
            print "<br><br><div class='message'>Movie was deleted successfully!</div>";
        }

    $sql = "SELECT title, year,id FROM movies";

    $result = $db->query($sql);

    if (!$result) {
        die("Error executing query: " . $db->lastErrorMsg());
    }

    if ($_GET['del']!='success'){
        print "<br><br><br>";
    }
    print "<table border='1'>";
    print "<tr><th style='width:300px;'>Title</th><th style='width:50px;'>Year</th><th>Options</th></tr>";

    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        print "<tr>";
        print "<td>" . $row['title'] . "</td>";
        print "<td>" . $row['year'] . "</td>";
        print "<td>
                <form method='post' action='index.php'>
                    <input type='hidden' name='delete_id' value='" . $row['id'] . "'>
                    <button type='submit'>Delete</button>
                </form>
              </td>";
        print "</tr>";
    }

    print "</table>";

    $db->close();

?>


</body>
</html>