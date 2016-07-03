<?php
header("content-type:application/json; charset:utf-8");
date_default_timezone_set("Asia/Shanghai");

$subjectID = $_POST["subjectID"];
$password = $_POST["password"];

		$mysql = new SaeMysql();

        $sql = "select password,group from request where ID = '$subjectID' limit 1";
        $results = $mysql->getData($sql);
        $mysql->closeDb();
        foreach ($results as $key => $value) {
            if ($value["phonenumber"] == password)
                exit(json_encode(array("status"=>"success", "group"=>$value["group"])));
            else
                exit(json_encode(array("status"=>"460")));
        }
        exit(json_encode(array("status"=>"420")));

?>
