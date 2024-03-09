<?php
session_start();
date_default_timezone_set('Asia/Taipei');
$mysqli = new mysqli('localhost', 'admin', '1234', 'db_nsrc_54');
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
    $sql = $mysqli->query("select * from rm inner join user on rm.fk = user.user_id");
    $date_arr = [];
    while ($row = $sql->fetch_assoc()) {
        $st = new DateTime($row['st_date']);
        $ed = new DateTime($row['ed_date']);
        $ed->modify('+1 day');
        $in = new DateInterval('P1D');
        $days = new DatePeriod($st, $in, $ed);
        $date = [];
        foreach ($days as $day) {
            $date[] =  $day->format('Y-m-d');
        }
        $date_arr[] = array(
            'date' => $date,
            'room' => str_split($row['room'])
        );
    }
    $time = strtotime($data['year'] . '-' . $data['month']);
    $date = array_merge(array_fill(0, date('w', $time), 0), range(1, date('t', $time)));
    $date = array_merge($date, array_fill(0, 7 - count($date) % 7, 0));
    foreach ($date as $index => $value) {
        $date[$index] = array(
            'date' => $value != 0 ? date('Y-m-d', strtotime($data['year'] . '-' . $data['month'] . '-' . $value)) : '0000-00-00',
            'room' => array_fill(0, 8, "0"),
            'count' => 8
        );
    }
    function wise_or($a, $b): string {
        return ($a | $b);
    }
    foreach ($date as &$item) {
        foreach ($date_arr as $arr) {
            foreach ($arr['date'] as $value) {
                if ($value == $item['date'])
                    $item['room'] = array_map('wise_or', $item['room'], $arr['room']);
            }
        }
        $item['count'] = array_count_values($item["room"])["0"]??0;
    }
    echo json_encode($date);
} elseif ($_GET['cmd'] == 'getMs') {
    echo json_encode($mysqli->query("select * from ms inner join user on ms.fk = user.user_id order by top desc, update_at desc")->fetch_all(MYSQLI_ASSOC));
} elseif ($_GET['cmd'] == 'getRm') {
    echo json_encode($mysqli->query("select * from ms inner join user on ms.fk = user.user_id order by top desc, update_at desc")->fetch_all(MYSQLI_ASSOC));
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
    $count = $mysqli->query(sprintf("select count(*) as record from rm where DATE(create_at) = '%s'", $data['create_at']))->fetch_assoc()['record'];
    $unix = strtotime($data['create_at']);
    $unix = date('Ymd', $unix) . sprintf('%04d', $count + 1);
    $str = "00000000";
    foreach ($data['rm'] as $rm) {
        $str[$rm - 1] = '1';
    }
    $mysqli->query(sprintf("insert into user(name, email, phone) value ('%s','%s','%s')",
        $data['name'], $data['email'], $data['phone']));
    $mysqli->query(sprintf("insert into rm(room, st_date, ed_date, note, total, deposit, create_at, num_id, fk) value ('%s','%s','%s','%s','%s','%s','%s','%s','%s')",
        $str, $data['st_date'], $data['ed_date'], $data['note'], $data['total'], $data['deposit'], $data['create_at'], $unix, $mysqli->insert_id));
} elseif ($_GET['cmd'] == 'updMs') {
    $mysqli->query(sprintf("update user set name='%s', email='%s', phone='%s' where user_id='%s'",
        $data['name'], $data['email'], $data['phone'], $data['user_id']));
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
