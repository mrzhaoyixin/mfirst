sudo ps aux|grep getUrl|grep -v grep|cut -c 9-15|xargs sudo kill -9
nohup sudo python3 -u /data/data/com.termux/files/home/scripts/getUrl.py >> /data/data/com.termux/files/home/scripts/getUrl.log &
touch testtsu
checkfilesize()
{
	time=$(date "+%Y-%m-%d %H:%M:%S")   #��ȡ��ǰϵͳʱ��
	filename=/data/data/com.termux/files/home/scripts/getUrl.log
	filesize=`ls -l $filename | awk '{ print $5}'`          #��ȡ�ļ������С
	maxsize=$((1024*1024*20))                                      #����ڴ�10M
	#�ж��ļ��Ƿ����ĳ���ڴ��С��
	if [ $filesize -gt $maxsize ]; then
   	  echo "clear time: $(time)" > $filename   	#����ȡ��ϵͳʱ��׷�����ļ���
	fi
	echo "checkfilesize:"$filesize
}
checkfilesize
