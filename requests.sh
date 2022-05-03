array=( Disk SSD SATA Mens a )
for i in "${array[@]}"
do
    time=$(curl -w "%{time_total}" -o /dev/null --silent "http://localhost:3000/inventory/search?q=$i")
    QTY=1000
    RES=$(echo "scale=4; $time*$QTY" | bc)
    echo "$i $RES" ms
	
done
