# Make-Fake-Weibo
This is a graduate project's program combined with two parts to test people's responses when receive friends' or internet celebrities' recommendation weibo.

## Part I: Weibo Spider
To get the weibo users' ID and nickname, I must program a spider to log in weibo and fetch them. Or I have to open hundreds of pages to copy and paste ID and nickname by myself.

Apart from fetching, it also calculates the "involvement" which means how much a subject is interested in something or learn about something. We will use the involvment to seperate subjects to different group by manual, making every group has the same combination of subjects with different level of involvment.

## Part II: Chrome extension
When a subject installed the extension, he will be asked to login with student ID and phone number. Then the extension will download the subject's top 10 following friends and celebrities' info from my server, which are told by the subject before experiments.

When the subject surfs the Weibo, a fake weibo with VR glasses recommended will appear on his home page. The extension will record what the subject do such clicking the product link, how long he stops on this weibo, etc.

Everytime after the surfing, the extension will upload data to the server.

###WARNING: This fake weibo was perfect in 2015 but not sure still perfect today.

## Part III: Server
Server includes two individual components. 

One is to get the data posted by extension and insert it into MySQL database. 

The other one is a fake VR glasses product page with product info and some buttons like "Buy" or "Like". When subjects click the link in the fake weibo, they will be navigated to this page. 

