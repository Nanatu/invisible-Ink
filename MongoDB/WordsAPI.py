import pymongo
from time import sleep
from pymongo import MongoClient
from pprint import pprint

#The uri to connect to MongoDB database with given parameters hardcoded above.
client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client['words_db']
coll = db.words

file = 'C:/Users/Ryan/Desktop/words.txt'
partOfSpeech = ''
for words in open(file):
    word = words.split(':')[0]
    partOfSpeech = words.split(':')[1].strip('\n')
    query = {
        "word": word,
        "partOfSpeech": partOfSpeech
    }
    result = coll.insert_one(query)
    print('Operation ID: {0}'.format(result.inserted_id))
    sleep(0.20)