<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Macro 7</title>
    <style>
        body{
            font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
            font-weight: bold;
            background-color: #f3fcfd;
            color:#FFA096;
            display:flex;
            flex-direction: column;
            align-items: center;
            padding-top: 50px;
            font-size: 20px;
        }
        h1{
            color:#DA321D;
        }
        #job,#food, #hobby,#fear{
            width:250px;
        }
        #button{
            background-color: #DA321D;
            color:white;

            cursor:pointer;
            border-radius: 7px;
        }
        hr{
            height:5px;
            background-color: white;
        }
        .error{
            background-color: red;
            display:flex;
            justify-content: center;
            width: 250px;
            color: white;
            padding: 10px;
            margin-top: 20px;
            margin-bottom: 20px;
        }
        .card{
            padding: 20px;
            width: 300px;
            height:500px;
            border-radius: 10px;
            border: 5px solid black;
            display:flex;
            flex-direction: column;
            align-items: center;

        }
        .card img{
            margin-top: 20px;
            margin-bottom: 20px;
        }

    </style>
</head>
<body>
    <h1>Which Simpson Character Am I?</h1>
    <?php

    if ($_GET["msg"] == "missing") {
        print("<div class='error'>Please fill all fields!</div>");
    }
    else{
        $_GET["msg"] = 'success';
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if ($_POST['job']!='selectOne' && $_POST['food']!='selectOne' && $_POST['hobby']!='selectOne' && $_POST['fear']!='selectOne') {
            $job = $_POST['job'];
            $food = $_POST['food'];
            $hobby = $_POST['hobby'];
            $fear = $_POST['fear'];

            $points = array('Homer'=>0,'Marge'=>0,'Bart'=>0,'Lisa'=>0);
            $points[$job]++;
            $points[$food]++;
            $points[$hobby]++;
            $points[$fear]++;

            $winner="Homer";
            $winnerPoints=0;
            foreach ($points as $key => $val) {
                if ($val > $winnerPoints) {
                    $winnerPoints = $val;
                    $winner = $key;
                }
            }
            $file = getcwd()."/data/data.txt";
            file_put_contents($file, $winner."\n", FILE_APPEND);
            setcookie("pastWinner", $winner);

            header("Location: index.php");
            exit();
        } else {
            header("Location: index.php?msg=missing");
            exit();
        }
    }

    if ($_COOKIE['pastWinner'] != "") {
        $pastWinner = $_COOKIE["pastWinner"];
        print "<div class='card'>
                You are $pastWinner!
                <img src='images/$pastWinner.png'>
                <form action='index.php'method='POST'>
                    <button name='tryAgain' value='yes' type='submit'>Try Again?</button>
                </form>
              </div>
              <a id='aggregate' href='results.php'>See Aggregate Results</a>";
        unset($_COOKIE["pastWinner"]);
    } else {
        print '<form action="index.php" method="POST">
                What is your ideal job?<br>
                <select name="job" id="job">
                    <option value="selectOne">Select a job</option>
                    <option value="Homer">Working at a Bakery</option>
                    <option value="Marge">French tutor</option>
                    <option value="Bart">Prank Phone Call Operator</option>
                    <option value="Lisa">College Professor</option>
                </select><br><br>
                What is your favorite food?<br>
                <select name="food" id="food">
                    <option value="selectOne">Select a food</option>
                    <option value="Homer">Donuts</option>
                    <option value="Marge">Apple pie</option>
                    <option value="Bart">Krusty Flakes</option>
                    <option value="Lisa">Anything Organic and locally sourced</option>
                </select><br><br>
                What is your favorite hobby?<br>
                <select name="hobby" id="hobby">
                    <option value="selectOne">Select a hobby</option>
                    <option value="Homer">Watching TV</option>
                    <option value="Marge">Knitting</option>
                    <option value="Bart">Skateboarding</option>
                    <option value="Lisa">Reading</option>
                </select><br><br>
                What is your biggest fear?<br>
                <select name="fear" id="fear">
                    <option value="selectOne">Select a fear</option>
                    <option value="Homer">Sock puppets</option>
                    <option value="Marge">Flying</option>
                    <option value="Bart">I\'m fearless, man</option>
                    <option value="Lisa">Getting anything below an A in school</option>
                </select><br><br>
                <button type="submit" id="button">What Simpsons Character am I?</button>
            </form><br>
            <a id="aggregate" href="results.php">See Aggregate Results</a>';
    }
?>

    

</body>
</html>