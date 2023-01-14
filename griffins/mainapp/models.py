from django.db import models

class HashAddress(models.Model):
    hash= models.CharField(max_length=500)
    user_id= models.CharField(max_length=500,primary_key=True)

class BufferModel(models.Model):
    stock =models.CharField(max_length=100,primary_key=True)
    quantity = models.FloatField()
