<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        if (isset($_POST['title']) && isset($_POST['year']) && !empty($_POST['title']) && !empty($_POST['year'])) {
         
            $title = $_POST['title'];
            $year = $_POST['year'];


            //$path = getcwd() . '/databases/movies.db';
            $path = "/home/fd2190/databases/movies.db";
            $db = new SQLite3($path);

            if (!$db) {
                header("Location: add_form.php?msg=missing");
            }

            $sql = "INSERT INTO movies (title, year) VALUES (:title, :year)";

            $statement = $db->prepare($sql);

            if (!$statement) {
                header("Location: add_form.php?msg=missing");
            }

            $statement->bindValue(':title', $title, SQLITE3_TEXT);
            $statement->bindValue(':year', $year, SQLITE3_INTEGER);
            $result = $statement->execute();

            if (!$result) {
                die("Error executing query: " . $db->lastErrorMsg());
            }

            $db->close();

            header("Location: add_form.php?msg=success");
            exit();
        } else {
            header("Location: add_form.php?msg=missing");
        }
    }
?>
