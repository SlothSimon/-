<?php
header("content-type:application/json; charset:utf-8");
date_default_timezone_set("Asia/Shanghai");
$firstAccess = null;
$url = $_POST["url"];
if($_POST){
	if(isset($_POST["url"])){
		$mysql = new SaeMysql();
        $linkclick = date('Y-m-d H:i:s',$_POST["linkclick"]/1000);
        $totaltime = $_POST["totaltime"];
        $author = $_POST["author"];
        $subjectID = $_POST["subjectID"];
        $sql = "insert into request (subjectID, author, linkclick, totaltime) values('$subjectID','$author', '$linkclick', '$totaltime')";
        $mysql->runSql($sql);
        $mysql->closeDb();
        exit(json_encode(array ('success'=>"finished", 'totaltime'=>$totaltime, 'linkclick'=>$linkclick)));
	}
    else
        exit(json_encode(array ('error'=>"false start")));
}
else {
	exit(json_encode(array ('error'=>'no parameters')));
}
exit(json_encode(array ('error'=>'post error.')));
?>
