<?php
session_start();
date_default_timezone_set('Asia/Taipei');
$mysqli = new mysqli('localhost', 'admin', '1234', 'db_nsrc_54t');
$data = json_decode(file_get_contents('php://input'), true);

if ($_GET['cmd'] == 'getMs') {
    echo json_encode($mysqli->query("select * from ms join user on ms.fk = user.id order by top desc, ms.update_at desc")->fetch_all(MYSQLI_ASSOC));
} elseif ($_GET['cmd'] == 'getRm') {
    echo json_encode($mysqli->query("select * from ms join user on ms.fk = user.id order by top desc, ms.update_at desc")->fetch_all(MYSQLI_ASSOC));
} elseif ($_GET['cmd'] == 'insMs') {
//    $fileName = 'NULL';
//    if (!empty($data['img'])) {
//        $parts = explode(',', $data['img']);
//        $type = explode(';', $parts[0])[0];
//        $extension = explode('/', $type)[1];
//        $img = base64_decode($parts[1]);
//        $fileName = uniqid() . '.' . $extension;
//        file_put_contents('../img/' . $fileName, $img);
//    }
//    $mysqli->query(sprintf("insert into user(name, email, phone) value ('%s','%s','%s')",
//        $data['name'], $data['email'], $data['phone']));
//    $mysqli->query(sprintf("insert into ms(msg, img, ord, fk) value ('%s','%s','%s','%s')",
//        $data['msg'], $fileName, $data['ord'], $mysqli->insert_id));
    echo json_encode('accuracy!!!');
} elseif ($_GET['cmd'] == 'insRm') {

} elseif ($_GET['cmd'] == 'updMs') {

} elseif ($_GET['cmd'] == 'updRm') {

} elseif ($_GET['cmd'] == 'delMs') {

} elseif ($_GET['cmd'] == 'delRm') {

}
