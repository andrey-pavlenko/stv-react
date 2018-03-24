#!/bin/sh

curl "http://xmltv.s-tv.ru/xchenel.php?login=test&pass=&show=1&xmltv=0" | iconv -f WINDOWS-1251 -t UTF-8
