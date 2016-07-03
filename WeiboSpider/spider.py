# -*- coding:utf-8 -*-

import os
import re
import urllib
import urllib2
from time import sleep
import cookielib
import xlrd

import lxml.html as HTML
import sys
default_encoding = 'utf-8'
if sys.getdefaultencoding() != default_encoding:
    reload(sys)
    sys.setdefaultencoding(default_encoding)

class Fetcher(object):
    def __init__(self, username=None, pwd=None, cookie_filename=None):
        #获取一个保存cookie的对象
        self.cj = cookielib.LWPCookieJar()
        if cookie_filename is not None:
            self.cj.load(cookie_filename)
        #将一个保存cookie对象，和一个HTTP的cookie的处理器绑定
        self.cookie_processor = urllib2.HTTPCookieProcessor(self.cj)
        #创建一个opener，将保存了cookie的http处理器，还有设置一个handler用于处理http的URL的打开
        self.opener = urllib2.build_opener(self.cookie_processor, urllib2.HTTPHandler)
        #将包含了cookie、http处理器、http的handler的资源和urllib2对象绑定在一起
        urllib2.install_opener(self.opener)
        
        self.username = username
        self.pwd = pwd
        self.headers = {'User-Agent':'Mozilla/5.0 (Windows NT 6.1; rv:14.0) Gecko/20100101 Firefox/14.0.1',
            'Referer':'','Content-Type':'application/x-www-form-urlencoded'}

    def get_rand(self, url):
        headers = {'User-Agent':'Mozilla/5.0 (Windows;U;Windows NT 5.1;zh-CN;rv:1.9.2.9)Gecko/20100824 Firefox/3.6.9',
            'Referer':''}
        req = urllib2.Request(url ,"", headers)
        login_page = urllib2.urlopen(req).read()
        rand = HTML.fromstring(login_page).xpath("//form/@action")[0]
        passwd = HTML.fromstring(login_page).xpath("//input[@type='password']/@name")[0]
        vk = HTML.fromstring(login_page).xpath("//input[@name='vk']/@value")[0]
        return rand, passwd, vk
    
    def login(self, username=None, pwd=None, cookie_filename=None):
        if self.username is None or self.pwd is None:
            self.username = username
            self.pwd = pwd
        assert self.username is not None and self.pwd is not None
        
        url = 'http://login.weibo.cn/login/?rand=437560244&backURL=http%3A%2F%2Fweibo.cn%2F&backTitle=%E5%BE%AE%E5%8D%9A&vt=4&revalid=2&ns=1'
        # 获取随机数rand、password的name和vk
        rand, passwd, vk = self.get_rand(url)
        data = urllib.urlencode({'mobile': self.username,
                                passwd: self.pwd,
                                'remember': 'on',
                                'backURL': 'http://weibo.cn/',
                                'backTitle': '新浪微博',
                                'vk': vk,
                                'submit': '登录',
                                'encoding': 'utf-8'})
        url = 'http://login.weibo.cn/login/' + rand
                                
        # 模拟提交登陆
        page =self.fetch(url,data)
        link = HTML.fromstring(page).xpath("//a/@href")[0]
        if not link.startswith('http://'): link = 'http://weibo.cn/%s' % link
        # 手动跳转到微薄页面
        self.fetch(link,"")
        
        # 保存cookie
        if cookie_filename is not None:
            self.cj.save(filename=cookie_filename)
        elif self.cj.filename is not None:
            self.cj.save()
        print 'login success!',data
                                                            
    def fetch(self, url,data):
        print 'fetch url: ', url
        req = urllib2.Request(url,data, headers=self.headers)
        return urllib2.urlopen(req).read()


def getPhonenumber_by_subjectName(subjectName):
    global subject_xlsx
    table = subject_xlsx.sheets()[0]
    nrows = table.nrows
    for rownum in range(1, nrows):
        if table.cell(rownum, 1).value == subjectName:
                return int(table.cell(rownum, 5).value)

