import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import datetime
import time

class Firebase():
    def __init__(self):
        self.cred = credentials.Certificate('./meldir-firebase-adminsdk-7lsl9-9cd164d257.json')
        self.app = firebase_admin.initialize_app(self.cred)
        self.db = firestore.client()
        print("firebase initialized")
    
    def add_temp_data(self, crop_num, temp, time=datetime.datetime.now()):
        data = {
            'time': time,
            'temp': temp,
        }

        collection_name = "tempCrop"+str(crop_num)

        _, temp_ref = self.db.collection(collection_name).add(data)
        print("Added crop" + str(crop_num) + " temp data with id " + str(temp_ref.id))
    
    def update_main_data(self, crop_num, item_on, priority, start_time, temp, temp_delta, waiting_time):
        data = {
            'itemOn': item_on, # True
            'priority': priority, # 1
            'startTime': start_time, # datetime
            'temp': temp, # 30
            'tempDelta': temp_delta, # -20
            'waitingTime': waiting_time, # 100
        }

        document_name = "crop"+str(crop_num)
        data_ref = self.db.collection('mainData').document(document_name)
        
        data_ref.set(data)
        print("Updated crop" + str(crop_num) + " main data")

def main():
    myfirebase = Firebase()
    temp = 50
    for _ in range(50):
        myfirebase.add_temp_data(1,temp)
        myfirebase.update_main_data(1, True, 2, datetime.datetime.now(), temp, -30, 100)
        
        temp -= 1
        time.sleep(1)

if __name__ == "__main__":
    main()
