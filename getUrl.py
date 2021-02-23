import db
import time
from scapy.all import *
from scapy.layers.http import HTTPRequest, HTTPResponse, HTTP
from scapy.utils import PcapReader
#packets = sniff(offline="./testcapture.pcap", session=TCPSession)

APPDOMAINS = {
  'douyin':[
    'douyin','ixigua'
    ],
  'kuaishou':[
    'kwaicdn','yximgs','gifshow'
    ]
}
MOVREG = {
  '_vod':[
    'mime_type=video_mp4','.mp4'
    ],
  '_live':[
    '.flv'
    ]
}
def getTimestamp():
  return time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time()))
   
def packet_callback(packets):
    for pkt in packets:
        if pkt.haslayer(HTTPRequest):
            #ip dst address
            ip_layer = pkt.getlayer('IP')
            #ip_layer.show()
            if not ip_layer:
              ipv6_layer = pkt.getlayer('IPv6')
              if ipv6_layer:
                ip_dstaddress = ipv6_layer.dst
              else:
                ip_dstaddress = 'None'
                pkt.show()
            else:
              ip_dstaddress = ip_layer.dst
            #tcp dst port
            tcp_layer = pkt.getlayer('TCP')
            tcp_destport = tcp_layer.dport
            #http host & url
            http_header = pkt[HTTPRequest].fields
            if http_header.get("Host") is None:
              host = 'unknown_host'
            else:
              host = bytes.decode(http_header.get("Host"))
            if http_header.get("Path") is None:
              path = 'unknown_path'
            else:
              path = bytes.decode(http_header.get("Path"))
            if tcp_destport == 443:
              urltitle = 'https://'
            else:
              urltitle = 'http://'
            #complete url
            if tcp_destport == 443 or tcp_destport == 80:
              finurl = urltitle+host+path
            else:
              finurl = urltitle+host+':'+str(tcp_destport)+path
            timestamp = getTimestamp()
            #According to the domain name to judge the APP name
            APPNAME = 'others'
            for key in APPDOMAINS.keys():
              for item in APPDOMAINS.get(key):
                if item in finurl:
                  APPNAME = key
                  break;
            #According to the url to judge the url type
            TYPE = '_others'
            for key in MOVREG.keys():
              for item in MOVREG.get(key):
                if item in finurl:
                  TYPE = key
                  break;
            #save to db
            data = (finurl,timestamp,APPNAME,ip_dstaddress,tcp_destport,host,APPNAME+TYPE)
            print(data)
            db.insert(data)
        elif pkt.haslayer(HTTPResponse):
            pass
sniff(iface = "wlan0", prn = packet_callback, store = False)