# 开始运行
while(1):
    try:
        print "登录"
        fet=Fetcher();
        fet.login("EMAIL","PWD")
    except:
        sleep(5)
        continue
    else:
        break


BASE_DIR = os.path.dirname(__file__) #获取当前文件夹的绝对路径
print BASE_DIR

data = xlrd.open_workbook(os.path.join(BASE_DIR,'subject.xls'))
subject_xlsx = xlrd.open_workbook(os.path.join(BASE_DIR,'被试资料.xls'))
sheet = data.sheets()[0]
nrows = sheet.nrows

out = 0
output = []
sql = []

for rowIndex in range(1, nrows):
    subjectID = int(sheet.cell(rowIndex, 6).value)
    subjectName = sheet.cell(rowIndex, 5).value
    phoneNumber = getPhonenumber_by_subjectName(subjectName)
    involvement = 0

    # 涉入度
    for j in range(10):
        if j in [0,2,3,5,6,8]:
            point = 8 - int(sheet.cell(rowIndex, 31 + j).value)
        else:
            point = int(sheet.cell(rowIndex, 31 + j).value)
        involvement += point

    group = raw_input("涉入度为%d，分组为：" % involvement)

    # 关注的微博用户
    users = []
    j = 0
    while(j < 20):
        user = []
        user.append(sheet.cell(rowIndex, 41 + j).value)
        user.append(sheet.cell(rowIndex, 41 + j + 1).value)
        users.append(user)
        j += 2

    sql.append("insert into `subject` ( `ID`, `password`, `group`, `name`) values (%s, %s, %s, '%s');\n" % (subjectID, phoneNumber, group, subjectName))

    i = 0
    print "------------------"+str(subjectID)+"----------------------"
    if (len(users) != 10):
        print "------------------OUT----------------------"
        out += 1
    for user in users:
        username = user[0]
        url = user[1]
        if url.isdigit():
            if len(url) == 10:
                url = "http://weibo.com/u/"+url
            elif len(url) == 16:
                url = "http://weibo.com/p/"+url
            else:
                url = "http://weibo.com/"+url
        elif url[:4] != "http":
            url = "http://weibo.com/"+url
        url = url.replace("com", "cn")

        if i < 5:
            type = "vip"
        else:
            type = "friend"
        i += 1
        error = 0
        while(1):
            try:
                print(subjectID, username)
                print "抓取"+str(subjectID)+"关注的"+username
                res = fet.fetch(url, None)
                real_user = []
                if url.find("weibo.com/p/") != -1 or url.find("weibo.cn/p/") != -1:
                    real_user.append(re.findall('<title>(\S+)</title>', res)[0].replace("的微博_微博",""))
                    real_user.append(re.findall("$CONFIG['oid']='(\S+)'", res)[0])
                else:
                    real_user.append(re.findall('<title>(\S+)</title>', res)[0].replace("的微博",""))
                    real_user.append(re.findall('<a href="/(\w+)/info">', res)[0])
                print(real_user)
                output.append("%d %s %s %s\n"%(subjectID,real_user[0], real_user[1], type))
                sql.append("insert into `relation` ( `subjectID`, `username`, `userid`, `type`) values (%d, '%s', '%s', '%s');\n" %(subjectID,real_user[0], real_user[1], type))
            except:
                error += 1
                sleep(5)
                print res
                if error < 2:
                    continue
                else:
                    output.append("%d %s %s %s\n"%(subjectID,username, url, type))
                    sql.append("%d %s\n"%(subjectID,username))
                    break
            else:
                break
        sleep(1)

print "------------------OVER----------------------"
print "%d个失败"%(out)
file_path = os.path.join(BASE_DIR, 'output.txt')
file_path1 = os.path.join(BASE_DIR, 'sql.txt')
file = open(file_path, "a+")
file1 = open(file_path1, "a+")
file.writelines("------------------------------------------------------------\n")
file.writelines(output)
file1.writelines("------------------------------------------------------------\n")
file1.writelines(sql)
file.close()
file1.close()
