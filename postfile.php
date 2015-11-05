<?php
$answer = json_decode($_POST['message']);
print $_POST['message'];
//$answer = json_decode(file_get_contents('php://input'), true);
//$answer = json_decode(file_get_contents('quizzz.json'), true);
/*{
$fd = fopen("quiz.json", 'w') or die("не удалось создать файл");
$str = $answer;
fwrite($fd, $str);
fclose($fd);
echo json_encode('answer');
};*/
//echo json_encode($answer);
if(isset($answer['quiz']))
{
    $quiz=$answer['quiz'][0];
    echo json_encode($quiz);
    $fd = fopen("quizz.json", 'w') or die("не удалось создать файл");
    $str =  json_encode($answer);
    echo $str;
    fwrite($fd, $str);
    fclose($fd);

}
else
{
    echo "Incorrect datas";
}

?>