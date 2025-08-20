#!/bin/bash

# 配置参数
RSS_PATH="https://gkblog.vercel.app/rss.xml"
MAX_URLS=10 # 限制只提交最新的 10 个URL到百度

# 检查 API 环境变量
if [ -z "$BAIDU_API_URL" ]; then
    echo "错误: 未设置 BAIDU_API_URL 环境变量"
    exit 1
fi

if [ -z "$BING_API_KEY" ]; then
    echo "错误: 未设置 BING_API_KEY 环境变量"
    exit 1
fi

# 下载 RSS
echo "正在从 $RSS_PATH 下载 RSS..."
if ! curl -s "$RSS_PATH" -o rss_temp.xml; then
    echo "错误: 下载 RSS 失败，可能是网络问题或链接无效。请检查链接的合法性，并适当重试。"
    exit 1
fi

# 提取 URL
echo "正在提取最新的 $MAX_URLS 个URL..."
grep -oP '(?<=<link>)https://[^<]+(?=</link>)' rss_temp.xml | head -n $MAX_URLS >urls_baidu.txt
grep -oP '(?<=<link>)https://[^<]+(?=</link>)' rss_temp.xml >urls_bing.txt

# 检查提取的 URL
URL_COUNT_BAIDU=$(wc -l <urls_baidu.txt)
URL_COUNT_BING=$(wc -l <urls_bing.txt)

if [ $URL_COUNT_BAIDU -eq 0 ]; then
    echo "错误: 未能提取到 URL，检查 RSS 格式"
    cat rss_temp.xml
    exit 1
fi

echo "提取的 URL 预览（百度）:"
cat urls_baidu.txt

echo "提取的 URL 预览（Bing）:"
cat urls_bing.txt

# 提交 URL 到百度
echo "正在提交 URL 到百度..."
response_baidu=$(curl -s -H 'Content-Type:text/plain' --data-binary @urls_baidu.txt "$BAIDU_API_URL")
echo "百度返回: $response_baidu"

# 提交 URL 到 Bing
urls=$(cat urls_bing.txt | jq -R . | jq -s .)
json_payload=$(jq -n \
    --arg host "gkblog.xiaodoudou.vip/" \
    --arg key "$BING_API_KEY" \
    --arg keyLocation "https://gkblog.xiaodoudou.vip/$BING_API_KEY.txt" \
    --argjson urlList "$urls" \
    '{host: $host, key: $key, keyLocation: $keyLocation, urlList: $urlList}')

echo "正在提交 URL 到 Bing..."
response_bing=$(curl -s -X POST -H 'Content-Type: application/json; charset=utf-8' -d "$json_payload" https://api.indexnow.org/IndexNow)
echo "Bing 返回: $response_bing"

# 清理临时文件
rm rss_temp.xml urls_baidu.txt urls_bing.txt

echo "提交完成!"
