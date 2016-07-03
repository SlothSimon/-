<?php
header("content-type:application/json; charset:utf-8");
date_default_timezone_set("Asia/Shanghai");

$subjectID = $_POST["subjectID"];
$password = $_POST["password"];

		$mysql = new SaeMysql();

        $sql = "SELECT `password`, `group`, `lastDate` FROM `subject` WHERE `ID` = '$subjectID' limit 1";
        $results = $mysql->getData($sql);
        $mysql->closeDb();
		if (!isset($results))
            exit(json_encode(array("status"=>"420")));
        foreach ($results as $key => $value) {
            //exit(json_encode($results));
            if ($value["password"] == $password){
                $sql = "SELECT `userid`, `username`, `type`, `done` FROM `relation` WHERE `subjectID` = '$subjectID' limit 10";
                $users = $mysql->getData($sql);
                exit(json_encode(array("status"=>"success", "group"=>$value["group"], "users"=>$users, "lastDate"=>$value["lastDate"])));
            }
            else
                exit(json_encode(array("status"=>"460")));
        }

?>
