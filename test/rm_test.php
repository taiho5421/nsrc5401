<?php
$mysqli = new mysqli('localhost', 'admin', '1234', 'db_nsrc_54');
$data['year'] = 2024;
$data['month'] = 3;


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
        'room' => array_fill(0, 8, "0")
    );
}
function wise_or($a, $b): string {
    return ($a | $b);
}
foreach ($date as $item) {
    foreach ($date_arr as $arr) {
        foreach ($arr['date'] as $value) {
            if ($value == $item['date'])
                $item['room'] = array_map('wise_or', $item['room'], $arr['room']);
        }
    }
    $item['count'] = array_count_values($item['room'])['0'];
}
echo json_encode($date);
