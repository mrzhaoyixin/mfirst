import db,time
from ftplib import FTP_TLS
FTPSERVERADDR = "ip"
def getTimestamp():
  return time.strftime('%Y%m%d%H%M%S',time.localtime(time.time()))
  
def send2FTP(path,filename):
  with FTP_TLS(host = FTPSERVERADDR) as ftp:
    ftp.set_debuglevel(2)
    ftp.login(user = "u0_a179", passwd = "passwd")
    ftp.pwd()
    #ftp.storbinary('STOR %s'%filename, open(path+filename, 'rb',8192)) 
    #ftp.cwd()
    
if __name__ == "__main__":
  path = "file2send/"
  filename = getTimestamp()
  data = db.search()
  with open(path+filename,"w",encoding = "utf-8") as f:
    for t in data:
      f.write("\t".join(t)+"\n") 
  send2FTP(path, filename)
