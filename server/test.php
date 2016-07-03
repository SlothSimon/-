<?php
header("content-type:application/json; charset:utf-8");
date_default_timezone_set("Asia/Shanghai");
$firstAccess = null;
$url = $_POST["url"];
if($_POST){
	if(isset($_POST["url"])){
		$mysql = new SaeMysql();
        $linkclick = date('Y-m-d H:i:s',$_POST["linkclick"]/1000);
        $picclick = date('Y-m-d H:i:s',$_POST["picclick"]/1000);
        $pingbiweiboclick = date('Y-m-d H:i:s',$_POST["pingbiweiboclick"]/1000);
        $pingbiyonghuclick = date('Y-m-d H:i:s',$_POST["pingbiyonghuclick"]/1000);
        $quxiaoguanzhuclick = date('Y-m-d H:i:s',$_POST["quxiaoguanzhuclick"]/1000);
        $jubaoclick = date('Y-m-d H:i:s',$_POST["jubaoclick"]/1000);
        $pingbiguanjianciclick = date('Y-m-d H:i:s',$_POST["pingbiguanjianciclick"]/1000);        
        $shoucangclick = date('Y-m-d H:i:s',$_POST["shoucangclick"]/1000);
        $zhuanfaclick = date('Y-m-d H:i:s',$_POST["zhuanfaclick"]/1000);
        $pinglunclick = date('Y-m-d H:i:s',$_POST["pinglunclick"]/1000);
        $zanclick = date('Y-m-d H:i:s',$_POST["zanclick"]/1000);
        
        $totaltime = $_POST["totaltime"];
        $userid = $_POST["userid"];
        $subjectID = $_POST["subjectID"];
        $lastDate = $_POST["date"];
        $sql = "insert into track_weibo (subjectID, userid, 
        								linkclick, 
                                        picclick, 
                                        pingbiweiboclick, 
                                        pingbiyonghuclick, 
                                        quxiaoguanzhuclick,
                                        jubaoclick,
                                        pingbiguanjianciclick,
                                        shoucangclick, 
                                        zhuanfaclick, 
                                        pinglunclick,
                                        zanclick, 
                                        totaltime) 
                             	values('$subjectID',
                                	   '$userid', 
                                       '$linkclick', 
                                       '$picclick',
                                       '$pingbiweiboclick', 
                                       '$pingbiyonghuclick', 
                                       '$quxiaoguanzhuclick',
                                       '$jubaoclick',
                                       '$pingbiguanjianciclick',
                                       '$shoucangclick', 
                                       '$zhuanfaclick',
                                       '$pinglunclick', 
                                       '$zanclick',
                                       '$totaltime')";
        $result = $mysql->runSql($sql);
        if ($result == true){
	        $sql = "UPDATE relation SET done = 'true' WHERE subjectID = '$subjectID' AND userid = '$userid'";
	        $mysql->runSql($sql);
            $sql = "UPDATE subject SET lastDate = '$lastDate' WHERE ID = '$subjectID'";
	        $mysql->runSql($sql);
        }
        $mysql->closeDb();
        exit(json_encode(array ('event'=>"track_weibo", 'result'=>$result)));
	}
    else
        exit(json_encode(array ('error'=>"false start")));
}
else {
	exit(json_encode(array ('error'=>'no parameters')));
}
exit(json_encode(array ('error'=>'post error.')));
?>
