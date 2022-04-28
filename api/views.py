from rest_framework.views import APIView
from rest_framework.response import Response


from random import randint


class RandomNumbersGenerator(APIView):
    def get(self, request, format=None):
        resp = { "status": 200, "message": "OK", "data": [randint(0, 1000) for i in range(10)] }
        return Response(resp)