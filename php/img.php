<?php
session_start();
$im = imagecreate(20, 20);
$bg = imagecolorallocate($im, 255, 255, 153);
$ft = imagecolorallocate($im, 0, 0, 0);
imagestring($im, 5, 2, 2, substr($_SESSION['cha'], $_GET['i'], 1), $ft);
header('Content-Type: image/png');
imagepng($im);
imagedestroy($im);
