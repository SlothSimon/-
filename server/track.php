<?php
header("content-type:application/json; charset:utf-8");
date_default_timezone_set("Asia/Shanghai");
$firstAccess = null;
$url = $_POST["url"];
if($_POST){
	if(isset($_POST["url"])){
		$mysql = new SaeMysql();
        $xiangmai = $_POST["xiangmai"];
        $goumai = $_POST["goumai"];
        $guanzhu = $_POST["guanzhu"];
        
        $totaltime = $_POST["totaltime"];
        $userid = $_POST["userid"];
        $username = $_POST["username"];
        $subjectID = $_POST["subjectID"];
        $sql = "insert into track_product (subjectID, userid, xiangmai,goumai,guanzhu, totaltime) values('$subjectID','$userid', '$xiangmai', '$goumai', '$guanzhu', '$totaltime')";
        $result = $mysql->runSql($sql);
        $mysql->closeDb();
        exit(json_encode(array ('event'=>"track_product", 'result'=>$result)));
	}
    else
        exit(json_encode(array ('error'=>"false start")));
}
else {
	exit(json_encode(array ('error'=>'no parameters')));
}
exit(json_encode(array ('error'=>'post error.')));
?>
