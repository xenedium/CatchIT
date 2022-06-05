from jwt import decode
from config.settings import SECRET_KEY

class JwtMiddleware:    # Custom Middleware to add JWT to request object if the token is valid
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        request.jwt_user = None
        if request.headers.get('Authorization'):
            token = request.headers.get('Authorization')
            token = token.replace('Bearer ', '')
            try:
                request.jwt_user = decode(token, SECRET_KEY, algorithms=['HS256'])
            except:
                pass

        response = self.get_response(request)
        return response
