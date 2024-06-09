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
    <a href="add_form.php"><div class="tab selected">Add Movie</div></a>
    <a href="search_form.php"><div class="tab">Search Movies</div></a>
    <br> <br> <br>
    <?php
        if ($_GET['msg']=='success'){
            print "<div class='message'>Movie was added successfully!</div>";
        }
        else if ($_GET['msg']=='missing'){
            print "<div class='error'>Please fill in all fields!</div>";
        }
    ?>
    

    <form action="add_save.php" method="post">
        Title:<input type="text" id="title" name="title"></input><br>
        <br>
        Year:<input type="number" id="year" name="year"></input><br>
        <br>
        <input type="submit"></input>
    </form>
</body>
</html>