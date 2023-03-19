import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import storage
import datetime
import time
import numpy as np
import cv2

class Firebase():
    def __init__(self):
        self.cred = credentials.Certificate('./hotsort-d2670-firebase-adminsdk-hk8s7-2a97e894ab.json')
        self.app = firebase_admin.initialize_app(self.cred,{'storageBucket': 'hotsort-d2670.appspot.com'})
        self.db = firestore.client()
        self.bucket = storage.bucket()
        print("firebase initialized")
    
    def add_temp_data(self, crop_num, temp, time=datetime.datetime.now()):
        data = {
            'time': time,
            'temp': temp,
        }

        collection_name = "tempCrop"+str(crop_num)

        _, temp_ref = self.db.collection(collection_name).add(data)
        print("Added crop" + str(crop_num) + " temp data with id " + str(temp_ref.id))
    
    def update_main_data(self, crop_num, img_url, item_on, priority, start_time, temp, temp_delta, waiting_time):
        data = {
            'imgUrl': img_url, # 
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

    def upload_image(self, source_file_name, destination_blob_name):

        blob = self.bucket.blob(destination_blob_name)
        blob.upload_from_filename(source_file_name)
        blob.make_public()
        print(
            f"File {source_file_name} uploaded to {destination_blob_name}."
        )
        print(blob.public_url)
        return blob.public_url

def main():
    myfirebase = Firebase()
    temp = 50
    image_name = "test_image"

    test_image = np.random.random((600,800))
    test_image_converted = np.array(test_image * 255, dtype = np.uint8)
    cv2.imwrite("images/{}.png".format(image_name), test_image_converted)
    test_image_url = myfirebase.upload_image("images/"+image_name+".png", "images/"+image_name+".png")

    for _ in range(50):
        myfirebase.add_temp_data(1,temp)
        myfirebase.update_main_data(1, test_image_url, True, 2, datetime.datetime.now(), temp, -30, 100)
        temp -= 1
        time.sleep(1)

if __name__ == "__main__":
    main()
