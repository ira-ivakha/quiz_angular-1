<?php
/*
$name = trim($_POST['name']);
$message = trim($_POST['message']);
$email = trim($_POST['email']);

print_r($_POST);
*/
//$mail = "Name: $name \n Email: $email \n Message: $message";
$mail = "Name: \n Email: \n Message:";
$title = "New feedback from  ";

$to= "Irka <irusya.d@mail.ru>" . ", " ; //обратите внимание на запятую
$to .= "Kelly <irusja_vd@ua.fm>";

//mail($to, $title, $mail, "Content-type: text/plain; charset=\"utf-8\"\n From: $to");
echo($mail);

$config['smtp_username'] = 'iryna.ivakha';
$config['smtp_port'] = '465';
$config['smtp_host'] = 'smtp.mail.ru';
$config['smtp_password'] = '120879bhf';
$config['smtp_debug'] = false;
$config['smtp_charset'] = 'Windows-1251';
$config['smtp_from'] = 'Mail sender';

print base64_encode("irusya.d");
print '<br>';
print base64_encode("120879bhf");

function get_data($smtp_conn)
{
    $data="";
    while($str = fgets($smtp_conn,515))
    {
        $data .= $str;
        if(substr($str,3,1) == " ") { break; }
    }
    return $data;
}

$header="Date: ".date("D, j M Y G:i:s")." +0700\r\n";
$header.="From: =?windows-1251?Q?".str_replace("+","_",str_replace("%","=",urlencode('Admin')))."?= <irusya.d@mail.ru>\r\n";
$header.="X-Mailer: The Bat! (v3.99.3) Professional\r\n";
$header.="Reply-To: =?windows-1251?Q?".str_replace("+","_",str_replace("%","=",urlencode('Admin')))."?= <irusya.d@mail.ru>\r\n";
$header.="X-Priority: 3 (Normal)\r\n";
$header.="Message-ID: <172562218.".date("YmjHis")."@mail.ru>\r\n";
$header.="To: =?windows-1251?Q?".str_replace("+","_",str_replace("%","=",urlencode('Client')))."?= <irusja_vd@ua.fm>\r\n";
$header.="Subject: =?windows-1251?Q?".str_replace("+","_",str_replace("%","=",urlencode('message from user')))."?=\r\n";
$header.="MIME-Version: 1.0\r\n";
$header.="Content-Type: text/plain; charset=windows-1251\r\n";
$header.="Content-Transfer-Encoding: 8bit\r\n";

$text=$mail;

$smtp_conn = fsockopen("smtp.mail.ru", 465,$errno, $errstr, 100);
if(!$smtp_conn) {print "error connection"; fclose($smtp_conn); exit;}
$data = get_data($smtp_conn);
fputs($smtp_conn,"HELO mail.ru\r\n");
$code = substr(get_data($smtp_conn),0,3);
if($code != 250) {print "error EHLO"; fclose($smtp_conn); exit;}
fputs($smtp_conn,"AUTH LOGIN\r\n");
$code = substr(get_data($smtp_conn),0,3);
if($code != 334) {print "сервер не разрешил начать авторизацию"; fclose($smtp_conn); exit;}

fputs($smtp_conn,base64_encode("login")."\r\n");
$code = substr(get_data($smtp_conn),0,3);
if($code != 334) {print "ошибка доступа к такому юзеру"; fclose($smtp_conn); exit;}


fputs($smtp_conn,base64_encode("password")."\r\n");
$code = substr(get_data($smtp_conn),0,3);
if($code != 235) {print "не правильный пароль"; fclose($smtp_conn); exit;}

fputs($smtp_conn,"MAIL FROM:login@mail.ru\r\n");
$code = substr(get_data($smtp_conn),0,3);
if($code != 250) {print "сервер отказал в команде MAIL FROM"; fclose($smtp_conn); exit;}

fputs($smtp_conn,"RCPT TO:qwe@asd.ru\r\n");
$code = substr(get_data($smtp_conn),0,3);
if($code != 250 AND $code != 251) {print "Сервер не принял команду RCPT TO"; fclose($smtp_conn); exit;}

fputs($smtp_conn,"DATA\r\n");
$code = substr(get_data($smtp_conn),0,3);
if($code != 354) {print "сервер не принял DATA"; fclose($smtp_conn); exit;}

fputs($smtp_conn,$header."\r\n".$text."\r\n.\r\n");
$code = substr(get_data($smtp_conn),0,3);
if($code != 250) {print "ошибка отправки письма"; fclose($smtp_conn); exit;}

fputs($smtp_conn,"QUIT\r\n");
fclose($smtp_conn);
?>