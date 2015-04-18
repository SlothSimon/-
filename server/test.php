<?php
header("content-type:application/json; charset:utf-8");
date_default_timezone_set("Asia/Shanghai");
$firstAccess = null;
$url = $_POST["url"];
if($_POST){
	if(isset($_POST["url"])){
		$mysql = new SaeMysql();
        $linkclicktime = date('Y-m-d H:i:s',$_POST["linkClick"]/1000);
        $totaltime = $_POST["totaltime"];
        $author = $_POST["author"];
        $subjectID = $_POST["subjectID"];
        $sql = "insert into request (subjectID, author, linkclicktime, totaltime) values('$subjectID','$author', '$linkclicktime', '$totaltime')";
        $mysql->runSql($sql);
        $mysql->closeDb();
        exit(json_encode(array ('success'=>"finished", 'totaltime'=>$totaltime, 'linkclicktime'=>$linkclicktime)));
	}
    else
        exit(json_encode(array ('error'=>"false start")));
}
else {
	exit(json_encode(array ('error'=>'no parameters')));
}
exit(json_encode(array ('error'=>'post error.')));
?>
