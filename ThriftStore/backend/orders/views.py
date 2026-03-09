from rest_framework.views import APIView
from rest_framework.response import Response
from .models import CartItem

class CartView(APIView):

    def get(self, request):

        items = CartItem.objects.all()

        data = [
            {
                "product": i.product.title,
                "qty": i.quantity
            }
            for i in items
        ]

        return Response(data)