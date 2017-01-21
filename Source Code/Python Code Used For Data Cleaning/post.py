import re
import csv
count=1
data=[]
final_list=[]
with open('PostsAll.csv', 'rb') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',')
    spamreader.next()
    for row in spamreader:
        data.append(row)
        count=count+1
        if(count>9287):
            break

def clean(data, user_id):
    list=[]
    print(type(data))
    print("######")
    data=data.lower()
    data=re.sub('<[^<]+?>', '', data)
    data=re.sub('[^a-zA-Z \n\.]', '', data)
    list.append(user_id)
    list.append(data)
    final_list.append(list)
    #print(data)





for i in range(len(data)):
    d=data[i]
    userid=d[0]
    print(userid)
    clean(d[1], userid)


with open("post.csv","wb") as f:
    writer = csv.writer(f)
    writer.writerows(final_list)
