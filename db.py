import pymysql,datetime
def getsqlselecttime(minutes=20):
  starttime = (datetime.datetime.now()-datetime.timedelta(minutes = minutes)).strftime("%Y-%m-%d %H:%M:%S")
  stoptime = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
  return (starttime,stoptime)
def get_conn():
  db = pymysql.connect(host='127.0.0.1', user='root', password='123456', port=3306, db='url')
  return db
def insert(args):
  db=get_conn()
  cursor = db.cursor()
  sql = "INSERT INTO origin_url VALUES(%s,%s,%s,%s,%s,%s,%s);"
  try:
    cursor.execute(sql,args)
    db.commit()
  except:
    db.rollback()
  cursor.close()
  db.close()
def search(vtype):
  data = ()
  db=get_conn()
  cursor = db.cursor()
  starttime,stoptime = getsqlselecttime()
  sql = "SELECT type,origin_url,domain  FROM origin_url WHERE type LIKE '%s' ORDER BY timestamp DESC LIMIT 30;" % (vtype)
  #sql = "SELECT type,origin_url,domain FROM origin_url WHERE type LIKE '%s' AND timestamp BETWEEN '%s' AND '%s';" % (vtype,starttime,stoptime)
  print(sql)
  try:
    count = cursor.execute(sql)
    data = cursor.fetchall()
  except Exception as e:
    print("error:",e)
  cursor.close()
  db.close()
  return data
if __name__ == '__main__':
  print(search('douyin_vod'))
  print("success")