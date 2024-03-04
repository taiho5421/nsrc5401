<?php
session_start();
date_default_timezone_set('Asia/Taipei');
$mysqli = new mysqli('localhost', 'admin', '1234', 'db_nsrc_54t');
$data = json_decode(file_get_contents('php://input'), true);

function getName($img1): string {
    $parts = explode(',', $img1);
    $type = explode(';', $parts[0])[0];
    $extension = explode('/', $type)[1];
    $img = base64_decode($parts[1]);
    $fileName = uniqid() . '.' . $extension;
    file_put_contents('../img/' . $fileName, $img);
    return $fileName;
}

if ($_GET['cmd'] == 'getDt') {
    $time = strtotime($data['year'] . '-' . $data['month']);
    $arr = array_merge(array_fill(0, date('w', $time), 0), range(1, date('t', $time)));
    $arr = array_merge($arr, array_fill(0, 7 - (count($arr) % 7), 0));
    echo json_encode($arr);
} elseif ($_GET['cmd'] == 'getMs') {
    echo json_encode($mysqli->query("select * from ms join user on ms.fk = user.id order by top desc, ms.update_at desc")->fetch_all(MYSQLI_ASSOC));
} elseif ($_GET['cmd'] == 'getRm') {
    echo json_encode($mysqli->query("select * from ms join user on ms.fk = user.id order by top desc, ms.update_at desc")->fetch_all(MYSQLI_ASSOC));
} elseif ($_GET['cmd'] == 'insMs') {
    $fileName = 'NULL';
    if (!empty($data['img'])) {
        $fileName = getName($data['img']);
    }
    $mysqli->query(sprintf("insert into user(name, email, phone) value ('%s','%s','%s')",
        $data['name'], $data['email'], $data['phone']));
    $mysqli->query(sprintf("insert into ms(msg, img, ord, fk) value ('%s','%s','%s','%s')",
        $data['msg'], $fileName, $data['ord'], $mysqli->insert_id));
    echo json_encode('accuracy!!!');
} elseif ($_GET['cmd'] == 'insRm') {

} elseif ($_GET['cmd'] == 'updMs') {
    $mysqli->query(sprintf("update user set name='%s', email='%s', phone='%s' where id='%s'",
        $data['name'], $data['email'], $data['phone'], $data['id']));
    $mysqli->query(sprintf("update ms set msg='%s', ord='%s', email_show='%s', phone_show='%s' where ms_id='%s'",
        $data['msg'], $data['ord'], $data['email_show'], $data['phone_show'], $data['ms_id']));
    if (!empty($data['img'])) {
        $fileName = getName($data['img']);
        $mysqli->query(sprintf("update ms set img='%s' where ms_id='%s'",
            $fileName, $data['ms_id']));
    }
} elseif ($_GET['cmd'] == 'updRm') {

} elseif ($_GET['cmd'] == 'delMs') {
    $mysqli->query(sprintf("update ms set delete_at='%s' where ms_id='%s'",
        date('Y-m-d H:i:s'), $data['ms_id']));
} elseif ($_GET['cmd'] == 'delRm') {

}
