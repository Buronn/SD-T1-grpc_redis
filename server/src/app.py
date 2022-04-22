from flask import Flask, jsonify, request

import grpc
import search_pb2_grpc as pb2_grpc
import search_pb2 as pb2
import psycopg2
from psycopg2.extras import RealDictCursor
import sys
from concurrent import futures
import json
app = Flask(__name__)


class ItemService(pb2_grpc.ItemServiceServicer):

    def __init__(self, *args, **kwargs):
        pass

    def queryDatabase(nombre): 
        
        largo=len(nombre)

        conn = psycopg2.connect(
            host="database",
            database="tiendita",
            user='postgres',
            password='marihuana'
        )

        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("SELECT * FROM items WHERE name LIKE '%"+nombre+"%'")
        
        row = cur.fetchall()

        val = json.dumps(row)

        conn.commit()

        cur.close()
        conn.close()

        return row


    def GetInventory(self, request, context):
        
        return pb2.Response(items=ItemService.queryDatabase(request.name))



def main():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    pb2_grpc.add_ItemServiceServicer_to_server(ItemService(), server)
    
    server.add_insecure_port('[::]:50051')
    server.start()

    print("Server persistor server working")
    server.wait_for_termination()

# Start the Server
if __name__ == "__main__":
    print("Starting...")
    main()