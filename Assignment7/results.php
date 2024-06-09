<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aggregate Results</title>

    <style>
        .result-bar{
            color: white;
            padding: 25px;
            margin-bottom: 5px;
            border: 1px black solid;
            padding-left: 5px;
        }

        .result-info{
            width: 150px;
            display: inline-block;
        }

        .result{
            margin-bottom: 10px;
        }
        body{
            padding:0;
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
            text-align: center;
            color:#DA321D;
        }
    </style>
</head>
<body>
    <?php
        $timesGot = array('Homer'=>0,'Marge'=>0,'Bart'=>0,'Lisa'=>0);

        $file = getcwd()."/data/data.txt";
        $data = file_get_contents($file);

        $lines = explode("\n", $data);
        $n = 0;

        for ($i=0;$i<sizeof($lines);$i++)
        {
            $line = $lines[$i];
            if ($line != ''){
                $timesGot["$line"]++;
                $n++;
            }
        }

        print "<h1>You've submitted this quiz a total of $n times!</h1>";

        $i=0;
        $arr = array("#2E63D7", "#9CCE51", "#EF5A4E", "#FF9400");
        if ($n!=0){    
            foreach($timesGot as $char => $count)
            {

                if ($char != ""){
                    $percent = intval(($count/$n)*100);
                    $color = $arr[$i];
                    print "<div class='result'>
                            <div class='result-info'>$char: $count vote(s)</div>
                            <div class='result-bar' style=\"width: $percent%; background-color: $color;\">$percent%</div>
                    </div>";
                    $i++;
                }
            }
        }
        else{
            print "<div class='result'>
                        <div class='result-info'>Homer: 0 vote(s)</div>
                        <div class='result-bar' style=\"width: 0%; background-color: #2E63D7;\">0%</div>
                </div>";
                print "<div class='result'>
                <div class='result-info'>Marge: 0 vote(s)</div>
                <div class='result-bar' style=\"width: 0%; background-color: #9CCE51;\">0%</div>
                </div>";
                print "<div class='result'>
                        <div class='result-info'>Bart: 0 vote(s)</div>
                        <div class='result-bar' style=\"width: 0%; background-color: #EF5A4E;\">0%</div>
                </div>";
                print "<div class='result'>
                        <div class='result-info'>Lisa: 0 vote(s)</div>
                        <div class='result-bar' style=\"width: 0%; background-color: #FF9400;\">0%</div>
                </div>";
        }
    ?>
    <a id="back" href="index.php">Back to Quiz</a>
</body>
</html>