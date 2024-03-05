<?php
session_start();
$_SESSION['cha'] = substr(str_shuffle('123456789'), 0, 4);
$str = str_split($_SESSION['cha']);
asort($str);
$_SESSION['ans'] = '';
foreach ($str as $key => $value) {
    $_SESSION['ans'] .= $key;
}
