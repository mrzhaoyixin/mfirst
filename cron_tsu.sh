sudo ps aux|grep getUrl|grep -v grep|cut -c 9-15|xargs sudo kill -9
nohup sudo python3 -u /data/data/com.termux/files/home/scripts/getUrl.py >> /data/data/com.termux/files/home/scripts/getUrl.log &
touch testtsu
checkfilesize()
{
	time=$(date "+%Y-%m-%d %H:%M:%S")   #获取当前系统时间
	filename=/data/data/com.termux/files/home/scripts/getUrl.log
	filesize=`ls -l $filename | awk '{ print $5}'`          #获取文件本身大小
	maxsize=$((1024*1024*20))                                      #最大内存10M
	#判断文件是否大于某个内存大小，
	if [ $filesize -gt $maxsize ]; then
   	  echo "clear time: $(time)" > $filename   	#将获取的系统时间追加在文件中
	fi
	echo "checkfilesize:"$filesize
}
checkfilesize
