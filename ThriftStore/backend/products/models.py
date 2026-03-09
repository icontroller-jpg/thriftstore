from django.db import models

class Product(models.Model):

    title = models.CharField(max_length=200)

    description = models.TextField()

    price = models.DecimalField(max_digits=8, decimal_places=2)

    image = models.URLField()
    condition = models.CharField(max_length=50)

    status = models.CharField(
        choices=[("available","Available"),("sold","Sold")],
        default="available",
        max_length=20
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title