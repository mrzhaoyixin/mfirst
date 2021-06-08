import db,time
import paramiko
from ftplib import FTP_TLS
FTPSERVERADDR = "111.63.135.179"
def getTimestamp():
  return time.strftime('%Y%m%d%H%M%S',time.localtime(time.time()))
  
def send2FTP(path,filename):
  tran = paramiko.Transport((FTPSERVERADDR, 60522))
  #tran.connect(username="boce", password='')
  private = paramiko.RSAKey.from_private_key_file('/data/data/com.termux/files/home/.ssh/id_rsa')
  tran.connect(username="boce", pkey=private)
  sftp = paramiko.SFTPClient.from_transport(tran)
  localpath = path+filename
  remotepath = "/home/boce/"+filename
  sftp.put(localpath, remotepath)
  #sftp.get(remotepath, localpath) 
  tran.close()
def filesend(filename,mediatype):
  path = "/data/data/com.termux/files/home/scripts/file2send/"
  data = db.search(mediatype)
  with open(path+filename,"w",encoding = "utf-8") as f:
    for t in data:
      f.write(",".join(t)+"\n") 
  send2FTP(path, filename)
if __name__ == "__main__":
  filesend("dy_vod.csv",'douyin_vod')
  filesend("ks_vod.csv",'kuaishou_vod')
  filesend("ks_live.csv",'kuaishou_live')
  filesend("dy_live.csv",'douyin_live')