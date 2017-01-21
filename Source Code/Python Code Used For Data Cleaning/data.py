import csv
import sys
import re
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import string
from collections import Counter

count=1
data=[]
tags_list=[]
csv.field_size_limit(sys.maxsize)
stop_words = set(stopwords.words("english"))
stop_words.update(('ltpgt','lt','use','dont','using',' ','know','better','ltpgt','gt',
                   'nn','ltgt','would','give','ltligtthe','ltligt','recent','known','want',
                   ' et','say','usually','ltpgtmost',' et','ltolgt','ltligti','srchttpi',
                   'still','find','ltcodegtltpregt','grupphc','genderhc','sahharoosi','iq','trying'))

#######################
with open('All_Tags.csv', 'rb') as csvfile:
    spamreader1 = csv.reader(csvfile, delimiter=',')
    spamreader1.next()
    for row in spamreader1:
        tags_list.append(row[0])

#print(len(tags_list))
#print(tags_list[0])
#print(type(tags_list[0]))




with open('titleresults.csv', 'rb') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',')
    spamreader.next()
    for row in spamreader:
        data.append(row)
        count=count+1
        if(count>5704):
            break





print(len(data))
### cleaning data
#my_str = "hey th~!ere09090"
#my_new_string = re.sub('[^a-zA-Z \n\.]', '', my_str)
#print my_new_string
def clean(data, user_id):
    #print(userid)
    data=data.lower()
    data1=re.sub('[^a-zA-Z \n\.]', '', data)
    words = word_tokenize(data1)
    words=re.findall(r"[\w']+", data1)



    words1 = filter(lambda x: x not in string.punctuation, words)
    cleaned_text = filter(lambda x: x not in stop_words, words1)
    #print(type(cleaned_text))
    #print(type(cleaned_text[0]))
    #print(len(cleaned_text))
    cleaned_text=[i for i in cleaned_text if (len(i)>1 or i=='R' or i=='r' )]
    print(len(cleaned_text))
    cleaned_text1=[]
    mapping = { 'ltpgt':' ', 'lt':' ', 'gt':' ', 'nn':' ', 'ltgt':''}
    for i in range(len(cleaned_text)):
        word=cleaned_text[i]
        #print(word)
        for k, v in mapping.iteritems():
            #print(word)
            my_string = word.replace(k, v)
            #print(my_string)
        cleaned_text1.append(my_string)
    stopwords = ['ltpta','gt','ltgt','nn']
    resultwords  = [word for word in cleaned_text1  if word.lower() not in stopwords]
    counts=Counter(resultwords)
    listofitem=counts.most_common(20)
    for i in range(len(listofitem)):
        ff=listofitem[i]
        #print(ff)
        l=list(ff)
        l.append(user_id)
        final_list.append(l)








final_list=[]
final_list1=[]
for i in range(len(data)):
    d=data[i]
    userid=d[0]
    clean(d[1], userid)


ind=0
print("##################################################################################")
print(len(final_list))
for i in range(len(final_list)):
    row=final_list[i]
    word=row[0]
    ind=ind+1
    print(ind)
    if word in tags_list:
        row=list(row)
        row.append("yes")
        final_list1.append(row)
    else:
        row=list(row)
        row.append("No")
        final_list1.append(row)



with open("output11.csv","wb") as f:
    writer = csv.writer(f)
    writer.writerows(final_list1)








#print(len(data))
