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
if __name__ == "__main__":
  # »ñÈ¡TransportÊµÀý
  path = "file2send/"
  dyfilename = "dy_vod"
  data = db.search('douyin_vod')
  with open(path+dyfilename,"w",encoding = "utf-8") as f:
    for t in data:
      f.write("\t".join(t)+"\n") 
  send2FTP(path, dyfilename)
  ksfilename = "ks_vod"
  data = db.search('kuaishou_vod')
  with open(path+ksfilename,"w",encoding = "utf-8") as f:
    for t in data:
      f.write("\t".join(t)+"\n") 
  send2FTP(path, ksfilename)